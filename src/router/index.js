import { createRouter, createWebHistory } from "vue-router";
import Banner from "@/views/Banner.vue";
import Dashboard from "@/views/Dashboard.vue";
import User from "@/views/User.vue";
import Footer from "@/views/Footer.vue";
import Header from "@/views/Header.vue";
import SignIn from "@/views/SignIn.vue";
import ChangePassWord from "@/views/ChangePassWord.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/sign-in",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/banner",
    name: "Banner",
    component: Banner,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },

  {
    path: "/footer",
    name: "Footer",
    component: Footer,
  },

  {
    path: "/header",
    name: "Header",
    component: Header,
  },

  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/change-password",
    name: "Change PassWord",
    component: ChangePassWord,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
