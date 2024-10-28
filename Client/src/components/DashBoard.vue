<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface User {
  username: string
  email: string
}

interface Workout {
  title: string
  location: string
  duration: string
  exercise: string
  distance: number
}

const loggedInUser = ref<User | null>(null)
const workouts = ref<Workout[]>([])
const totalDistance = ref(0)

onMounted(() => {
  const userData = sessionStorage.getItem('loggedInUser')
  if (userData) {
    loggedInUser.value = JSON.parse(userData)
  }
  const savedWorkouts = localStorage.getItem('workouts')
  if (savedWorkouts) {
    workouts.value = JSON.parse(savedWorkouts)
  }

  totalDistance.value = workouts.value.reduce((sum, workout) => sum + (workout.distance || 0), 0)
})
</script>

<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-three-quarters">
        <div class="box">
          <h2 class="title">Profile</h2>
          <div v-if="loggedInUser">
            <p><strong>Username: </strong> {{ loggedInUser.username }}</p>
            <p><strong>Email:</strong> {{ loggedInUser.email }}</p>
          </div>
          <div v-else>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
        <div class="box">
          <h2 class="title">Stats</h2>
          <ul>
            <li><strong>Total Distance Done:</strong> {{ totalDistance }} miles</li>
          </ul>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="box">
          <h2 class="title">Friends</h2>
          <h2 class="title">Share with Friends</h2>
          <input type="text" placeholder="Enter friend's email" class="input" />
          <button class="button is-primary">Share</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
