<template>
  <ButtonAdd @click="handleToggleModal" />

  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Add Staff</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleChange"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label">Avatar</label>
        <div class="mb-3">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Avatar Preview
          </div>
          <img :src="previewImage" class="add-staff__img" />
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
        <input type="text" class="form-control" required v-model="staff.name" />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Position <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          v-model="staff.position"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Office <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          v-model="staff.office"
          required
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
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
import noAvatar from "../../../../../assets/img/no-avatar.png";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "AddStaff",
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
      staff: {
        name: "",
        position: "",
        office: "",
      },
      showModal: false,
      previewImage: noAvatar,
    };
  },
  methods: {
    ...mapActions(["addStaff"]),
    onSubmit(e) {
      e.preventDefault();
      if (
        this.staff.name != "" &&
        this.staff.name.trim() &&
        this.staff.position != "" &&
        this.staff.position.trim() &&
        this.staff.office != "" &&
        this.staff.office.trim()
      ) {
        this.addStaff({
          id: this.staff.id,
          avatar: this.previewImage,
          name: this.staff.name,
          position: this.staff.position,
          office: this.staff.office,
        });
        this.showModal = false;
        const inputFile = document.querySelector("#file-input");
        inputFile.value = "";
        this.previewImage = noAvatar;
        this.staff.name = "";
        this.staff.position = "";
        this.staff.office = "";
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
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
.add-staff__img {
  width: 20rem;
  height: 20rem;
  border-radius: 100%;
  display: flex;
  margin: auto;
  object-fit: contain;
}
@media only screen and (max-width: 600px) {
  .add-staff__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
