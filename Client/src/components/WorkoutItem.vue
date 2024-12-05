<script lang="ts">
import { defineComponent } from 'vue'
import type { Workout } from '@/models/myFetch'

export default defineComponent({
  props: {
    workoutItem: {
      type: Object as () => Workout,
      required: true
    },
    indexed: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    return {
      workout: props.workoutItem,
      index: props.indexed
    }
  }
})
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
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: center;
  border: 2px solid #c4bebe;
  color: lightpink;
  box-shadow: 0 0 10px #c4bebe;
}

p strong {
  color: black;
  font-style: italic;
}
</style>
