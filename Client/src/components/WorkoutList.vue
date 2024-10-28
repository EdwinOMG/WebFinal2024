<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import WorkoutItem from '@/components/WorkoutItem.vue'
import WorkoutModal from '@/components/WorkoutModal.vue'

interface Workout {
  title: string
  location: string
  duration: number
  exercise: string
  distance?: number
}

export default defineComponent({
  components: {
    WorkoutItem,
    WorkoutModal
  },
  setup() {
    const workouts = ref<Workout[]>([])
    const isModalOpen = ref(false)
    const totalDistance = ref(0)

    onMounted(() => {
      const savedWorkouts = localStorage.getItem('workouts')
      if (savedWorkouts) {
        workouts.value = JSON.parse(savedWorkouts)
      }
      calculateTotalDistance()
    })

    watch(
      workouts,
      (newWorkouts) => {
        localStorage.setItem('workouts', JSON.stringify(newWorkouts))
      },
      { deep: true }
    )

    const calculateTotalDistance = () => {
      totalDistance.value = workouts.value.reduce(
        (sum, workout) => sum + (workout.distance || 0),
        0
      )
    }

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleAddWorkout = (newWorkout: Workout) => {
      workouts.value.push(newWorkout)
      calculateTotalDistance()
      closeModal()
    }

    return {
      workouts,
      isModalOpen,
      openModal,
      closeModal,
      handleAddWorkout
    }
  }
})
</script>

<template>
  <div>
    <button class="button is-primary" @click="openModal">Add Workout</button>
    <WorkoutModal :isModalOpen="isModalOpen" @close="closeModal" @add-workout="handleAddWorkout" />
    <WorkoutItem
      v-for="(workout, index) in workouts"
      :key="index"
      :workout="workout"
      :index="index"
    />
  </div>
</template>

<style scoped></style>
