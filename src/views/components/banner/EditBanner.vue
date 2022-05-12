<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Banner</h5>
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
                  v-model="bannerEdit.id"
                  disabled
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label">Image</label>
                <div class="mb-3 text-left">
                  <div
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Image Preview
                  </div>
                  <img :src="previewImage" class="edit-banner_img" />
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
                <label class="form-label">Slogan</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="bannerEdit.slogan"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label">Description</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="bannerEdit.description"
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
      bannerEdit: {
        id: this.banner.id,
        slogan: this.banner.slogan,
        description: this.banner.description,
        image: this.banner.image,
      },
      showModal: false,
      previewImage: this.banner.image,
    };
  },
  props: ["banner"],
  methods: {
    ...mapActions(["editBanner"]),
    handleEdit() {
      this.showModal = true;
    },
    handleSaveEdit(e) {
      e.preventDefault();

      this.blogEdit.image = this.previewImage;
      this.editBlogAction(this.blogEdit);
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
.modal {
  display: block !important; /* I added this to see the modal, you don't need this */
}

/* Important part */
.modal-dialog {
  overflow-y: initial !important;
  margin: 0.75rem auto;
}
.modal-body {
  height: 80vh;
  overflow-y: auto;
}

.modal-wrapper {
  display: table-cell;
  /* vertical-align: middle; */
}

.edit-banner_img {
  width: 30rem;
  height: 20rem;
  object-fit: contain;
  display: flex;
  margin: auto;
}
@media only screen and (max-width: 600px) {
  .edit-banner_img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
