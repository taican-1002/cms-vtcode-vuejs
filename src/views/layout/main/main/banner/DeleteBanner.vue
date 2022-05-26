<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete Banner</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">Bạn có chắc muốn xóa banner này ?</div></template
    >
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleDeleteUser">
        DELETE
      </button></template
    >
  </modalSmall>
</template>

<script>
import { mapActions } from "vuex";
import ButtonDelete from "@/views/components/common/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
export default {
  name: "DeleteUser",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      bannerDelete: {
        id: this.banner.id,
        slogan: this.banner.slogan,
        description: this.banner.description,
      },
      showModal: false,
    };
  },
  props: ["banner"],
  methods: {
    ...mapActions(["deleteBanner"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteUser(e) {
      e.preventDefault();
      this.deleteBanner(this.bannerDelete);
    },
  },
};
</script>

<style scoped></style>
