<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const router = useRouter()

const username = ref('')
const password = ref('')
const isNotificationVisible = ref(false)

const loginUser = () => {
  if (
    username.value === '' ||
    password.value === ''
  ) {
    alert('Fill out all fields to login!')
    return
  }
  try {
    const { data: userExists } = await supabase
      .from('User')
      .select('username')
    if (userExists?.length) {

      return
    }

    const { error } = await supabase.from('User').insert({
      username: username.value,
      email: email.value,
      password: password.value, // possibly hash server-side
      role: 'user'
    })

    if (error) {
      throw error
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
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="loginUser">
        <div class="textbox">
          <input type="text" placeholder="Username" v-model="username" />
        </div>
        <div class="textbox">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <button class="btn" type="submit">Login</button>
      </form>
      <div class="signup-link">
        <RouterLink to="/registerpage" class="is-link"> Sign up here! </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background-color: #f7f7f7;
  padding: 70px;
  border-radius: 10px;
  text-align: center;
}

.textbox {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border-color: white;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: lightpink;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background-color: pink;
}

.signup-link {
  margin-top: 15px;
}

.is-link {
  color: #00d1b2;
  text-decoration: underline;
  cursor: pointer;
}
</style>
