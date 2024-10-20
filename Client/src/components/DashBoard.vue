<script setup lang="ts"></script>

<template>
  <div class="container is-fullheight">
    <div class="columns is-fullheight">
      <div class="column is-three-quarters">
        <div class="box profilebox">
          <h2 class="title">User Profile</h2>
          <p>Name: Edwin Morales</p>
          <p>Email: Morales@gmail.com</p>
        </div>
        <div class="box logbox">
          <h2 class="title">Exercise Logs</h2>
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
.column .logbox {
  margin-left: -50px;
  height: 50vh;
  margin-top: 30px;
}
.friendscolumn {
  height: 84vh;
}
</style>
