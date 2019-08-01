import Vue from 'vue'
// import Router from 'vue-router'
import Router from "@/han_router/router"
import Home from './views/Home.vue'
import Article from "@/views/article"
import ArticleList from "@/views/article/ArticleList"
import User from "@/views/user"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/article",
      name: "article",
      component: Article,
      children: [
        {
          path: "/article/articleList",
          name: "articleList",
          component: ArticleList
        }
      ]
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
