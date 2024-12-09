<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import WorkoutList from '@/components/WorkoutList.vue'
import { useWorkouts, useUserSession } from '@/models/myFetch'
import type { Workout } from '@/models/myFetch'
import WorkoutModal from '@/components/WorkoutModal.vue'

export default defineComponent({
  components: {
    WorkoutList,
    WorkoutModal
  },
  setup() {
    const { username } = useUserSession()

    const isModalOpen = ref(false)

    const { workouts, totalDistance, fetchWorkouts, addWorkout } = useWorkouts(username.value)
    const newWorkout = ref<Workout>({
      username: username.value,
      title: '',
      location: '',
      duration: 0,
      exercise: '',
      distance: 0
    })

    onMounted(() => {
      fetchWorkouts()
    })

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleAddWorkout = async () => {
      try {
        await addWorkout(newWorkout.value)
        newWorkout.value = {
          username: username.value,
          title: '',
          location: '',
          duration: 0,
          exercise: '',
          distance: 0
        }
        closeModal()
      } catch (error) {
        console.error('Error adding workout:', error)
      }
    }

    return {
      isModalOpen,
      openModal,
      closeModal,
      handleAddWorkout,
      workouts,
      totalDistance,
      username,
      newWorkout
    }
  }
})
</script>

<template>
  <div class="log-page">
    <header class="log-header">
      <div class="user-info">
        <img class="user-icon" src="" alt="User Icon" />
        <h1 class="username">{{ username }}'s Exercise Log</h1>
      </div>
      <!-- Button to open the modal -->
      <button class="button is-primary" @click="openModal">Add Workout</button>
    </header>

    <div class="workout-container">
      <WorkoutList :workouts="workouts" />
    </div>

    <!-- Workout Modal -->
    <WorkoutModal
      v-model:isModalOpen="isModalOpen"
      :workoutTitle="newWorkout.title"
      :workoutLocation="newWorkout.location"
      :workoutDuration="newWorkout.duration"
      :selectedExercise="newWorkout.exercise"
      :workoutDistance="newWorkout.distance"
      @closeModal="closeModal"
    />
  </div>
</template>

<style scoped>
.log-page {
  padding: 1rem;
}

.log-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  color: black;
}

h1 {
  font-weight: bold;
}

.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-size: 1.5rem;
  margin: 0;
}

.workout-container {
  max-height: 500px;
  overflow-y: auto;
  max-width: 400px;
  border: 2px solid black;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  background-color: beige;
}

.button {
  margin-left: 10px;
}
</style>
