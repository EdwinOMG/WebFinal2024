<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useUserSession } from '@/models/myFetch'
const { username, email, supabase } = useUserSession()

interface Workout {
  title: string
  location: string
  duration: string
  exercise: string
  distance: number
}

const workouts = ref<Workout[]>([])
const totalDistance = ref(0)

onMounted(async () => {
  if (username.value) {
    const { data, error } = await supabase
      .from('Workouts')
      .select('*')
      .eq('username', username.value)
    if (error) {
      console.error('Error fetching workouts:', error)
    } else {
      workouts.value = data
      totalDistance.value = workouts.value.reduce(
        (sum, workout) => sum + (workout.distance || 0),
        0
      )
    }
  }
})
</script>

<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-three-quarters">
        <div class="box">
          <h2 class="title">Profile</h2>
          <div v-if="username">
            <p><strong>Username: </strong> {{ username }}</p>
            <p><strong>Email:</strong> {{ email }}</p>
          </div>
          <div v-else>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
        <div class="box statsBox">
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

<style scoped>
.container {
  padding: 10px;
}

.box {
  color: lightpink;
  background-color: white;
  margin-bottom: 20px;
}
.input {
  background-color: lightgray;
}
</style>
