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
  const getUsers = async () => {
    try {
      const { data, error } = await supabase.from('User').select('username, email')

      if (error) {
        console.error('Error fetching users:', error)
        return []
      }
      return data
    } catch (error) {
      console.error('Unexpected error fetching users:', error)
      return []
    }
  }

  const getUsersByQuery = async (query: string): Promise<{ username: string | null }[]> => {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('username')
        .or(`username.eq.${query},email.eq.${query}`)
      if (error) {
        console.error('Error fetching user by query:', error)
        return []
      }
      return data ? data : []
    } catch (error) {
      console.error('Unexpected error fetching users:', error)
      return []
    }
  }

  return {
    username,
    email,
    supabase: supabaseClient,
    getUsers,
    getUsersByQuery
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
      workouts.value = data || []
      totalDistance.value = workouts.value.reduce(
        (sum, workout) => sum + (workout.distance || 0),
        0
      )
    }
  }
  console.log(workouts.value)

  const addWorkout = async (workout: Workout) => {
    const { data, error } = await supabase.from('Workouts').insert([workout])
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

interface Friend {
  id: number
  user_username: string
  friend_username: string
  friend_request: boolean
  workouts: {
    id: number
    username: string
    title: string
    location: string
    duration: number
    exercise: string
    distance: number
  }
}

export function useFriends(username: string) {
  const friends = ref<Friend[]>([])
  const confirmedFriends = ref<Friend[]>([])
  const pendingFriendRequests = ref<Friend[]>([])

  const fetchFriends = async () => {
    const { data, error } = await supabase.from('Friends').select('*').eq('user_username', username)
    if (error) {
      console.error('Error fetching friends:', error)
      return
    }
    friends.value = data || []
  }

  const addFriend = async (user_username: string, friend_username: string) => {
    const { data, error } = await supabase.from('Friends').insert([
      {
        user_username,
        friend_username,
        friend_request: false
      }
    ])
    if (error) {
      console.error('Error adding friend:', error)
    } else {
      fetchFriends() // to refresh friends list
    }
  }

  const acceptFriendRequest = async (friend_username: string) => {
    const { data, error } = await supabase
      .from('Friends')
      .update({ friend_request: true })
      .eq('user_username', username)
      .eq('friend_username', friend_username)

    if (error) {
      console.error('Error accepting friend request:', error)
    } else {
      fetchFriends()
    }
  }

  const rejectFriendRequest = async (friend_username: string) => {
    const { data, error } = await supabase
      .from('Friends')
      .delete()
      .eq('user_username', username)
      .eq('friend_username', friend_username)

    if (error) {
      console.error('Error rejecting friend request:', error)
    } else {
      fetchFriends()
    }
  }

  const fetchConfirmedFriends = async () => {
    const { data, error } = await supabase
      .from('Friends')
      .select('*')
      .eq('user_username', username)
      .eq('friend_request', true)
    if (error) {
      console.error('Error fetching confirmed friends:', error)
      return
    }
    confirmedFriends.value = data || []
  }

  const fetchPendingFriendRequests = async () => {
    const { data, error } = await supabase
      .from('Friends')
      .select('*')
      .eq('user_username', username)
      .eq('friend_request', false)
    if (error) {
      console.error('Error fetching pending friend requests:', error)
      return
    }
    pendingFriendRequests.value = data || []
  }

  return {
    friends,
    fetchFriends,
    addFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    fetchConfirmedFriends,
    fetchPendingFriendRequests
  }
}
