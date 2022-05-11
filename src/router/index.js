import { createRouter, createWebHistory } from "vue-router";
import Banner from "@/views/Banner.vue";
import Dashboard from "@/views/Dashboard.vue";
import User from "@/views/User.vue";
import Footer from "@/views/Footer.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
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
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
