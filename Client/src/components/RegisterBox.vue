<script setup lang="ts"></script>

<template>
  <div>
    <h1>Register</h1>
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped></style>
