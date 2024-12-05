const API_URL = 'http://localhost:3000/api/v1/'
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function rest<T>(url: string, data?: any, method?: string): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }
    return res.json()
  })
}

export function api<T>(url: string, data?: any, method?: string): Promise<T> {
  return rest<T>(API_URL + url, data, method)
}

export function useUserSession() {
  const username = ref<string>('')
  const email = ref<string | null>(null)
  const supabaseClient = supabase

  onMounted(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (session) {
      const { data, error } = await supabase
        .from('User')
        .select('username, email')
        .eq('email', session.user?.email)
        .single()

      if (error) {
        console.error('Error fetching user data:', error)
      } else {
        username.value = data?.username
        email.value = data?.email
      }
    }
  })

  return {
    username,
    email,
    supabase: supabaseClient
  }
}

export interface Workout {
  username: string
  title: string
  location: string
  duration: number
  exercise: string
  distance: number
}

export function useWorkouts(username: string) {
  const workouts = ref<Workout[]>([])
  const totalDistance = ref(0)

  const fetchWorkouts = async () => {
    if (username) {
      const { data, error } = await supabase.from('Workouts').select('*').eq('username', username)
      if (error) {
        console.error('Error fetching workouts:', error)
        return
      }
      console.log('supabase data:', data)
      workouts.value = data || []
      totalDistance.value = workouts.value.reduce(
        (sum, workout) => sum + (workout.distance || 0),
        0
      )
    }
  }
  console.log(workouts.value)

  const addWorkout = async (workout: Workout) => {
    const { data, error } = await supabase.from('Workouts').insert(workout)

    if (error) {
      console.error('Error inserting workout:', error)
    } else {
      workouts.value.push(...(data || []))
      totalDistance.value = workouts.value.reduce(
        (sum, workout) => sum + (workout.distance || 0),
        0
      )
    }
  }

  return {
    workouts,
    totalDistance,
    fetchWorkouts,
    addWorkout
  }
}

// for api
// // creates a html script tag, calls loadscript and create a promise that will return the script when done loading.
// //resolve and reject are parameters of the promise function to set it up
// // if done loading call reslve, and append it( add it to last ) to the script
// export async function loadScript(url: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${url}"]`)) {
//       resolve()
//       return
//     }
//     const script = document.createElement('script')
//     script.src = url
//     script.onload = () => resolve()
//     script.onerror = (err) => reject(err)
//     document.head.appendChild(script)
//   })
// }
