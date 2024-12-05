<script lang="ts">
import { defineComponent } from 'vue'
import WorkoutForm from '@/components/WorkoutForm.vue'
import { useUserSession } from '@/models/myFetch'
const { username } = useUserSession()

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
      type: Number,
      default: 0
    },
    selectedExercise: {
      type: String,
      default: ''
    },
    workoutDistance: {
      type: Number,
      default: 0
    }
  },
  components: {
    WorkoutForm
  },
  data() {
    return {
      username
    }
  },
  methods: {
    openModal() {
      this.$emit('open')
    },
    closeModal() {
      this.$emit('close')
    }
  }
})
</script>

<template>
  <div v-if="isModalOpen" class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <WorkoutForm
        v-if="isModalOpen"
        :workout="{
          username: username,
          title: workoutTitle,
          location: workoutLocation,
          duration: workoutDuration,
          exercise: selectedExercise,
          distance: workoutDistance
        }"
        @closeModal="closeModal"
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
