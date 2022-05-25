<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Staff</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="handleCloseEdit"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3 text-left">
                <label class="form-label">ID</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staffEdit.id"
                  disabled
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label">Avatar</label>
                <div class="mb-3 text-left">
                  <div
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Avatar Preview
                  </div>
                  <img :src="previewImage" class="edit-staff__img" />
                </div>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="uploadImage"
                  id="file-input"
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label"
                  >Name <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="staffEdit.name"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label"
                  >Position <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="staffEdit.position"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label"
                  >Office <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="staffEdit.office"
                  required
                />
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
              <button
                type="button"
                class="btn btn-primary"
                @click="handleSaveEdit"
              >
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
  name: "edit-staff",
  components: { ButtonEdit },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      staffEdit: {
        id: this.staff.id,
        avatar: this.staff.avatar,
        name: this.staff.name,
        position: this.staff.position,
        office: this.staff.office,
      },
      showModal: false,
      previewImage: this.staff.avatar,
    };
  },
  props: ["staff"],

  methods: {
    ...mapActions(["editStaff"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.staffEdit.name = this.staff.name;
      this.staffEdit.position = this.staff.position;
      this.staffEdit.office = this.staff.office;
      this.previewImage = this.staff.avatar;
    },
    handleSaveEdit() {
      this.staffEdit.avatar = this.previewImage;
      if (
        this.staffEdit.name != "" &&
        this.staffEdit.name.trim() &&
        this.staffEdit.position != "" &&
        this.staffEdit.position.trim() &&
        this.staffEdit.office != "" &&
        this.staffEdit.office.trim()
      ) {
        this.editStaff(this.staffEdit);
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    /**Handle upload avatar */
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
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
/* Important part */
.modal-dialog {
  overflow-y: auto !important;
  margin: 0.75rem auto !important;
}
.modal-body {
  height: 80vh;
  overflow-y: auto;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.edit-staff__img {
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  display: flex;
  margin: auto;
  object-fit: contain;
}
@media only screen and (max-width: 600px) {
  .edit-staff__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
