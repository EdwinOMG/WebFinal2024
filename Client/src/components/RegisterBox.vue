<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="container">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Username" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="email" placeholder="Email" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Confirm Password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-success">Create Account</button>
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
