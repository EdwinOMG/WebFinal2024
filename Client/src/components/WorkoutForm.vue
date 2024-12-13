<script lang="ts">
import { ref } from 'vue'
import { useWorkouts, useUserSession } from '@/models/myFetch'
import type { Workout } from '@/models/myFetch'

const exercises = ['Running', 'Cycling', 'Swimming', 'Walking', 'Hiking']

export default {
  props: {
    workout: {
      type: Object as () => Workout,
      required: true
    }
  },
  emits: ['closeModal', 'addNewWorkout'],
  setup(props, { emit }) {
    const { username } = useUserSession()
    const { addWorkout } = useWorkouts(username.value)

    const localWorkoutTitle = ref(props.workout.title || '')
    const localWorkoutLocation = ref(props.workout.location || '')
    const localWorkoutDuration = ref(props.workout.duration || 0)
    const localSelectedExercise = ref(props.workout.exercise || '')
    const localWorkoutDistance = ref(props.workout.distance || 0)

    const isValidForm = ref(true)

    const submitForm = async () => {
      console.log(
        username.value,
        localWorkoutTitle.value,
        localWorkoutLocation.value,
        localWorkoutDuration.value,
        localSelectedExercise.value,
        localWorkoutDistance.value
      )
      if (
        !localWorkoutTitle.value ||
        !localWorkoutLocation.value ||
        localWorkoutDuration.value <= 0 ||
        !localSelectedExercise.value ||
        localWorkoutDistance.value <= 0
      ) {
        isValidForm.value = false
        return
      }
      const workoutData = {
        username: username.value,
        title: localWorkoutTitle.value,
        location: localWorkoutLocation.value,
        duration: localWorkoutDuration.value,
        exercise: localSelectedExercise.value,
        distance: localWorkoutDistance.value
      }

      try {
        await addWorkout(workoutData)
        emit('addNewWorkout', workoutData)
        emit('closeModal')
      } catch (error) {
        console.error('Error adding workout:', error)
      }
    }
    const closeForm = () => {
      //close form without submitting
      emit('closeModal')
    }

    return {
      submitForm,
      closeForm,
      exercises,
      localWorkoutTitle,
      localWorkoutLocation,
      localWorkoutDuration,
      localSelectedExercise,
      localWorkoutDistance,
      isValidForm
    }
  }
}
</script>

<template>
  <h2 class="title">Add New Workout</h2>
  <div v-if="!isValidForm" class="notification is-danger">
    Please fill out all fields correctly.
  </div>
  <label class="label">Workout Title</label>
  <input class="input" type="text" v-model="localWorkoutTitle" placeholder="Enter workout title" />

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
</template>

<style scoped></style>
