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
import Banner from "./components/banner/Banner";

export default {
  name: "banner",
  components: {
    Banner,
  },
};
</script>
