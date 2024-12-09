<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/pages/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.body {
  background-color: aliceblue;
}
.container {
  background-color: lightpink;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
