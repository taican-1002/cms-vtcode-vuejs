<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Delete Footer</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body
      ><div class="mb-3">Bạn có chắc muốn xóa item này ?</div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" @click="handleDeleteFooter" class="btn btn-primary">
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
  name: "DeleteFooter",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      deleteItem: {
        id: this.footerItem.id,
        name: this.footerItem.name,
        description: this.footerItem.description,
      },
      showModal: false,
    };
  },
  props: ["footerItem"],
  methods: {
    ...mapActions(["deleteFooter"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteFooter() {
      this.deleteFooter(this.deleteItem);
    },
  },
};
</script>

<style scoped></style>
