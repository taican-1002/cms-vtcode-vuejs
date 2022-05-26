<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Delete Partner</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>

    <template v-slot:body>
      <div class="mb-3">Bạn có chắc muốn xóa partner này ?</div></template
    >
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="handleDeletePartner"
      >
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
  name: "DeletePartner",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      partnerDelete: {
        id: this.partner.id,
        name: this.partner.name,
        logo: this.partner.logo,
      },
      showModal: false,
    };
  },
  props: ["partner"],
  methods: {
    ...mapActions(["deletePartner"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeletePartner() {
      this.deletePartner(this.partnerDelete);
    },
  },
};
</script>

<style scoped></style>
