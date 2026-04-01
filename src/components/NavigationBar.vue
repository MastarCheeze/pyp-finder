<template>
  <nav>
    <div class="brand">
      <img src="@/assets/icon.png" alt="PYP Finder Icon" id="icon">
      <h1>PYP Finder</h1>
    </div>
    <ul class="links">
      <!-- <li><a href="">API Docs</a></li> -->
      <li><a href="https://github.com/MastarCheeze/pyp-finder">Github</a></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: stretch;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.6em 1.5em;
  background-color: var(--color-brand-dark);
}

#icon {
  height: 1.75rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-surface);
}

.links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.links li {
  display: flex;
}

.links a {
  display: flex;
  align-items: center;
  padding: 0 1em;
  color: var(--color-link-muted);
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.links a:hover {
  background-color: var(--color-brand);
  color: var(--color-surface);
}

.links a:active {
  background-color: var(--color-brand-600);
}
</style>