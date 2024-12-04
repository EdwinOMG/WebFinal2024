<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const username = ref('')

onMounted(async () => {
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (session) {
      const { data, error } = await supabase
        .from('User')
        .select('username')
        .eq('email', session.user?.email)
        .single()

      if (error) {
        console.error('Error retrieving username:', error)
      } else {
        username.value = data?.username || 'Guest'
      }
    } else {
      username.value = 'Guest'
    }
  } catch (error) {
    console.error('Error fetching session or username:', error)
  }
})
</script>

<template>
  <div class="home-page">
    <h1>Welcome, {{ username }}!</h1>
  </div>
</template>

<style scoped>
.home-page {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: #333;
}
</style>
