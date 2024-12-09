<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFriends, useUserSession } from '@/models/myFetch'

const { username, getUsers, getUsersByQuery } = useUserSession()

interface User {
  username: string
}
const {
  fetchFriends,
  addFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  fetchPendingFriendRequests
} = useFriends(username.value)

interface Friend {
  user_username: string
  friend_username: string
}

const friends = ref<Friend[]>([])
const friendRequests = ref<Friend[]>([])
let searchQuery = ref('')
const searchResults = ref<User[]>([])
const isSearching = ref(false)
const activeTab = ref<'friends' | 'requests'>('friends')

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

const fetchAllFriendRequests = async () => {
  try {
    const requests: Friend[] = await fetchPendingFriendRequests()
    if (!requests || requests.length === 0) {
      friendRequests.value = []
    } else {
      friendRequests.value = requests
    }
  } catch (error) {
    console.error('Error fetching friend requests:', error)
    alert('Failed to fetch friend requests. Please try again.')
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

const switchTab = (tab: 'friends' | 'requests') => {
  activeTab.value = tab
  if (tab === 'requests') {
    fetchAllFriendRequests()
  }
}

const handleAcceptFriendRequest = async (friend_username: string) => {
  try {
    await acceptFriendRequest(friend_username)
    alert(`Friend request from ${friend_username} accepted!`)
    await fetchAllFriendRequests()
  } catch (error) {
    console.error('Error accepting friend request:', error)
    alert('Failed to accept friend request. Please try again.')
  }
}

const handleRejectFriendRequest = async (friend_username: string) => {
  try {
    await rejectFriendRequest(friend_username)
    alert(`Friend request from ${friend_username} rejected.`)
    await fetchAllFriendRequests()
  } catch (error) {
    console.error('Error rejecting friend request:', error)
    alert('Failed to reject friend request. Please try again.')
  }
}

onMounted(fetchFriends)
</script>

<template>
  <div class="box friendsearch">
    <h2 class="title">Friends</h2>

    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': activeTab === 'friends' }">
          <a @click="switchTab('friends')">Friends</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'requests' }">
          <a @click="switchTab('requests')">Friend Requests</a>
        </li>
      </ul>
    </div>

    <div v-if="activeTab === 'friends'">
      <input type="text" v-model="searchQuery" placeholder="Search for friends" class="input" />
      <button class="button is-primary" :disabled="isSearching" @click="searchFriends">
        Search
      </button>

      <ul v-if="searchResults.length">
        <li v-for="friend in searchResults" :key="friend.username">
          {{ friend.username }}
          <button class="button is-small" @click="handleAddFriend(friend.username)">
            Add Friend
          </button>
        </li>
      </ul>
    </div>

    <div v-else-if="activeTab === 'requests'">
      <h3>Friend Requests</h3>
      <ul v-if="friendRequests.length">
        <li v-for="request in friendRequests" :key="request.friend_username">
          {{ request.friend_username }}
          <button
            class="button is-small is-success"
            @click="handleAcceptFriendRequest(request.friend_username)"
          >
            Accept
          </button>
          <button
            class="button is-small is-danger"
            @click="handleRejectFriendRequest(request.friend_username)"
          >
            Reject
          </button>
        </li>
      </ul>
      <p v-else>No friend requests found.</p>
    </div>
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
.tabs {
  margin-bottom: 20px;
}
.is-active a {
  font-weight: bold;
  color: lightpink;
}
</style>
