<template>
  <ButtonDelete />
</template>

<script>
import ButtonDelete from "@/examples/ButtonAction/ButtonDelete";
export default {
  name: "edit-blog",
  components: { ButtonDelete },
};
</script>

<style scoped>
.del-blog__btn {
  margin-bottom: 0 !important;
}
</style>
