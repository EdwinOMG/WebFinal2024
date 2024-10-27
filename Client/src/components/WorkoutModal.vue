<script lang="ts">
import { defineComponent } from 'vue'
import WorkoutForm from '@/components/WorkoutForm.vue'

export default defineComponent({
  props: {
    isModalOpen: {
      type: Boolean,
      required: true
    },
    workoutTitle: {
      type: String,
      default: ''
    },
    workoutLocation: {
      type: String,
      default: ''
    },
    workoutDuration: {
      type: String,
      default: ''
    },
    selectedExercise: {
      type: String,
      default: ''
    },
    workoutDistance: {
      type: String,
      default: ''
    }
  },
  components: {
    WorkoutForm
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    addWorkout(workoutData: any) {
      this.$emit('add-workout', workoutData)
      this.closeModal()
    }
  }
})
</script>

<template>
  <div v-if="isModalOpen" class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <WorkoutForm
        :workoutTitle="workoutTitle"
        :workoutLocation="workoutLocation"
        :workoutDuration="workoutDuration"
        :selectedExercise="selectedExercise"
        :workoutDistance="workoutDistance"
        @submit="addWorkout"
      />
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
