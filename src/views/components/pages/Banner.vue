<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <Banner />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../../layout/main/main/banner/Banner.vue";

export default {
  name: "banner",
  components: {
    Banner,
  },
};
</script>
