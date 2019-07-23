import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import routes from "./baseRoutes"
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
