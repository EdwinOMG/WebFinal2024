import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// auth "guard", checks if user is authenticated when they try to go to any page, if they arent it pushes to login page.
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // checks local storage where jwt is stored

  const publicPages = ['/loginpage', '/registerpage'] //pages unauth users can go to
  const isPublicPage = publicPages.includes(to.path)

  if (!isAuthenticated && !isPublicPage) {
    alert('You must be logged in to access this page')
    next('/loginpage')
  } else {
    next()
  }
})
export default router
