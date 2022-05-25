<template>
  <!-- <navbar btn-background="bg-gradient-primary" /> -->
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved6.jpg') + ')',
    }"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-12">
          <h1 class="mt-5 mb-2 text-white">Change Password!</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="card-body">
            <div class="mb-3">
              <vsud-input
                id="old-password"
                type="text"
                placeholder="Old Password"
                aria-label="Password"
              />
            </div>
            <div class="mb-3">
              <vsud-input
                id="new-password"
                type="password"
                placeholder="New Password"
                aria-label="Password"
              />
            </div>
            <div class="mb-3">
              <vsud-input
                id="re-enter__password"
                type="password"
                placeholder="Re-Enter Password"
                aria-label="Re-Enter Password"
              />
            </div>

            <div class="text-center">
              <vsud-button
                color="dark"
                full-width
                variant="gradient"
                class="my-4 mb-2"
                @click="handleChangePassWord"
                >Change Password</vsud-button
              >
            </div>
            <p class="text-sm mt-3 mb-0">
              Back to Sign in ?
              <router-link
                :to="{ name: 'Sign In' }"
                class="text-dark font-weight-bolder"
              >
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
import VsudInput from "@/components/VsudInput.vue";
// import VsudCheckbox from "@/components/VsudCheckbox.vue";
import VsudButton from "@/components/VsudButton.vue";
import { useToast } from "vue-toastification";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "SignupBasic",
  data() {
    return {
      userChange: {
        email: "",
        password: "",
        role: {},
      },
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: {
    // Navbar,
    VsudInput,
    // VsudCheckbox,
    VsudButton,
  },
  computed: mapGetters(["users"]),

  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions(["editUserAction"]),
    handleChangePassWord() {
      const oldPass = document.querySelector("#old-password");
      const newPass = document.querySelector("#new-password");
      const rePass = document.querySelector("#re-enter__password");
      const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      const userLogged = JSON.parse(localStorage.getItem("userLogin"));
      // const userLocal = JSON.parse(localStorage.getItem("user"));
      this.userChange = userLogged;
      if (
        oldPass.value != "" &&
        oldPass.value.trim() &&
        newPass.value != "" &&
        newPass.value.trim() &&
        rePass.value != "" &&
        rePass.value.trim()
      ) {
        if (
          oldPass.value == this.userChange.password &&
          regexPass.test(oldPass.value)
        ) {
          if (regexPass.test(newPass.value)) {
            if (rePass.value == newPass.value) {
              this.userChange.password = newPass.value;
              this.users.forEach((item) => {
                if (item.email == userLogged.email) {
                  item.password = this.userChange.password;
                  this.editUserAction(this.userChange);
                  localStorage.setItem(
                    "userLogin",
                    JSON.stringify(this.userChange)
                  );
                  this.toast.success("Đổi mật khẩu thành công!");
                  this.$router.push({ name: "Sign In" });
                }
              });
            } else {
              this.toast.warning(
                "Re-enter password không khớp với New Password"
              );
            }
          } else {
            this.toast.warning("New Password invalid");
          }
        } else {
          this.toast.warning("Old Password invalid");
        }
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
  },
};
</script>
