<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useUserSession, useWorkouts } from '@/models/myFetch'
import WorkoutItem from '@/components/WorkoutItem.vue'
import WorkoutModal from '@/components/WorkoutModal.vue'

const { username } = useUserSession()
export default defineComponent({
  components: {
    WorkoutModal,
    WorkoutItem
  },
  setup() {
    const { workouts, totalDistance, fetchWorkouts, addWorkout } = useWorkouts(username.value)

    const isModalOpen = ref(false)

    onMounted(() => {
      if (username) {
        fetchWorkouts()
      }
    })

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleAddWorkout = (workoutData: any) => {
      addWorkout(workoutData)
      closeModal()
    }

    return {
      isModalOpen,
      workouts,
      totalDistance,
      openModal,
      closeModal,
      handleAddWorkout
    }
  }
})
</script>

<template>
  <div>
    <button class="button is-primary is-light" @click="openModal">Add Workout</button>
    <WorkoutModal :isModalOpen="isModalOpen" @close="closeModal" @add-workout="handleAddWorkout" />

    <div v-if="workouts.length > 0">
      <WorkoutItem
        v-for="(workout, index) in workouts"
        :key="index"
        :workout="workout"
        :index="index"
      />
    </div>
    <div v-else>
      <p>No workouts found.</p>
    </div>

    <div v-if="totalDistance > 0">
      <p>Total Distance: {{ totalDistance }} km</p>
    </div>
  </div>
</template>

<style scoped>
.button {
  display: block;
  margin: auto;
  margin-bottom: 1rem;
}
</style>
