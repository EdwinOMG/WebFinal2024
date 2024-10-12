<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'

const search = ref('')
const isPopupOpen = ref(false)
const exercises = ref([
  { name: 'Push-up', logo: '🏋️' },
  { name: 'Squat', logo: '🦵' },
  { name: 'Bench Press', logo: '💪' },
  { name: 'Deadlift', logo: '🏋️‍♂️' },
  { name: 'Pull-up', logo: '🤸‍♂️' }
])

const searchExercises = () => {
  console.log(`Searching for ${search.value}`)
}

const openPopup = () => {
  isPopupOpen.value = true
}

const closePopup = () => {
  isPopupOpen.value = false
}
</script>

<template>
  <div>
    <div class="field">
      <label class="label">Search for an exercise</label>
      <div class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Click to search"
          @focus="openPopup"
          readonly
        />
        <span class="icon is-small is-left">
          <FontAwesomeIcon icon="faMagnifyingGlass" class="icon-color" />
        </span>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isPopupOpen" class="modal is-active">
      <div class="modal-background" @click="closePopup"></div>
      <div class="modal-content">
        <div class="box">
          <!-- Search input -->
          <div class="field">
            <label class="label">Search for an exercise</label>
            <div class="control has-icons-left">
              <input
                class="input is-medium"
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

          <div class="exercise-list">
            <ul>
              <li v-for="exercise in exercises" :key="exercise.name" class="exercise-item">
                <span class="exercise-logo">{{ exercise.logo }}</span>
                <span class="exercise-name">{{ exercise.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closePopup"></button>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  background-color: rgba(10, 10, 10, 0.4);
}

.modal-content {
  max-width: 500px;
  margin: 0 auto;
}

.exercise-list {
  margin-top: 20px;
}

.icon-color {
  color: white;
}

.exercise-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.exercise-logo {
  font-size: 1.5rem;
  margin-right: 10px;
}

.exercise-name {
  font-size: 1.2rem;
}
</style>
