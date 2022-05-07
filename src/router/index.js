import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/Detail.vue'
import MyCarrotView from '../views/MyCarrotView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "auth" */ '../views/auth/LoginView.vue')
  },
  {
    path: '/login',
    name: 'loginview',
    component: () =>
      import(/* webpackChunkName: "auth" */ '../views/auth/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      page: 1
    }
  },
  {
    path: '/detail/:id',
    name: 'detail/id',
    component: DetailView,
    props: true
  },
  {
    path: '/life',
    name: 'life',
    component: () =>
      import(/* webpackChunkName: "life" */ '../views/LifeView.vue'),
    meta: {
      page: 3
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/ChatView.vue'),
    meta: {
      page: 4
    }
  },
  {
    path: '/my',
    name: 'mycarrot',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MyCarrotView,
    meta: {
      page: 5
    }
  },
  {
    path: '/createpost',
    name: 'createpost',
    component: () =>
      import(
        /* webpackChunkName: "createpost" */ '../views/CreatePostView.vue'
      ),
    meta: {
      page: 2
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 라우터변경되기 바로 직전에 실행되는 부분
router.beforeEach((to, from, next) => {
  // console.log('from:', from) // 어디에서 이동했는지
  // console.log('to:', to) // 어디로 이동하는지

  if (to.path === '/') {
    next()
  } else if (to.path === '/login') {
    next()
  } else if (to.path === '/my') {
    if (store.getters['user/isLogin']) {
      next()
    } else {
      store.commit('/user/logout')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
