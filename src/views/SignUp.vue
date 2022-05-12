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
          <div class="pt-4 text-center card-header">
            <h5>
              Fill out this form below if you want to change your password
            </h5>
          </div>

          <div class="card-body">
            <form role="form">
              <div class="mb-3">
                <vsud-input
                  id="old-password"
                  type="password"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
// import VsudCheckbox from "@/components/VsudCheckbox.vue";
import VsudButton from "@/components/VsudButton.vue";

import { mapMutations } from "vuex";

export default {
  name: "SignupBasic",
  components: {
    // Navbar,
    AppFooter,
    VsudInput,
    // VsudCheckbox,
    VsudButton,
  },
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
  },
};
</script>
