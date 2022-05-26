<template>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[
      this.$store.state.isWhite,
      this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
    ]"
    v-if="this.$store.state.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar"
    />
    <router-view />
    <br />
    <!-- <app-footer v-show="this.$store.state.showFooter" /> -->
    <configurator
      class="configurator"
      :toggle="toggleConfigurator"
      :class="[
        this.$store.state.showConfig ? 'show' : '',
        this.$store.state.hideConfigButton ? 'd-none' : '',
      ]"
    />
  </main>
</template>
<script>
import Sidenav from "./views/layout/main/Sidenav";
import Configurator from "./views/components/pages/Configurator.vue";
import Navbar from "./views/layout/main/Navbars/Navbar.vue";
// import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    // AppFooter,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur left-auto top-1 z-index-sticky": this
          .$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-2": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isWhite = "bg-white";
  },
};
</script>

<style>
td,
th {
  padding: 5px;
}

th {
  cursor: pointer;
}
/* .g-sidenav-show:not(.rtl) .sidenav {
  transform: translateX(-15rem);
}
.g-sidenav-show.g-sidenav-pinned .sidenav {
  transform: translateX(0);
} */
/* .sidenav.fixed-start ~ .main-content {
  margin-left: 0 !important;
} */
button {
  border: none;
}
.ql-toolbar.ql-snow {
  display: flex;
  flex-wrap: wrap;
}
.ql-snow .ql-tooltip.ql-flip {
  transform: translate(50%, 20px) !important;
}
.dropdown .dropdown-menu.dropdown-menu-end:before {
  right: 40px !important;
}
/* @media only screen and (max-width: 1199.98px) {
  .g-sidenav-show:not(.rtl) .sidenav {
    transform: translateX(-15rem) !important;
  }
  .g-sidenav-show.g-sidenav-pinned .sidenav {
    transform: translateX(0) !important;
  }
} */
@media only screen and (max-width: 600px) {
  .configurator {
    display: none !important;
  }
}
</style>
