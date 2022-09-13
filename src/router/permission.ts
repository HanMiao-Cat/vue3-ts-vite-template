import type { Router } from "vue-router"
const permission = (router: Router) => {
  router.beforeEach((to, from, next) => {
    console.log(to)
    next()
  })
}

export default permission