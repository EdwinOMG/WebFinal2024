<script lang="ts">
interface Workout {
  title: string
  location: string
  duration: number
  exercise: string
  distance?: number
}
export default {
  props: {
    workout: {
      type: Object as () => Workout,
      default: () => ({})
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<template>
  <div class="workout-box">
    <h2 class="title is-4">{{ workout?.title }}</h2>
    <p><strong>Location:</strong> {{ workout?.location }}</p>
    <p><strong>Duration:</strong> {{ workout?.duration }} minutes</p>
    <p><strong>Exercise Type:</strong> {{ workout?.exercise }}</p>
    <p v-if="workout?.distance"><strong>Distance:</strong> {{ workout?.distance }} miles</p>
    <div v-else>
      <p>No workout details available.</p>
    </div>
  </div>
</template>

<style scoped>
.workout-box {
  width: 80%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  text-align: center;
}
</style>
