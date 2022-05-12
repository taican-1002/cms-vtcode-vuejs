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
                @click="showModal = false"
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
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staffEdit.name"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label">Position</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staffEdit.position"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label">Office</label>
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
                @click="showModal = false"
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

export default {
  name: "edit-staff",
  components: { ButtonEdit },
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
    handleSaveEdit(e) {
      e.preventDefault();
      this.staffEdit.avatar = this.previewImage;
      this.editStaff(this.staffEdit);
      this.showModal = false;
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
}
@media only screen and (max-width: 600px) {
  .edit-staff__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
