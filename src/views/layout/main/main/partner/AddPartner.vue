<template>
  <ButtonAdd @click="handleToggleModal" />
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Partner</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleChange"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="partner.name"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Logo</label>
        <div class="mb-3">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Logo Preview
          </div>
          <img :src="previewImage" class="add-partner__img" />
        </div>
        <input
          type="file"
          class="form-control"
          accept="image/*"
          @change="uploadImage"
          id="file-input"
        /></div
    ></template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onSubmit">
        ADD
      </button></template
    >
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import noImage from "../../../../../assets/img/no-image.png";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "AddPartner",
  components: { ButtonAdd, modal: Modal },
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
      partner: {
        name: "",
        logo: "",
      },
      showModal: false,
      previewImage: noImage,
    };
  },
  methods: {
    ...mapActions(["addPartner"]),
    onSubmit(e) {
      e.preventDefault();
      if (this.partner.name != "" && this.partner.name.trim()) {
        this.addPartner({
          id: this.partner.id,
          name: this.partner.name,
          logo: this.previewImage,
        });
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
      const inputFile = document.querySelector("#file-input");
      inputFile.value = "";

      this.partner.id = "";
      this.previewImage = noImage;
      this.partner.name = "";
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
    currentDateTime() {
      const current = new Date();
      const date =
        current.getDate() +
        "/" +
        (current.getMonth() + 1) +
        "/" +
        current.getFullYear();
      //   const time =
      //     current.getHours() +
      //     ":" +
      //     current.getMinutes() +
      //     ":" +
      //     current.getSeconds();
      //   const dateTime = date + " " + time;
      const dateTime = date;

      return dateTime;
    },
  },
};
</script>

<style scoped>
.add-partner__img {
  width: 20rem;
  height: 20rem;
  /* border-radius: 100%; */
  display: flex;
  margin: auto;
  object-fit: contain;
}
@media only screen and (max-width: 600px) {
  .add-partner__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
