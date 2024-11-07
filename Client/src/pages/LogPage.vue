<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import WorkoutList from '@/components/WorkoutList.vue'

interface User {
  username: string
}

const loggedInUser = ref<User | null>(null)

export default defineComponent({
  components: {
    WorkoutList
  },
  setup() {
    const userName = ref('Guest')
    const isModalOpen = ref(false)
    const workouts = ref<any[]>([])

    onMounted(() => {
      loggedInUser.value = { username: 'TestUser' }
      userName.value = loggedInUser.value?.username || 'Guest'
    })

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleAddWorkout = (workoutData: any) => {
      workouts.value.push(workoutData)
      closeModal()
    }

    return {
      isModalOpen,
      openModal,
      closeModal,
      handleAddWorkout,
      workouts,
      userName
    }
  }
})
</script>

<template>
  <div class="log-page">
    <header class="log-header">
      <div class="user-info">
        <img class="user-icon" src="" alt="User Icon" />
        <h1 class="username">{{ userName }}'s Exercise Log</h1>
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
