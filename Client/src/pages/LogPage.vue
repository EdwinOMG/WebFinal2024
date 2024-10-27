<script lang="ts">
import { defineComponent, ref } from 'vue'
import WorkoutModal from '@/components/WorkoutModal.vue'

export default defineComponent({
  components: {
    WorkoutModal
  },
  setup() {
    const isModalOpen = ref(false)

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const handleAddWorkout = (workoutData: any) => {
      console.log('Workout added:', workoutData)
      closeModal()
    }

    return {
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
  </div>
</template>
<style scoped></style>
