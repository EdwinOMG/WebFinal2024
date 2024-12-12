<script lang="ts">
import { defineComponent } from 'vue'
import { useWorkouts, useUserSession } from '@/models/myFetch'
import WorkoutItem from './WorkoutItem.vue'

const { username } = useUserSession()
export default defineComponent({
  components: {
    WorkoutItem
  },
  setup() {
    const { workouts, fetchWorkouts } = useWorkouts(username.value)

    fetchWorkouts()

    return { workouts }
  }
})
</script>
<template>
  <div class="workout-list">
    <h2 class="title">My Workout List</h2>
    <div v-if="workouts.length > 0">
      <div v-for="(workout, index) in workouts" :key="index">
        <workout-item :workoutItem="workout" :indexed="index" />
      </div>
    </div>
    <div v-else>
      <p>No workouts available. Start by adding a workout!</p>
    </div>
  </div>
</template>

<style scoped>
.workout-list {
  padding: 20px;
}

h2.title {
  margin-bottom: 20px;
}

.workout-list p {
  color: gray;
  font-size: 1.1em;
  text-align: center;
}
</style>
