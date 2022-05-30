<template>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <!-- overlay -->
    <div className="nav-item__overlay" @click="toggleSidebar"></div>
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :textWhite="textWhite" />
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <!-- <div class="input-group">
            <span class="input-group-text text-body"
              ><i class="fas fa-search" aria-hidden="true"></i
            ></span>
            <input
              type="text"
              class="form-control"
              :placeholder="
                this.$store.state.isRTL ? 'أكتب هنا...' : 'Type here...'
              "
            />
          </div> -->
        </div>
        <ul class="navbar-nav justify-content-end">
          <li
            class="nav-item dropdown d-flex align-items-center nav-item__noti"
            :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'"
          >
            <a
              href="#"
              class="p-0 nav-link"
              :class="[
                textWhite ? textWhite : 'text-body',
                showMenu ? 'show' : '',
              ]"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <img
                src="../../../../assets/img/no-avatar.png"
                alt=""
                class="nav-user__img"
              />
            </a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2 navbar-item">
                <span class="dropdown-item border-radius-md">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      {{ user.username }}
                    </div>
                  </div>
                </span>
              </li>
              <li class="mb-2 navbar-item">
                <router-link
                  :to="{ name: 'Change PassWord' }"
                  class="dropdown-item border-radius-md"
                >
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      Change Password
                    </div>
                  </div>
                </router-link>
              </li>
              <li class="mb-2 navbar-item">
                <router-link
                  :to="{ name: 'Sign In' }"
                  class="dropdown-item border-radius-md"
                >
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      Logout
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- Menu Toggle Navbar -->
          <li class="nav-item ps-3 align-items-center menu-item">
            <a
              href="#"
              @click="toggleSidebar"
              class="p-0 nav-link text-body"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          &nbsp; &ensp;
          <!-- <li
            class="px-3 nav-item d-flex align-items-center nav-item__cofigurator"
          >
            <a
              class="p-0 nav-link"
              @click="toggleConfigurator"
              :class="textWhite ? textWhite : 'text-body'"
            >
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      user: {
        username: "",
        password: "",
        role: {},
      },
    };
  },
  props: ["minNav", "textWhite"],
  mounted() {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    this.user.username = userLogin.username;
    this.user.password = userLogin.password;
    this.user.role = userLogin.role;
  },
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  // updated() {
  //   const navbar = document.getElementById("navbarBlur");
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 10 && this.$store.state.isNavFixed) {
  //       navbar.classList.add("blur");
  //       navbar.classList.add("position-sticky");
  //       navbar.classList.add("shadow-blur");
  //     } else {
  //       navbar.classList.remove("blur");
  //       navbar.classList.remove("position-sticky");
  //       navbar.classList.remove("shadow-blur");
  //     }
  //   });
  // },
};
</script>
<style scoped>
.nav-item__overlay {
  display: none;
}

.nav-item__overlay::after {
  content: "";
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
.nav-user__img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  cursor: pointer;
}
.navbar-item {
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
}
.menu-item {
  display: none;
}
@media only screen and (max-width: 1199px) {
  .menu-item {
    display: flex;
  }
  .nav-item__overlay.active {
    display: block;
  }
}
@media only screen and (max-width: 600px) {
  .nav-item__cofigurator {
    display: none !important;
  }
  .nav-item__noti {
    padding-left: 1rem !important;
  }
}
</style>
