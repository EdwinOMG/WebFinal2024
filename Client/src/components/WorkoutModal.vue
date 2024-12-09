<script lang="ts">
import { defineComponent, computed } from 'vue'
import WorkoutForm from '@/components/WorkoutForm.vue'
import { useUserSession } from '@/models/myFetch'

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
  emits: ['update:isModalOpen'],
  setup() {
    const { username } = useUserSession()

    const user = computed(() => username.value)

    return {
      user
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:isModalOpen', false)
    }
  }
})
</script>

<template>
  <div v-if="isModalOpen" class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <WorkoutForm
        :workout="{
          username: user,
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
  transition: opacity 0.3s ease;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
