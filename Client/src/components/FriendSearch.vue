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

const selectedFriend = ref<Friend | null>(null)

const viewFriendLogs = (friend: Friend) => {
  selectedFriend.value = friend
}

onMounted(() => {
  const userData = sessionStorage.getItem('loggedInUser')
  if (userData) {
    loggedInUser.value = JSON.parse(userData)
  }
})
</script>

<template>
  <div class="box friendscolumn">
    <h2 class="title">Friends</h2>
    <input type="text" v-model="searchQuery" placeholder="Search for friends" class="input" />
    <button class="button is-primary" @click="searchFriends">Search</button>

    <ul v-if="searchResults.length">
      <li v-for="friend in searchResults" :key="friend.username">
        {{ friend.username }} - {{ friend.email }}
        <button @click="addFriend(friend)" class="button is-small">Add Friend</button>
      </li>
    </ul>

    <h2 class="title">Your Friends</h2>
    <ul>
      <li v-for="friend in friends" :key="friend.username">
        {{ friend.username }}
        <button @click="viewFriendLogs(friend)" class="button is-small">View Logs</button>
      </li>
    </ul>
  </div>

  <div v-if="selectedFriend" class="box friend-logs">
    <h2>{{ selectedFriend.username }}'s Logs</h2>
    <ul>
      <li v-for="log in selectedFriend.logs" :key="log.title">
        {{ log.title }} - {{ log.exercise }} for {{ log.duration }} minutes
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
