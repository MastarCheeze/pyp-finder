<script setup>
const searchClicked = (e) => {
  console.log("Hi")
};
</script>

<template>
  <header>
    <form>
      <div class="search">
        <input class="search-input" placeholder="Search" type="search">
        <button type="submit" @click.prevent="searchClicked">
          <span class="material-symbols-outlined search-icon">search</span>
        </button>
      </div>
      <p id="status" class="">Found 21 results</p>
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
  transition: outline 0.1s ease;
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
  min-width: 0
}

.search-input::placeholder {
  color: #00000040;
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
  transition: background-color 0.1s ease;
}

button:hover {
  background-color: var(--color-surface-hover);
}

button:active {
  background-color: var(--color-border);
}

.search-icon {
  color: #00000040;
  transition: color 0.3s ease;
}

.search-icon {
  font-size: 1.75rem;
  cursor: pointer;
  user-select: none;
}

.search:focus-within .search-icon {
  color: #00000080;
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
</style>