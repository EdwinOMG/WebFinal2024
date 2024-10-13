<script setup lang="ts"></script>

<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <svg
            width="640"
            height="160"
            viewBox="0 0 640 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <RouterLink to="/home" class="navbar-item"> Home </RouterLink>
          <RouterLink to="/profile" class="navbar-item"> Profile </RouterLink>
          <RouterLink to="/logger" class="navbar-item"> Exercise Log </RouterLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
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
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-item {
  font-weight: bold;
  padding: 10px 20px;
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
</style>
