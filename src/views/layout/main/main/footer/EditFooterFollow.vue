<template>
  <ButtonEdit @click="showModal = true" />
  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Edit Footer Follow</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseEdit"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body
      ><div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          v-model="editItemFollow.id"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Format <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select form-select__format"
          v-model="this.editItemFollowFormat"
        >
          <option selected value="" disabled>Choose format</option>
          <option value="fab">fab</option>
          <option value="fas">fas</option>
          <option value="far">far</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Icon <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control form-control__icon"
          required
          v-model="this.editItemFollowIcon"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="editItemFollow.name"
        />
      </div>
    </template>
    <template v-slot:footer
      ><button type="button" class="btn btn-secondary" @click="handleCloseEdit">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onSubmit">
        SAVE CHANGE
      </button>
    </template>
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonEdit from "@//views/components/common/ButtonAction/ButtonEdit.vue";

import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "EditFooterFollow",
  components: { ButtonEdit, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      options: ["bone", "book-open", "certificate", "phone"],
      editItemFollow: {
        id: this.footerFollow.id,
        name: this.footerFollow.name,
        icon: this.footerFollow.icon,
      },
      editItemFollowFormat: this.footerFollow.icon[0],
      editItemFollowIcon: this.footerFollow.icon[1],
      showModal: false,
    };
  },
  props: ["footerFollow"],
  methods: {
    ...mapActions(["editFooterFollow"]),
    /**Modal */
    onSubmit() {
      if (this.editItemFollow.name != "" && this.editItemFollow.name.trim()) {
        this.editItemFollow.icon[0] = this.editItemFollowFormat;
        this.editItemFollow.icon[1] = this.editItemFollowIcon;
        this.editFooterFollow(this.editItemFollow);
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    handleCloseEdit() {
      this.showModal = false;
      this.editItemFollow.name = this.footerFollow.name;
      this.editItemFollowFormat = this.footerFollow.icon[0];
      this.editItemFollowIcon = this.footerFollow.icon[1];
    },
  },
};
</script>

<style scoped>
.text-left {
  text-align: left;
}
.float-left {
  float: left;
}
.mr-2 {
  margin-right: 1rem;
}
.form-label {
  float: left;
}
.edit-footer__des {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.description-icon {
  display: flex;
}
.description-content {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
