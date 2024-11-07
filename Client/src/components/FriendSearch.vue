<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface User {
  username: string
  email: string
}
import { registeredUsers } from '@/data/users'

interface Friend {
  username: string
  email: string

  logs: {
    title: string
    duration: string
    exercise: string
  }[]
}

const loggedInUser = ref<User | null>(null)
const friends = ref<Friend[]>([])
const searchQuery = ref('')
const searchResults = ref<User[]>([])

const searchFriends = () => {
  searchResults.value = registeredUsers.value.filter(
    (user: User) =>
      user.username.includes(searchQuery.value) && user.username !== loggedInUser.value?.username
  )
}

const addFriend = (friend: User) => {
  const newFriend: Friend = {
    ...friend,
    logs: [
      { title: 'Running', duration: '30', exercise: 'Running' },
      { title: 'Cycling', duration: '60', exercise: 'Cycling' }
    ]
  }
  friends.value.push(newFriend)
}

onMounted(() => {
  const userData = sessionStorage.getItem('loggedInUser')
  if (userData) {
    loggedInUser.value = JSON.parse(userData)
  }
})
</script>

<template>
  <div class="box friendsearch">
    <h2 class="title">Friends</h2>
    <input type="text" v-model="searchQuery" placeholder="Search for friends" class="input" />
    <button class="button is-primary" @click="searchFriends">Search</button>

    <ul v-if="searchResults.length">
      <li v-for="friend in searchResults" :key="friend.username">
        {{ friend.username }} - {{ friend.email }}
        <button @click="addFriend(friend)" class="button is-small">Add Friend</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.box {
  padding: 10px;
  float: left;
  margin: auto;
  border: 1px solid lightpink;
  background-color: white;
  margin-top: 10px;
  width: 50%;
}
h2 {
  color: lightpink;
}
.friendsearch {
  width: 40%;
}
</style>
