<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <container>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Username" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
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
      <p class="control link">
        <RouterLink to="/loginpage" class="signlink">
          Already have an account? Sign in here.
        </RouterLink>
      </p>
    </div>
  </container>
</template>

<style scoped>
signlink.is-link {
  color: #00d1b2;
  text-decoration: underline;
}
</style>
