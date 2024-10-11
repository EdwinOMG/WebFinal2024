<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
