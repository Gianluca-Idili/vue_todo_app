import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskPage from './views/TaskPage.vue';
import ArchivedPage from './views/ArchivedPage.vue';
import LoginPage from './views/LoginPage.vue';
import AlboPage from './views/AlboPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginPage },
  { path: '/archiviati', component: ArchivedPage },
  { path: '/task', component: TaskPage },
  { path: '/albo', component: AlboPage },
  
];

const router = new VueRouter({
  routes,
});

export default router;
