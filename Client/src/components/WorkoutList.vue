<script lang="ts">
import { defineComponent } from 'vue'
import WorkoutItem from '@/components/WorkoutItem.vue'

interface Workout {
  title: string
  location: string
  duration: number
  exercise: string
  distance?: number
}

export default defineComponent({
  components: {
    WorkoutItem
  },
  props: {
    workouts: {
      type: Array as () => Workout[],
      required: true
    }
  }
})
</script>

<template>
  <div>
    <WorkoutItem
      v-for="(workout, index) in workouts"
      :key="index"
      :workout="workout"
      :index="index"
    />
  </div>
</template>

<style scoped></style>
