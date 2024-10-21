<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface User {
  username: string
  email: string
}

const loggedInUser = ref<User | null>(null)

onMounted(() => {
  const userData = sessionStorage.getItem('loggedInUser')
  if (userData) {
    loggedInUser.value = JSON.parse(userData)
  }
})
</script>

<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-quarters">
        <div class="box profilebox">
          <h2 class="title">Profile</h2>
          <div v-if="loggedInUser">
            <p><strong>Username: </strong> {{ loggedInUser.username }}</p>
            <p><strong>Email:</strong> {{ loggedInUser.email }}</p>
          </div>
          <div v-else>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
        <div class="box logbox">
          <h2 class="title">Stats</h2>
          <ul></ul>
        </div>
      </div>
      <div class="column">
        <div class="box friendscolumn">
          <h2 class="title">Friends</h2>
          <h2 class="title">Share with Friends</h2>
          <input type="text" placeholder="Enter friend's email" class="input" />
          <button class="button is-primary">Share</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container.is-fullheight {
  height: 80vh;
  width: 80vw;
}
.profilebox {
  margin-top: 30px;
  margin-left: -50px;
}
.column .logbox {
  margin-left: -50px;
  height: 50vh;
  margin-top: 80px;
}
.friendscolumn {
  height: 84vh;
  margin-top: 30px;
}
</style>
