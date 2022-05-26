<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete Blog</h5>
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
      <div class="mb-3">Bạn có chắc muốn xóa Blog này ?</div></template
    >
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleDeleteBlog">
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
  name: "DeleteBlog",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      blogDelete: {
        id: this.blog.id,
        title: this.blog.title,
      },
      showModal: false,
    };
  },
  props: ["blog"],
  methods: {
    ...mapActions(["deleteBlogAction"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteBlog() {
      this.deleteBlogAction(this.blogDelete);
    },
  },
};
</script>

<style scoped>
.modal-wrap {
  position: absolute;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
