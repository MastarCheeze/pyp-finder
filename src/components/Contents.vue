<script setup>
const props = defineProps({
  results: Array,
})

const typeColors = {
  qp: "pill-green", // Question paper.
  ms: "pill-green", // Mark scheme.
  in: "pill-blue", // Insert.
  i2: "pill-blue", // Insert 2 (Survey map) for Geography.
  pm: "pill-blue", // Pre-release material for Computer Science.
  ci: "pill-blue", // Confidential instructions.
  er: "pill-orange", // Examiner report.
  gt: "pill-orange", // Grade thresholds.
  sy: "pill-red", // Syllabus.
  rl: "pill-red", // Reference list for Psychology.
}

// convert a long url to a short one by replacing the middle with ...
function shortenUrl(urlStr) {
  const url = new URL(urlStr);
  const segments = url.pathname.split('/');
  const fileName = segments[segments.length - 1];

  return `${url.origin}/.../${fileName}`;
}

function toggleOpen(result) {
  result.isOpen = !result.isOpen
}
</script>

<template>
  <div class="results-container">
    <TransitionGroup name="list-fade">
      <div v-for="result in props.results" :key="result.id" class="result-card main-result-card">
        <div class="result-header">
          <span class="type-pill" :class="typeColors[result.typeId] ?? 'pill-green'">{{ result.type }}</span>
          <a :href="result.url" class="result-url" target="_blank">{{ shortenUrl(result.url) }}</a>

          <button class="dropdown-btn" @click="toggleOpen(result)">
            <span class="material-symbols-outlined" :class="{ 'rotated': result.isOpen }">
              chevron_right
            </span>
          </button>
        </div>
        <transition name="slide-details">
          <div v-if="result.isOpen" class="result-details">
            <div class="details-grid">
              <div class="detail-item">
                <span class="label">Qualification</span>
                <span class="value">{{ result.qualification }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Subject</span>
                <span class="value">{{ result.subject }}</span>
              </div>
              <div v-if="result.examSeries" class="detail-item">
                <span class="label">Exam Series</span>
                <span class="value">{{ result.examSeries }}</span>
              </div>
              <div v-if="result.year" class="detail-item">
                <span class="label">Year</span>
                <span class="value">{{ result.year }}</span>
              </div>
              <div v-if="result.component !== null" class="detail-item">
                <span class="label">Component</span>
                <span class="value">{{ result.component }}</span>
              </div>
              <div v-if="result.component !== null" class="detail-item">
                <span class="label">Variant</span>
                <span class="value">{{ result.variant }}</span>
              </div>
              <div v-if="result.alternativeUrls.length != 0" class="urls-item">
                <span class="label">Alternative URLs</span>
                <ul>
                  <li><a v-for="url in result.alternativeUrls" :href="url" target="_blank">{{ shortenUrl(url) }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.results-container {
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  position: relative;
}

/* Transition for the entire list */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.4s ease;
}

.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Ensures items slide smoothly when the list reorders */
.list-fade-move {
  transition: transform 0.4s ease;
}

.result-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  /* slate-200 */
  border-radius: 12px;
  font-family: sans-serif;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
}

.result-header {
  display: flex;
  align-items: center;
  padding: 0.25em 0.75em;
  gap: 0.75em;
}

.type-pill {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.4em 0.6em;
  border-radius: 32px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pill-green {
  /* 200 */
  background-color: #bbf7d0;
  /* 800 */
  color: #166534;
}

.pill-blue {
  background-color: #bfdbfe;
  color: #1e40af;
}

.pill-orange {
  background-color: #fed7aa;
  color: #9a3412;
}

.pill-red {
  background-color: #fecaca;
  color: #991b1b;
}

.result-url {
  flex: 1;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #00000040;
}

.dropdown-btn .material-symbols-outlined {
  transition: transform 0.2s ease, color 0.2s ease;
  user-select: none;
}

.dropdown-btn:hover .material-symbols-outlined {
  color: #00000080;
}

.dropdown-btn .rotated {
  transform: rotate(90deg);
  /* Points down when open */
}

/* Base class for active transition state */
.slide-details-enter-active,
.slide-details-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
  /* CRITICAL: Must hide overflow during slide */
}

/* Enter/Leave from state (Hidden) */
.slide-details-enter-from,
.slide-details-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* Enter/Leave to state (Visible) */
.slide-details-enter-to,
.slide-details-leave-from {
  /* Set max-height larger than content ever will be */
  max-height: 500px;
  opacity: 1;
}

.result-details {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: 1em 1.5em;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75em;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.urls-item {
  grid-column: 1 / -1;
}

.urls-item ul {
  list-style: none;
  padding: 0;
}

.urls-item li a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.label {
  font-size: 11px;
  text-transform: uppercase;
  color: #64748b;
  /* slate-500 */
  font-weight: 600;
  letter-spacing: 0.025em;
}

.value {
  font-size: 13px;
  color: #0f172a;
  /* slate-900 */
  font-weight: 500;
}
</style>