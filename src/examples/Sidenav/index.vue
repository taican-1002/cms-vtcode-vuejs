<template>
  <aside
    class="overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl sidebar-main"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand" href="/">
        <img :src="logo" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold">CMS-VTCODE</span>
      </a>
    </div>
    <div class="sidenav-icon"><Close @click="toggleSidebar" /></div>

    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="customClass" />
  </aside>
</template>
<script>
import Close from "../../components/Icon/Close.vue";
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.png";
import { mapState, mapMutations } from "vuex";
export default {
  name: "index",
  components: {
    SidenavList,
    Close,
  },
  data() {
    return {
      logo,
    };
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["isRTL"]),
  },
  methods: {
    ...mapMutations(["navbarMinimize"]),

    toggleSidebar() {
      this.navbarMinimize();
    },
  },
};
</script>

<style scoped>
.sidenav-icon {
  display: none;
}
.sidebar-main {
  z-index: 100;
}
@media only screen and (max-width: 600px) {
  .sidenav-header {
    display: none;
  }
  .sidenav-icon {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
