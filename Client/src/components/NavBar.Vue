<script setup lang="ts"></script>

<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-logo">
        <RouterLink to="/homepage" class="navbar-item">
          <img src="@/assets/logo.png" alt="Logo" width="100" height="28" class="large-logo" />
        </RouterLink>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <RouterLink to="/homepage" class="navbar-item"> Home </RouterLink>
          <RouterLink to="/profileview" class="navbar-item"> Profile </RouterLink>
          <RouterLink to="/logpage" class="navbar-item"> Exercise Log </RouterLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light is-small custom-button">
                <RouterLink to="/registerpage" class="navbar-item"> Sign Up </RouterLink>
              </a>
              <a class="button is-light custom-button">
                <RouterLink to="/registerpage" class="navbar-item"> Login </RouterLink>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #cbc3e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.navbar-item {
  font-weight: bold;
  padding: 5px 20px;
  color: black;
  font-size: 1.2rem;
}

.navbar-item:hover {
  background-color: #e0e0e0;
}

.navbar-menu {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .navbar-menu {
    flex-direction: column;
    align-items: flex-start;
  }
}

.custom-button {
  background-color: pink;
  color: transparent;
  border: none;
  padding: 0px 0px;
  font-size: 1rem;
  border-radius: 1px;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: white;
}

.navbar-logo {
}
</style>
