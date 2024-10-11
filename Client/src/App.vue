<script setup lang="ts">
import { RouterView } from 'vue-router'
import LogPage from './pages/LogPage.vue';
</script>

<template>
  <header>
    <LogPage />
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
