<template>
  <ButtonAdd @click="handleAddModalLogo" />

  <!-- Modal Header -->
  <modal v-if="showModalAddLogo">
    <template v-slot:header>
      <h5 class="modal-title">Add Logo</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseModalLogo"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
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
        <input type="text" class="form-control" required v-model="logo.name" />
      </div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModalAddLogo = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onAddModalLogo">
        ADD
      </button>
    </template>
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
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
.add-logo__img {
  width: 20rem;
  height: 20rem;
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
