<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Banner" :to="{ name: 'Banner' }">
          <template #icon>
            <icon-banner />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="User" :to="{ name: 'User' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse navText="Header" :to="{ name: 'Header' }">
          <template #icon>
            <icon-header />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse navText="Footer" :to="{ name: 'Footer' }">
          <template #icon>
            <icon-footer />
          </template>
        </sidenav-collapse>
      </li>

      <!-- <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          PAGES
        </h6>
      </li>

      <li class="nav-item">
        <sidenav-collapse navText="Sign In" :to="{ name: 'Sign In' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          navText="Change PassWord"
          :to="{ name: 'Change PassWord' }"
        >
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
// import Document from "../../components/Icon/Document.vue";
// import Spaceship from "../../components/Icon/Spaceship.vue";
import IconBanner from "../../components/Icon/IconBanner.vue";
import IconFooter from "../../components/Icon/IconFooter.vue";
import IconHeader from "../../components/Icon/IconHeader.vue";

export default {
  name: "SidenavList",

  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    IconHeader,
    IconBanner,
    IconFooter,
    Shop,
    Office,
    // Document,
    // Spaceship,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
