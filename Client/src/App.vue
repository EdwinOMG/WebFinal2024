<script setup lang="ts">
import { RouterView } from 'vue-router'
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
