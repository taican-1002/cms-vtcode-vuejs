<template>
  <ButtonEdit @click="handleEdit" />

  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Edit Staff</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseEdit"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body
      ><div class="mb-3 text-left">
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
    </template>
    <template v-slot:footer
      ><button type="button" class="btn btn-secondary" @click="handleCloseEdit">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleSaveEdit">
        SAVE CHANGE
      </button>
    </template>
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonEdit from "@/views/components/common/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "edit-staff",
  components: { ButtonEdit, modal: Modal },
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
.edit-staff__img {
  width: 20rem;
  height: 20rem;
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
