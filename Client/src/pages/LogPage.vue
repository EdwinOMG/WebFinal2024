<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import WorkoutList from '@/components/WorkoutList.vue'
import { useWorkouts, useUserSession } from '@/models/myFetch' // Import the Workout type
import type { Workout } from '@/models/myFetch'

export default defineComponent({
  components: {
    WorkoutList
  },
  setup() {
    const { username } = useUserSession()

    const isModalOpen = ref(false)

    const { workouts, totalDistance, fetchWorkouts, addWorkout } = useWorkouts(username.value)
    const newWorkout = ref<Workout>({
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
          title: '',
          location: '',
          duration: 0,
          exercise: '',
          distance: 0
        }
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
    </header>

    <div class="workout-container">
      <WorkoutList :workouts="workouts" />
    </div>
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
  font-style: bold;
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
</style>
