<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Delete Contact</h5>
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
      <div class="mb-3">Bạn có chắc muốn xóa contact này ?</div></template
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
        @click="handleDeleteContact"
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
  name: "DeleteContact",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      contactDelete: {
        id: this.contact.id,
        name: this.contact.name,
        phone: this.contact.phone,
        email: this.contact.email,
        description: this.contact.description,
      },
      showModal: false,
    };
  },
  props: ["contact"],
  methods: {
    ...mapActions(["deleteContact"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteContact() {
      this.deleteContact(this.contactDelete);
    },
  },
};
</script>

<style scoped></style>
