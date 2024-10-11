<script setup lang="ts">
import { ref } from 'vue'
const search = ref('')

const searchExercises = () => {
  console.log('Searching for ${search.value}')
}
</script>

<template>
  <div class="container">
    <div class="field">
      <label class="label">Search for an exercise</label>
      <div class="control has-icons-left">
        <input
          class="input"
          type="text"
          v-model="search"
          @input="searchExercises"
          placeholder="Search for an exercise"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
