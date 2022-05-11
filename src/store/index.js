import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import userModule from "./modules/UserModule";
import categoryModule from "./modules/CategoryModule";
import blogModule from "./modules/BlogModule";
import staffModule from "./modules/StaffModule";
import partnerModule from "./modules/PartnerModule";
import footerModule from "./modules/FooterModule";

export default createStore({
  modules: {
    userModule,
    categoryModule,
    blogModule,
    staffModule,
    partnerModule,
    footerModule,
  },
  state: {
    category: [
      {
        id: 1,
        name: "Sản phẩm",
        seo: "san-pham",
      },
      {
        id: 2,
        name: "Dịch vụ",
        seo: "dich-vu",
      },
    ],
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    color: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
  },
  getters: {},
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize() {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const overlay_show = document.querySelector(".nav-item__overlay");
      overlay_show.classList.toggle("active");
      // sidenav_show.classList.remove("g-sidenav-hidden");
      sidenav_show.classList.toggle("g-sidenav-pinned");
      // if (sidenav_show.classList.contains("g-sidenav-hidden")) {
      //   overlay_show.classList.add("active");
      //   sidenav_show.classList.remove("g-sidenav-hidden");
      //   sidenav_show.classList.add("g-sidenav-pinned");
      //   state.isPinned = true;
      // } else {
      //   overlay_show.classList.remove("active");
      //   sidenav_show.classList.add("g-sidenav-hidden");
      //   sidenav_show.classList.remove("g-sidenav-pinned");
      //   state.isPinned = false;
      // }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    cardBackground(state, payload) {
      state.color = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
  },
});
