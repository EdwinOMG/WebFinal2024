<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div style="background-color: lightblue">
    <div>
      <header>
        <NavBar />
      </header>
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
