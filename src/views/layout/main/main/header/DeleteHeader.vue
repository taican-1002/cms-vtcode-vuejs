<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Delete Header</h5>
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
      <div class="mb-3">Bạn có chắc muốn xóa item này ?</div></template
    >
    <template v-slot:footer
      ><button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleDeleteHeader">
        DELETE
      </button>
    </template>
  </modalSmall>
</template>

<script>
import { mapActions } from "vuex";
import ButtonDelete from "@/examples/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
export default {
  name: "DeleteStaff",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      headerDelete: {
        id: this.header.id,
        name: this.header.name,
      },
      showModal: false,
    };
  },
  props: ["header"],
  methods: {
    ...mapActions(["deleteHeader"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteHeader(e) {
      e.preventDefault();
      this.deleteHeader(this.headerDelete);
    },
  },
};
</script>

<style scoped></style>
