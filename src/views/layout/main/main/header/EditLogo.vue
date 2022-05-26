<template>
  <ButtonEdit @click="handleEdit" />

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Logo</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseEdit"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3 text-left">
        <label class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          v-model="logoEdit.id"
          disabled
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
          <img :src="previewImage" class="edit-logo__img" />
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
          v-model="logoEdit.name"
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
  name: "edit-logo",
  components: { ButtonEdit, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      logoEdit: {
        id: this.logo.id,
        img: this.logo.img,
        name: this.logo.name,
      },
      showModal: false,
      previewImage: this.logo.img,
    };
  },
  props: ["logo"],

  methods: {
    ...mapActions(["editLogo"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.logoEdit.img = this.logo.img;
      this.previewImage = this.logo.img;
      this.logoEdit.name = this.logo.name;
    },
    handleSaveEdit() {
      if (this.logoEdit.name != "" && this.logoEdit.name.trim()) {
        this.logoEdit.img = this.previewImage;
        this.editLogo(this.logoEdit);
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

.edit-logo__img {
  width: 20rem;
  height: 20rem;
  /* border-radius: 100%; */
  object-fit: contain;
  display: flex;
  margin: auto;
}
@media only screen and (max-width: 600px) {
  .edit-logo__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
