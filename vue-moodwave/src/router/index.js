import { createRouter, createWebHistory } from 'vue-router'
import MoodTrackerView from '../views/MoodTrackerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'moodtracker',
      component: MoodTrackerView
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/StatisticsView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue')
    }
  ]
})

export default router

