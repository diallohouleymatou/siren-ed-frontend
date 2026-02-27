import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../components/LandingView.vue'
import DashboardView from '../components/DashboardView.vue'
import AlertsView from '../components/AlertsView.vue'
import MapView from '../components/MapView.vue'
import ReportView from '../components/ReportView.vue'
import MessagesView from '../components/MessagesView.vue'
import BroadcastView from '../components/BroadcastView.vue'
import PerformanceView from '../components/PerformanceView.vue'
import AnalyticsView from '../components/AnalyticsView.vue'
import SettingsView from '../components/SettingsView.vue'
import PublicReportView from '../components/PublicReportView.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingView, meta: { landing: true } },
  { path: '/app', redirect: '/app/dashboard' },
  { path: '/app/dashboard', name: 'dashboard', component: DashboardView, meta: { internal: true } },
  { path: '/app/alerts', name: 'alerts', component: AlertsView, meta: { internal: true } },
  { path: '/app/map', name: 'map', component: MapView, meta: { internal: true } },
  { path: '/app/report', name: 'report', component: ReportView, meta: { internal: true } },
  { path: '/app/messages', name: 'messages', component: MessagesView, meta: { internal: true } },
  { path: '/app/broadcast', name: 'broadcast', component: BroadcastView, meta: { internal: true } },
  { path: '/app/performance', name: 'performance', component: PerformanceView, meta: { internal: true } },
  { path: '/app/analytics', name: 'analytics', component: AnalyticsView, meta: { internal: true } },
  { path: '/app/settings', name: 'settings', component: SettingsView, meta: { internal: true } },
  { path: '/signaler', name: 'public-report', component: PublicReportView, meta: { public: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
