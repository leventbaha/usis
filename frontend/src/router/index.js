import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '../views/student-list.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StudentList',
      component: StudentList,
    },
    {
      path: '/student/:id',
      name: 'StudentDetail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/student-detail.vue'),
    },
  ],
})

export default router
