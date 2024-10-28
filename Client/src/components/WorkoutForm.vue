<script lang="ts">
import { ref } from 'vue'
const exercises = ['Running', 'Cycling', 'Swimming', 'Walking', 'Hiking']

export default {
  props: {
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
  setup(props, { emit }) {
    const localWorkoutTitle = ref(props.workoutTitle || '')
    const localWorkoutLocation = ref(props.workoutLocation || '')
    const localWorkoutDuration = ref(props.workoutDuration || '')
    const localSelectedExercise = ref(props.selectedExercise || '')
    const localWorkoutDistance = ref(props.workoutDistance || '')

    const submitForm = () => {
      emit('submit', {
        title: localWorkoutTitle.value,
        location: localWorkoutLocation.value,
        duration: localWorkoutDuration.value,
        exercise: localSelectedExercise.value,
        distance: localWorkoutDistance.value
      })
    }

    return {
      localWorkoutTitle,
      localWorkoutLocation,
      localWorkoutDuration,
      localSelectedExercise,
      localWorkoutDistance,
      submitForm,
      exercises
    }
  }
}
</script>

<template>
  <div class="box">
    <h2 class="title">Add New Workout</h2>
    <label class="label">Workout Title</label>
    <input
      class="input"
      type="text"
      v-model="localWorkoutTitle"
      placeholder="Enter workout title"
    />

    <div class="field">
      <label class="label">Location</label>
      <input
        class="input"
        type="text"
        v-model="localWorkoutLocation"
        placeholder="Enter workout location"
      />
    </div>

    <div class="field">
      <label class="label">Workout Duration (minutes)</label>
      <input
        class="input"
        type="number"
        v-model="localWorkoutDuration"
        placeholder="Enter workout duration"
      />
    </div>

    <div class="field">
      <label class="label">Exercise Type</label>
      <div class="select">
        <select v-model="localSelectedExercise">
          <option disabled value="">Select exercise type</option>
          <option v-for="exercise in exercises" :key="exercise">{{ exercise }}</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Workout Distance (miles)</label>
      <input
        class="input"
        type="number"
        v-model="localWorkoutDistance"
        placeholder="Enter workout distance"
      />
    </div>

    <button class="button is-success mt-3" @click="submitForm">Add Workout</button>
  </div>
</template>

<style scoped></style>
