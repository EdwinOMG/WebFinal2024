<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFriends, useUserSession } from '@/models/myFetch'

const { username, getUsers, getUsersByQuery } = useUserSession()

interface User {
  username: string
}
const { fetchFriends, addFriend, acceptFriendRequest, rejectFriendRequest } = useFriends(
  username.value
)

interface Friend {
  user_username: string
  friend_username: string
  logs: {
    title: string
    location: string
    duration: number
    exercise: string
    distance: number
  }[]
}

const friends = ref<Friend[]>([])
const searchQuery = ref('')
const searchResults = ref<User[]>([])
const isSearching = ref(false)

const searchFriends = async () => {
  if (!searchQuery.value.trim()) {
    try {
      isSearching.value = true
      const data: User[] = await getUsers()
      searchResults.value = data.filter((user) => user.username !== username.value)
    } catch (error) {
      console.error('Error fetching all users:', error)
      alert('Failed to fetch users. Please try again.')
    } finally {
      isSearching.value = false
    }
  } else {
    try {
      isSearching.value = true
      const data: User[] = (await getUsersByQuery(searchQuery.value.trim())).filter(
        (user) => user.username !== null
      ) as User[]
      if (data && data.length > 0) {
        searchResults.value = data.filter((user) => user.username !== username.value)
      } else {
        alert('No user found with that username.')
        searchResults.value = []
      }
    } catch (error) {
      console.error('Error searching for users:', error)
      alert('Failed to search for users. Please try again.')
    } finally {
      isSearching.value = false
    }
  }
}

const handleAddFriend = async (friend_username: string) => {
  try {
    await addFriend(username.value, friend_username)
    alert('Friend request sent successfully!')
  } catch (error) {
    console.error('Error adding friend:', error)
    alert('Failed to send friend request. Please try again.')
  }
}

onMounted(fetchFriends)
</script>

<template>
  <div class="box friendsearch">
    <h2 class="title">Friends</h2>
    <input type="text" v-model="searchQuery" placeholder="Search for friends" class="input" />
    <button class="button is-primary" :disabled="isSearching" @click="searchFriends">Search</button>

    <ul v-if="searchResults.length">
      <li v-for="friend in searchResults" :key="friend.username">
        {{ friend.username }}
        <button class="button is-small" @click="handleAddFriend(friend.username)">
          Add Friend
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.box {
  padding: 10px;
  float: left;
  border: 1px solid lightpink;
  background-color: white;
  margin-top: 10px;
  margin-left: 40px;
  width: 50%;
  height: auto;
}
h2 {
  color: lightpink;
}
.input {
  margin-bottom: 10px;
}
</style>
