<script setup>
import NavigationBar from './components/NavigationBar.vue';
import SearchBar from './components/SearchBar.vue';
import Contents from './components/Contents.vue';
</script>

<template>
  <NavigationBar />
  <main>
    <div class="container">
      <SearchBar />
      <Contents />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
}

.container {
  width: clamp(200px, 60%, 600px)
}
</style>