<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Partner</h5>
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
                  v-model="partnerEdit.id"
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
                  v-model="partnerEdit.name"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label">Logo</label>
                <div class="mb-3 text-left">
                  <div
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Logo Preview
                  </div>
                  <img :src="previewImage" class="edit-partner__img" />
                </div>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="uploadImage"
                  id="file-input"
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
  name: "edit-partner",
  components: { ButtonEdit },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      partnerEdit: {
        id: this.partner.id,
        name: this.partner.name,
        logo: this.partner.logo,
      },
      showModal: false,
      previewImage: this.partner.logo,
    };
  },
  props: ["partner"],

  methods: {
    ...mapActions(["editPartner"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.partnerEdit.name = this.partner.name;
      this.previewImage = this.partner.logo;
    },
    handleSaveEdit() {
      if (this.partnerEdit.name != "" && this.partnerEdit.name.trim()) {
        this.partnerEdit.logo = this.previewImage;
        this.editPartner(this.partnerEdit);
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền tên!");
      }
    },
    /**Handle upload logo */
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
.edit-partner__img {
  width: 20rem;
  height: 5rem;
  /* border-radius: 100%; */
  display: flex;
  margin: auto;
  object-fit: contain;
}
@media only screen and (max-width: 600px) {
  .edit-partner__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
