<script setup lang="ts">
import { useUserSession } from '@/models/myFetch'
const { username } = useUserSession()
</script>

<template>
  <div class="home-page">
    <h1>Welcome, {{ username }}!</h1>
  </div>
</template>

<style scoped>
.home-page {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: #333;
}
</style>
