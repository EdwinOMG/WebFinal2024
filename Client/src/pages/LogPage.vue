<script lang="ts">
import { defineComponent, ref } from 'vue'
import WorkoutModal from '@/components/WorkoutModal.vue'
import WorkoutList from '@/components/WorkoutList.vue'

export default defineComponent({
  components: {
    WorkoutModal,
    WorkoutList
  },
  setup() {
    const isModalOpen = ref(false)
    const workouts = ref<any[]>([])

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
      workouts
    }
  }
})
</script>

<template>
  <div>
    <button class="button is-primary" @click="openModal">Add Workout</button>
    <WorkoutModal :isModalOpen="isModalOpen" @close="closeModal" @add-workout="handleAddWorkout" />
    <WorkoutList :workouts="workouts" />
  </div>
</template>
<style scoped></style>
