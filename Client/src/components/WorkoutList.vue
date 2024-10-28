<script lang="ts">
import { defineComponent } from 'vue'
import WorkoutItem from '@/components/WorkoutItem.vue'
import Workout from '@/components/WorkoutItem.vue'
export default defineComponent({
  components: {
    WorkoutItem
  },
  props: {
    workouts: {
      type: Array as () => (typeof Workout)[],
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
