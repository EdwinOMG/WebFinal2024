<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { createClient } from '@supabase/supabase-js'
console.log(import.meta.env.VITE_SUPABASE_URL)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// need to add edge cases, such as checking if email is in use, or username in use, as well as if password is strong
// MAKE SURE TO ADD POLICIES FOR TABLES, public for creating a user, while things like workout
// logs should be authenticated
const registerUser = async () => {
  if (
    username.value === '' ||
    email.value === '' ||
    password.value === '' ||
    confirmPassword.value === ''
  ) {
    alert('Please fill out all fields!')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  if (!passwordRegex.test(password.value)) {
    alert(
      'Password must be at least 8 characters long and include at least one number, one lowercase, and one uppercase letter.'
    )
    return
  }

  try {
    const { data: userExists } = await supabase
      .from('User')
      .select('username, email')
      .or(`email.eq.${email.value},username.eq.${username.value}`)

    if (userExists?.length) {
      alert('Email or username already in use. Please choose another.')
      return
    }

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (error) {
      throw error
    }

    const { error: insertError } = await supabase.from('User').insert({
      username: username.value,
      email: email.value,
      password: password.value, // Should be hashed automatically by Supabase
      role: 'user'
    })

    if (insertError) {
      throw insertError
    }

    alert('Account created successfully!')
    // Reset fields
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    router.push('/loginpage')
  } catch (error) {
    console.error('Error registering user:', error)
    alert('Failed to create account. Please try again.')
  }
}
</script>

<template>
  <div class="container">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="username" placeholder="Username" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="email" v-model="email" placeholder="Email" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" v-model="password" placeholder="Password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-success" @click="registerUser">Create Account</button>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <RouterLink to="/loginpage" class="signlink is-link">
          Already have an account? Sign in here.
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.signlink.is-link {
  color: #00d1b2;
  text-decoration: underline;
}
</style>
