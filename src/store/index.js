import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import userModule from "./modules/UserModule";
import categoryModule from "./modules/CategoryModule";
import blogModule from "./modules/BlogModule";
import bannerModule from "./modules/BannerModule";
import staffModule from "./modules/StaffModule";
import contactModule from "./modules/ContactModule";
import partnerModule from "./modules/PartnerModule";
import headerModule from "./modules/HeaderModule";
import footerModule from "./modules/FooterModule";

export default createStore({
  modules: {
    userModule,
    bannerModule,
    categoryModule,
    blogModule,
    staffModule,
    contactModule,
    partnerModule,
    headerModule,
    footerModule,
  },
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isWhite: "",
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
      sidenav_show.classList.toggle("g-sidenav-pinned");
    },
    sidebarType(state, payload) {
      state.isWhite = payload;
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
