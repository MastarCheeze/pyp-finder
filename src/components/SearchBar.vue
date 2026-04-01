<script setup>
import { ref, watch, onMounted } from "vue"

const placeholderTexts = [
  "0500/23/M/J/21",
  "9709/23/M/J/18",
  "2147/12/M/J/23",
  "9794/01/M/J/16",
  "0410/13/INSERT/O/N/20",
  "0460/21/INSERT/M/J/24",
  "9700/34/CI/M/J/24",
  "0625/52/CI/F/M/25",
]

const typingSpeed = 65 // delay in milliseconds
const initialTypingWait = 500 // delay in milliseconds
const subsequentTypingWait = 3000 // delay in milliseconds
const pauseFullDuration = 3000 // delay in milliseconds
const pauseEmptyDuration = 1000 // delay in milliseconds
const deletingSpeed = 35 // delay in milliseconds
let deleting = false
let index = 0

const paperCode = ref("")
const status = ref("")
const statusStyle = ref("")
const statusKey = ref(0)
const dots = ref("")

const placeholder = ref("")
const playTyping = ref(true)


const emit = defineEmits(["search"])

defineExpose({ setStatus, setSearching })

let timeoutId = 0;
let animationId = 0;
let typingId = 0;

function setStatus(msg, style, timeout) {
  if (timeoutId) clearTimeout(timeoutId)
  if (animationId) clearInterval(animationId);

  status.value = msg
  statusStyle.value = style
  dots.value = ""
  statusKey.value++

  if (timeout > 0) {
    timeoutId = setTimeout(() => {
      status.value = ""
      statusStyle.value = ""
    }, timeout);
  }
}

function setSearching() {
  if (timeoutId) clearTimeout(timeoutId);
  if (animationId) clearInterval(animationId);

  status.value = "Searching"; // Key remains "Searching"
  statusStyle.value = "";
  dots.value = "";
  statusKey.value++;

  animationId = setInterval(() => {
    if (dots.value.length >= 3) {
      dots.value = "";
    } else {
      dots.value += ".";
    }
  }, 333);
}

function typeEffect() {
  let curDelay = 0
  if (!deleting) {
    placeholder.value = placeholderTexts[index].slice(0, placeholder.value.length + 1)
    curDelay = typingSpeed
  } else {
    placeholder.value = placeholderTexts[index].slice(0, placeholder.value.length - 1)
    curDelay = deletingSpeed
  }

  if (placeholder.value == placeholderTexts[index]) {
    deleting = true
    curDelay = pauseFullDuration
  } else if (placeholder.value == "") {
    deleting = false
    curDelay = pauseEmptyDuration
    index = (index + 1) % placeholderTexts.length
  }

  typingId = setTimeout(typeEffect, curDelay)
}

watch(paperCode, (v) => {
  if (v != "") {
    playTyping.value = false
    clearTimeout(typingId)
    placeholder.value = ""
    index = (index + 1) % placeholderTexts.length
    deleting = false
    stopBlinkCursor()
  } else {
    setTimeout(() => {
      playTyping.value = true
      typeEffect()
    }, subsequentTypingWait)
  }
})

function searchClicked(e) {
  emit("search", paperCode.value)
};

function keyDown(e) {
  if (e.key === "Enter") {
    emit("search", paperCode.value)
  }
}

onMounted(() => {
  setTimeout(typeEffect, initialTypingWait)
})
</script>

<template>
  <header>
    <form>
      <div class="search">
        <input @keydown="keyDown" v-model="paperCode" class="search-input" :placeholder type="search">
        <button type="submit" @click.prevent="searchClicked">
          <span class="material-symbols-outlined search-icon">search</span>
        </button>
      </div>
      <div class="status-container">
        <transition name="fade-status" mode="out-in">
          <p :key="statusKey" id="status" :class="statusStyle">
            {{ status }}{{ dots }}
          </p>
        </transition>
      </div>
    </form>
  </header>
</template>

<style scoped>
header {
  margin-block: 4em 2em;
  display: flex;
  justify-content: center;
  width: 100%;
}

form {
  width: 100%;
}

.search {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.4em 0.4em;
  border-radius: 32px;
  border: 1px solid var(--color-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background-color: var(--color-surface);
  transition: outline 0.3s ease;
}

.search:focus-within {
  outline: 2px solid var(--color-brand);
}

.search-input {
  font-size: 1.6rem;
  margin-left: 0.25em;
  padding-inline: 0.25em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--color-text-muted);
  outline: none;
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  color: var(--color-brand);
}

.search-input::placeholder {
  color: color-mix(in srgb, var(--color-brand) 50%, transparent);
}

/* Removes the 'x' in Chrome, Safari, and newer Edge */
.search-input::-webkit-search-decoration,
.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-results-button,
.search-input::-webkit-search-results-decoration {
  -webkit-appearance: none;
  display: none;
}

/* Removes the 'x' in Internet Explorer and old Edge */
.search-input::-ms-clear,
.search-input::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

button {
  border: none;
  outline: none;
  background: transparent;
  background-color: var(--color-surface);
  border-radius: 32px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--color-surface-hover);
}

button:active {
  background-color: var(--color-border);
}

.search-icon {
  color: color-mix(in srgb, var(--color-brand) 50%, transparent);
  transition: color 0.3s ease;
}

.search-icon {
  font-size: 1.75rem;
  cursor: pointer;
  user-select: none;
}

.search:focus-within .search-icon {
  color: var(--color-brand);
}

#status {
  color: var(--color-text-muted);
  margin-top: 0.25rem;
  margin-left: 1.2rem;
  font-size: 0.8rem;
  opacity: 0.6;
}

#status.warning {
  color: var(--color-warning);
}

#status.error {
  color: var(--color-error);
}

.fade-status-enter-active,
.fade-status-leave-active {
  transition: opacity 0.2s ease;
}

.fade-status-enter-from,
.fade-status-leave-to {
  opacity: 0 !important;
}
</style>