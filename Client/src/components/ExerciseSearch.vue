<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)
const workoutTitle = ref('')
const workoutLocation = ref('')
const workoutDuration = ref('')
const selectedExercise = ref('')
const workoutDistance = ref('')

const exercises = ref(['Running', 'Walking', 'Cycling', 'Swimming'])

interface Workout {
  title: string
  location: string
  duration: string
  exercise: string
  distance: string
}

const workouts = ref<Workout[]>([])

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const addWorkout = () => {
  if (
    workoutTitle.value &&
    workoutLocation.value &&
    workoutDuration.value &&
    selectedExercise.value &&
    workoutDistance.value
  ) {
    workouts.value.push({
      title: workoutTitle.value,
      location: workoutLocation.value,
      duration: workoutDuration.value,
      exercise: selectedExercise.value,
      distance: workoutDistance.value
    })
    closeModal()
    workoutTitle.value = ''
    workoutLocation.value = ''
    workoutDuration.value = ''
    selectedExercise.value = ''
    workoutDistance.value = ''
  }
}
</script>
<template>
  <div>
    <div class="container mt-5 has-text-centered">
      <button class="button is-primary" @click="openModal">Add Workout</button>
    </div>

    <div class="workout-container">
      <div v-for="(workout, index) in workouts" :key="index" class="box workout-box">
        <h2 class="title is-4">{{ workout.title }}</h2>
        <p><strong>Location:</strong> {{ workout.location }}</p>
        <p><strong>Duration:</strong> {{ workout.duration }} minutes</p>
        <p><strong>Exercise Type:</strong> {{ workout.exercise }}</p>
        <p v-if="workout.distance"><strong>Distance:</strong> {{ workout.distance }} miles</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal is-active">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title">Add New Workout</h2>

          <!-- Workout Title -->
          <div class="field">
            <label class="label">Workout Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="workoutTitle"
                placeholder="Enter workout title"
              />
            </div>
          </div>

          <!-- Location -->
          <div class="field">
            <label class="label">Location</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="workoutLocation"
                placeholder="Enter workout location"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Workout Duration (minutes)</label>
            <div class="control">
              <input
                class="input"
                type="number"
                v-model="workoutDuration"
                placeholder="Enter workout duration"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Exercise Type</label>
            <div class="control">
              <div class="select">
                <select v-model="selectedExercise">
                  <option disabled value="">Select exercise type</option>
                  <option v-for="exercise in exercises" :key="exercise">{{ exercise }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Workout Distance (miles)</label>
            <div class="control">
              <input
                class="input"
                type="number"
                v-model="workoutDistance"
                placeholder="Enter workout distance"
              />
            </div>
          </div>

          <button class="button is-success mt-3" @click="addWorkout">Add Workout</button>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.navbar {
  padding: 1rem;
}

.workout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.workout-box {
  width: 80%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-content {
  width: 100%;
  max-width: 600px;
}
</style>
