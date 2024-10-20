<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div style="background-color: lightblue">
    <header>
      <NavBar />
    </header>

    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
