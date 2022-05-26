<template>
  <ButtonEdit @click="handleEdit" />

  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Edit Header</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseEdit"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3 text-left">
        <label class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          v-model="headerEdit.id"
          disabled
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          v-model="headerEdit.name"
          required
        /></div
    ></template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" @click="handleCloseEdit">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleSaveEdit">
        SAVE CHANGE
      </button></template
    >
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonEdit from "@//views/components/common/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "edit-header",
  components: { ButtonEdit, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      headerEdit: {
        id: this.header.id,
        name: this.header.name,
      },
      showModal: false,
    };
  },
  props: ["header"],

  methods: {
    ...mapActions(["editHeader"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.headerEdit.name = this.header.name;
    },
    handleSaveEdit() {
      if (this.headerEdit.name != "" && this.headerEdit.name.trim()) {
        this.editHeader(this.headerEdit);
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
  },
};
</script>

<style scoped>
.text-left {
  text-align: left !important;
}
.mr-2 {
  margin-right: 1rem;
}
</style>
