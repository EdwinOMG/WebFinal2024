<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
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
