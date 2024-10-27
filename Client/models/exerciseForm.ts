import { ref, onMounted } from 'vue'

const isModalOpen = ref(false)
const workoutTitle = ref('')
const workoutLocation = ref('')
const workoutDuration = ref('')
const selectedExercise = ref('')
const workoutDistance = ref('')

const exercises = ref(['Running', 'Walking', 'Cycling', 'Swimming'])

const editingIndex = ref<number | null>(null)

interface Workout {
  title: string
  location: string
  duration: string
  exercise: string
  distance: string
}

const workouts = ref<Workout[]>([])

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  clearForm()
}

const clearForm = () => {
  workoutTitle.value = ''
  workoutLocation.value = ''
  workoutDuration.value = ''
  selectedExercise.value = ''
  workoutDistance.value = ''
  editingIndex.value = null
}

const editWorkout = (index: number) => {
  const workout = workouts.value[index]
  workoutTitle.value = workout.title
  workoutLocation.value = workout.location
  workoutDuration.value = workout.duration
  selectedExercise.value = workout.exercise
  workoutDistance.value = workout.distance
  editingIndex.value = index
  openModal()
}

const deleteWorkout = (index: number) => {
  workouts.value.splice(index, 1)
  saveWorkouts()
}

const saveWorkouts = () => {
  localStorage.setItem('workouts', JSON.stringify(workouts.value))
}

const addWorkout = () => {
  if (
    workoutTitle.value &&
    workoutLocation.value &&
    workoutDuration.value &&
    selectedExercise.value &&
    workoutDistance.value
  ) {
    if (editingIndex.value !== null) {
      // Update the existing workout
      workouts.value[editingIndex.value] = {
        title: workoutTitle.value,
        location: workoutLocation.value,
        duration: workoutDuration.value,
        exercise: selectedExercise.value,
        distance: workoutDistance.value
      }
    } else {
      workouts.value.push({
        title: workoutTitle.value,
        location: workoutLocation.value,
        duration: workoutDuration.value,
        exercise: selectedExercise.value,
        distance: workoutDistance.value
      })
    }
    saveWorkouts()
    closeModal()
  }
}

onMounted(() => {
  const savedWorkouts = localStorage.getItem('workouts')
  if (savedWorkouts) {
    workouts.value = JSON.parse(savedWorkouts)
  }
})
