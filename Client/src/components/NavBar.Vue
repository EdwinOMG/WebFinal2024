<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const isOpen = ref(false)
const isLoggedIn = ref(false)
const router = useRouter()

// check if jwt token exists in local storage
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})

const logout = () => {
  localStorage.removeItem('token') // removes token
  isLoggedIn.value = false // sets logged in to false
  router.push('/loginpage') // pushes to login page(might not be necessary due to router)
}
</script>
<template>
  <div>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <img alt="my logo" class="logo" src="@/assets/logo.png" width="30" height="30" />

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/homepage" class="navbar-item"> Home </RouterLink>
          <RouterLink to="/profileview" class="navbar-item"> Profile </RouterLink>
          <RouterLink to="/logpage" class="navbar-item"> Exercise Log </RouterLink>
          <RouterLink to="/friendpage" class="navbar-item"> Find Friends </RouterLink>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown is-hoverable">
            <RouterLink to="/adminpage" class="navbar-item"> Admin </RouterLink>
            <RouterLink to="/" class="navbar-item"> Report an issue </RouterLink>
            <RouterLink to="/" class="navbar-item"> Contact </RouterLink>
          </div>
        </div>

        <hr class="navbar-divider" />

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a v-if="!isLoggedIn" class="button custom-button">
                <RouterLink to="/registerpage" class="navbar-item"> Sign Up </RouterLink>
              </a>
              <a v-if="!isLoggedIn" class="button custom-button">
                <RouterLink to="/loginpage" class="navbar-item"> Login </RouterLink>
              </a>

              <a v-if="isLoggedIn" @click="logout" class="button is-large">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  background-color: white;
}

.navbar-burger {
  display: none;
}

@media screen and (max-width: 1024px) {
  .navbar-burger {
    display: block;
  }
}

.custom-button {
  background-color: pink;
  color: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 1.25rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: inline-block;
}

button.custom-button {
  font-size: 1rem; /* Makes sure the font size in the button element is controlled */
}
</style>
