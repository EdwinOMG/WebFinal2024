<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'

interface User {
  username: string
  password: string
  role: string
}

const loggedInUser = ref<User | null>(null)
const allUsers = ref<User[]>([])
onMounted(() => {
  const userData = sessionStorage.getItem('loggedInUser')
  if (userData) {
    loggedInUser.value = JSON.parse(userData)
  }

  if (loggedInUser.value?.role !== 'admin') {
    alert('Access denied. You do not have admin privileges.')
    router.push('/')
  }
})
</script>

<template>
  <div class="admin-board">
    <h1>Admin Dashboard</h1>
    <div v-if="loggedInUser?.role === 'admin'">
      <h2>All Registered Users</h2>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUsers" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Access denied. Please log in as an admin to view this page.</p>
    </div>
  </div>
</template>

<style scoped>
.admin-board {
  padding: 20px;
}

.table {
  margin-top: 20px;
}
</style>
