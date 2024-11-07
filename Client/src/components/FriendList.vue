<script setup lang="ts">
import { ref } from 'vue'

interface Log {
  title: string
  duration: string
  exercise: string
}

interface Friend {
  username: string
  email: string
  logs: Log[]
}

const friends = ref<Friend[]>([
  {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    logs: [
      { title: 'Morning Run', exercise: 'Running', duration: '30' },
      { title: 'Yoga Session', exercise: 'Yoga', duration: '45' }
    ]
  },
  {
    username: 'JaneSmith',
    email: 'janesmith@example.com',
    logs: [
      { title: 'Cycling', exercise: 'Cycling', duration: '60' },
      { title: 'Strength Training', exercise: 'Weight Lifting', duration: '50' }
    ]
  }
])
const selectedFriend = ref<Friend | null>(null)

const viewFriendLogs = (friend: Friend) => {
  selectedFriend.value = friend
}
</script>

<template>
  <div class="box friendcolumn">
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
      <li v-for="log in selectedFriend?.logs" :key="log.title">
        {{ log.title }} - {{ log.exercise }} for {{ log.duration }} minutes
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  color: lightpink;
}
.box {
  padding: 10px;
  float: right;
  border: 1px solid lightpink;
  background-color: white;
  margin-top: 10px;
  color: black;
  width: 30%;
  margin-right: 40px;
}
.friendcolumn {
  margin-bottom: 2rem;
}

.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.friend-logs {
  margin-top: 1rem;
}

.log-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.button.is-small {
  background-color: #00d1b2;
  color: white;
}

.button.is-small:hover {
  background-color: #00b59e;
}
</style>
