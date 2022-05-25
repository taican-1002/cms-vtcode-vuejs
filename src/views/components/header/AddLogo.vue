<template>
  <ButtonAdd @click="handleAddModalLogo" />
  <!-- Modal Header -->
  <div v-if="showModalAddLogo" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Logo</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="handleCloseModalLogo"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Logo </label>
                <div class="mb-3">
                  <div
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Logo Preview
                  </div>
                  <img :src="previewImage" class="add-logo__img" />
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
                <label class="form-label"
                  >Name <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="logo.name"
                />
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="showModalAddLogo = false"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="onAddModalLogo"
                >
                  ADD
                </button>
              </div>
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
import noImage from "../../../assets/img/no-image.png";
import { useToast } from "vue-toastification";

export default {
  name: "AddHeader",
  components: { ButtonAdd },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      logo: {
        name: "",
        img: "",
      },
      showModalAddLogo: false,
      previewImage: noImage,
    };
  },
  methods: {
    ...mapActions(["addLogo"]),

    /**Header Logo */
    onAddModalLogo() {
      if (this.logo.name != "" && this.logo.name.trim()) {
        this.addLogo({
          id: this.logo.id,
          name: this.logo.name,
          img: this.previewImage,
        });
        this.showModalAddLogo = false;
        const inputFile = document.querySelector("#file-input");
        inputFile.value = "";
        this.previewImage = noImage;
        this.logo.name = "";
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    handleAddModalLogo() {
      this.showModalAddLogo = true;
    },
    handleCloseModalLogo() {
      this.showModalAddLogo = false;
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
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  /* height: 80vh; */
  overflow-y: auto;
}
.add-logo__img {
  width: 10rem;
  height: 10rem;
  /* border-radius: 100%; */
  display: flex;
  margin: auto;
}
@media only screen and (max-width: 600px) {
  .add-logo__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
