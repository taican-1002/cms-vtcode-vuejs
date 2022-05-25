<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div> -->
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h1 class="font-weight-bolder text-success text-gradient">
                    Login
                  </h1>
                  <!-- <p class="mb-0">Enter your email and password to sign in</p> -->
                </div>
                <div class="card-body">
                  <div class="text-start">
                    <label>Email</label>
                    <vsud-input
                      id="email"
                      type="text"
                      placeholder="Email"
                      name="email"
                    />
                    <label>Password</label>
                    <vsud-input
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        @click="handleLogin()"
                        >Sign in
                      </vsud-button>
                    </div>
                  </div>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Change password ?
                    <router-link
                      :to="{ name: 'Change PassWord' }"
                      class="text-success text-gradient font-weight-bold"
                      >Change password</router-link
                    >
                  </p>
                </div> -->
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "SignIn",
  computed: mapGetters(["users"]),
  data() {
    return {
      userLogin: {
        email: "",
        password: "",
        role: {},
      },
    };
  },
  components: {
    // Navbar,
    VsudInput,
    VsudButton,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    handleLogin() {
      // const userLocal = JSON.parse(localStorage.getItem("user"));
      const email = document.querySelector("#email");
      const emailValue = email.value.toLowerCase();
      const password = document.querySelector("#password");

      this.users.forEach((item) => {
        if (item.role.name == "admin") {
          this.userLogin.email = item.email;
          this.userLogin.password = item.password;
          this.userLogin.role = item.role;
        }
      });
      if (
        emailValue == this.userLogin.email &&
        password.value == this.userLogin.password
      ) {
        this.userLogin.email = emailValue;
        this.userLogin.password = password.value;
        localStorage.setItem("userLogin", JSON.stringify(this.userLogin));
        this.users.forEach((item) => {
          if (
            item.email == this.userLogin.email &&
            item.role.name == this.userLogin.role.name
          ) {
            item.password = this.userLogin.password;
          }
        });
        this.$router.push({ name: "Dashboard" });
        this.toast.success("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(this.users));
      } else {
        console.log(this.userLogin.email);
        console.log(this.userLogin.password);
        console.log(email.value);
        console.log(password.value);
        console.log(emailValue);

        this.toast.error("Sai tài khoản hoặc mật khẩu");
      }
    },
  },
};
</script>
