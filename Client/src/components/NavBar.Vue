<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoginBadge from './LoginBadge.vue'
const isOpen = ref(false)
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
          <LoginBadge />
          <div class="navbar-item">
            <div class="buttons">
              <a class="button custom-button">
                <RouterLink to="/registerpage" class="navbar-item"> Sign Up </RouterLink>
              </a>
              <a class="button custom-button">
                <RouterLink to="/loginpage" class="navbar-item"> Login </RouterLink>
              </a>
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
  padding: 0px 0px;
  font-size: 1rem;
  border-radius: 1px;
  transition: background-color 0.3s ease;
}
</style>
