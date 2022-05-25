<template>
  <ButtonEdit @click="showModal = true" />

  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Footer Follow</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="handleCloseEdit"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body modal-main__body">
              <div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >ID</label
                  >
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
                    <option selected value="">Choose format</option>
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
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="handleCloseEdit"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="onSubmit">
                SAVE CHANGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ButtonEdit from "@/examples/ButtonAction/ButtonEdit.vue";

import { useToast } from "vue-toastification";

export default {
  name: "EditFooterFollow",
  components: { ButtonEdit },
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
.modal-wrap,
.modal-content {
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
  /* vertical-align: middle; */
}
/* Important part */
.modal-dialog {
  overflow-y: initial !important;
  margin: 0.75rem auto !important;
}
.modal-main__body {
  /* height: 80vh; */
  overflow-y: auto;
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
