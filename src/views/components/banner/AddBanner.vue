<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add User</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="handleChange"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Image</label>
                <div class="mb-3">
                  <div
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Image Preview
                  </div>
                  <img :src="previewImage" class="add-banner__img" />
                </div>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="uploadImage"
                  id="file-input"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Slogan</label>
                <input
                  type="text"
                  class="form-control form-email"
                  required
                  v-model="banner.slogan"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="banner.description"
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
              <button type="button" class="btn btn-primary" @click="onSubmit">
                ADD
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
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import noImage from "../../../assets/img/no-image.png";

export default {
  name: "AddBanner",
  components: { ButtonAdd },

  setup() {
    // Get toast interface
    const toast = useToast();

    // // Use it!
    // toast("I'm a toast!");

    // // or with options
    // toast.success("My toast content", {
    //   timeout: 2000,
    // });

    return { toast };
  },
  data() {
    return {
      banner: {
        slogan: "",
        description: "",
        image: "",
      },
      showModal: false,
      previewImage: noImage,
    };
  },
  methods: {
    ...mapActions(["addBanner"]),
    onSubmit(e) {
      e.preventDefault();

      if (
        this.banner.slogan != "" &&
        this.banner.slogan.trim() &&
        this.banner.description != "" &&
        this.banner.description.trim()
      ) {
        this.addBanner({
          id: this.banner.id,
          slogan: this.banner.slogan,
          description: this.banner.description,
          image: this.previewImage,
        });
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
      this.banner.slogan = "";
      this.banner.description = "";
      this.previewImage = noImage;
    },
    handleToggleModal() {
      this.showModal = true;
    },
    handleChange() {
      this.showModal = false;
    },
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
.add-banner__img {
  width: 20rem;
  height: 20rem;
  display: flex;
  margin: auto;
}
@media only screen and (max-width: 600px) {
  .add-banner__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
