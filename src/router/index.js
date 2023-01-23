import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    redirect:'Login'
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import("../views/account/Login.vue")
  },
  {
    path:'/home',
    name:'home',
    component:()=>import("../layout/Index.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
