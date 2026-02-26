import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../components/DashboardView.vue'
import AlertsView from '../components/AlertsView.vue'
import MapView from '../components/MapView.vue'
import ReportView from '../components/ReportView.vue'
import MessagesView from '../components/MessagesView.vue'
import BroadcastView from '../components/BroadcastView.vue'
import PerformanceView from '../components/PerformanceView.vue'
import AnalyticsView from '../components/AnalyticsView.vue'
import SettingsView from '../components/SettingsView.vue'

const routes = [
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/alerts', name: 'alerts', component: AlertsView },
  { path: '/map', name: 'map', component: MapView },
  { path: '/report', name: 'report', component: ReportView },
  { path: '/messages', name: 'messages', component: MessagesView },
  { path: '/broadcast', name: 'broadcast', component: BroadcastView },
  { path: '/performance', name: 'performance', component: PerformanceView },
  { path: '/analytics', name: 'analytics', component: AnalyticsView },
  { path: '/settings', name: 'settings', component: SettingsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
