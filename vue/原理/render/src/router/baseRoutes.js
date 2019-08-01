const routes= [
    {
      path: '/',
      name: '/',
      meta:{title:"首页"},
      component: () => import('@/views/home.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta:{title:"首页"},
      component: () => import('@/views/home.vue')
    },
    {
      path: '/hJsx',
      name: 'hJsx',
      meta:{title:"Jsx"},
      component: () => import('@/views/hJsx')
    },
    {
      path: '/goods',
      name: 'goods',
      meta:{title:"render"},
      component: () => import('@/views/goods')
    },
    {
      path: '/article',
      name: 'article',
      meta:{title:"Jsx"},
      component: () => import('@/views/article')
    },
    {
      path: '/slot',
      name: 'slot',
      meta:{title:"插槽"},
      component: () => import('@/views/hslot')
    },
    {
      path: '/hkey',
      name: 'hkey',
      meta:{title:"为什么加key"},
      component: () => import('@/views/hkey')
    },
    {
      path: '/hkeepAlive',
      name: 'hkeepAlive',
      meta:{title:"keep-alive"},
      component: () => import('@/views/hkeepAlive')
    },
    {
      path:"/hMessage",
      name:"hMessage",
      meta:{title:"message组件"},
      component:()=>import("@/views/hMessage")
    }
  ]
  export default routes