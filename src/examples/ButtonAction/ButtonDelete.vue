<template>
  <button type="button" class="btn btn-danger del-btn">
    <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
    Delete
  </button>
</template>

<script>
export default {
  name: "button-delete",
};
</script>

<style scoped>
.del-btn {
  margin-bottom: 0 !important;
}
</style>
