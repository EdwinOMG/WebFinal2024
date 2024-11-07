<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import WorkoutItem from '@/components/WorkoutItem.vue'
import WorkoutModal from '@/components/WorkoutModal.vue'

export default defineComponent({
  components: {
    WorkoutModal,
    WorkoutItem
  },
  setup() {
    const isModalOpen = ref(false)
    const workouts = ref<any[]>([])
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

    const handleAddWorkout = (workoutData: any) => {
      workouts.value.push(workoutData)
      closeModal()
    }
    return {
      isModalOpen,
      workouts,
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
    <WorkoutItem
      v-for="(workout, index) in workouts"
      :key="index"
      :workout="workout"
      :index="index"
    />
  </div>
</template>

<style scoped>
.button {
  display: block;
  margin: auto;
  margin-bottom: 1rem;
}
</style>
