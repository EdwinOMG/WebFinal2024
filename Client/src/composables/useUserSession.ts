// src/composables/useUserSession.ts
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function useUserSession() {
  const username = ref<string | null>(null)
  const email = ref<string | null>(null)
  const supabaseClient = supabase

  onMounted(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (session) {
      const { data, error } = await supabase
        .from('User') // Assuming your table is called 'users'
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
