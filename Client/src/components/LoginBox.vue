<script setup lang="ts"></script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login</h1>
      <form>
        <div class="textbox">
          <input type="text" placeholder="Username" name="username" />
        </div>
        <div class="textbox">
          <input type="password" placeholder="Password" name="password" />
        </div>
        <button class="btn" type="submit">Login</button>
      </form>
      <div class="signup-link">
        <RouterLink to="/registerpage" class="is-link"> Sign up here! </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background-color: #f7f7f7;
  padding: 70px;
  border-radius: 10px;
  text-align: center;
}

.textbox {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border-color: white;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: lightpink;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background-color: pink;
}

.signup-link {
  margin-top: 15px;
}

.is-link {
  color: #00d1b2;
  text-decoration: underline;
  cursor: pointer;
}
</style>
