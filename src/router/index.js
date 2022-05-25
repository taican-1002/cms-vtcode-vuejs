import { createRouter, createWebHistory } from "vue-router";
import Banner from "@/views/components/pages/Banner.vue";
import Dashboard from "@/views/components/pages/Dashboard.vue";
import User from "@/views/components/pages/User.vue";
import Footer from "@/views/components/pages/Footer.vue";
import Header from "@/views/components/pages/Header.vue";
import SignIn from "@/views/components/pages/SignIn.vue";
import ChangePassWord from "@/views/components/pages/ChangePassWord.vue";

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
