import { createRouter, createWebHistory } from 'vue-router';
import Status from '@/views/Status';
import Lessons from '@/views/Lessons';
import Logs from '@/views/Logs';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/status' },
    { path: '/status', component: Status, name: 'status' },
    { path: '/lessons', component: Lessons, name: 'lessons' },
    { path: '/logs', component: Logs, name: 'logs' },
  ],
});
