<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete Logo</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body
      ><div class="mb-3">Bạn có chắc muốn xóa logo này ?</div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleDeleteLogo">
        DELETE
      </button></template
    >
  </modalSmall>
</template>

<script>
import { mapActions } from "vuex";
import ButtonDelete from "@//views/components/common/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
export default {
  name: "DeleteLogo",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      logoDelete: {
        id: this.logo.id,
        name: this.logo.name,
        img: this.logo.img,
      },
      showModal: false,
    };
  },
  props: ["logo"],
  methods: {
    ...mapActions(["deleteLogo"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteLogo(e) {
      e.preventDefault();
      this.deleteLogo(this.logoDelete);
    },
  },
};
</script>

<style scoped></style>
