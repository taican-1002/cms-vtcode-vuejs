<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete Category</h5>
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
      <div class="mb-3">Bạn có chắc muốn xóa Category này ?</div></template
    >
    <template v-slot:footer
      ><button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="handleDeleteCategory"
      >
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
  name: "DeleteCategory",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      categoryDelete: {
        id: this.category.id,
        name: this.category.name,
        seo: this.category.seo,
      },
      showModal: false,
    };
  },
  props: ["category"],
  methods: {
    ...mapActions(["deleteCategory"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteCategory() {
      this.deleteCategory(this.categoryDelete);
    },
  },
};
</script>

<style scoped></style>
