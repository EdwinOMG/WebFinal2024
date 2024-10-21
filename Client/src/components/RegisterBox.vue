<script setup lang="ts">
import { ref } from 'vue'
import { registeredUsers } from '@/data/users'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const registerUser = () => {
  if (
    username.value === '' ||
    email.value === '' ||
    password.value === '' ||
    confirmPassword.value === ''
  ) {
    alert('Please fill out all fields!')
    return
  }
  if (password.value === confirmPassword.value) {
    const newUser = {
      username: username.value,
      password: password.value,
      email: email.value,
      role: 'user'
    }
    registeredUsers.value.push(newUser)
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } else {
    alert('Passwords do not match!')
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
