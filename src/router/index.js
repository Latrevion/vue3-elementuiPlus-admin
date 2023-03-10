import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    redirect:'Login'
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import("../views/account/Login.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
