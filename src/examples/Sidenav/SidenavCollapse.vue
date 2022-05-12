<template>
  <router-link
    class="nav-link"
    :to="to"
    v-bind="$attrs"
    @click="navbarMinimize"
  >
    <div
      class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
      :class="this.$store.state.isRTL ? ' ms-2' : 'me-2'"
    >
      <slot name="icon"></slot>
    </div>
    <span
      class="nav-link-text"
      :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
      >{{ navText }}</span
    >
  </router-link>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "sidenav-collapse",
  methods: {
    ...mapMutations(["navbarMinimize"]),
  },
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    navText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
};
</script>
