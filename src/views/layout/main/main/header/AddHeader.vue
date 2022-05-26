<template>
  <ButtonAdd @click="handleAddModalHeader" />

  <!-- Modal Header -->
  <modal v-if="showModalAddHeader">
    <template v-slot:header>
      <h5 class="modal-title">Add Item</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseModalHeader"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="header.name"
        /></div
    ></template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModalAddHeader = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onAddModalHeader">
        ADD
      </button></template
    >
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonAdd from "@/views/components/common/ButtonAction/ButtonAdd.vue";
import noImage from "../../../../../assets/img/no-image.png";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "AddHeader",
  components: { ButtonAdd, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      header: {
        name: "",
      },

      showModalAddHeader: false,
    };
  },
  methods: {
    ...mapActions(["addHeader"]),
    /**Header Item */
    onAddModalHeader(e) {
      e.preventDefault();
      if (this.header.name != "" && this.header.name.trim()) {
        this.addHeader({
          id: this.header.id,
          name: this.header.name,
        });
        this.showModalAddHeader = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }

      this.previewImage = noImage;
      this.header.name = "";
    },
    handleAddModalHeader() {
      this.showModalAddHeader = true;
    },
    handleCloseModalHeader() {
      this.showModalAddHeader = false;
    },
  },
};
</script>

<style scoped></style>
