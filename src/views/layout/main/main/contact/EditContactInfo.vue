<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit contact info</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseEdit"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3 text-left">
        <label class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          v-model="contactInfoEdit.id"
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
          v-model="contactInfoEdit.name"
          required
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Content <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="contact-phone"
          v-model="contactInfoEdit.content"
          required
        /></div
    ></template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" @click="handleCloseEdit">
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
import ButtonEdit from "@//views/components/common/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "edit-contact",
  components: { ButtonEdit, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      contactInfoEdit: {
        id: this.contactInfo.id,
        name: this.contactInfo.name,
        content: this.contactInfo.content,
      },
      showModal: false,
    };
  },
  props: ["contactInfo"],

  methods: {
    ...mapActions(["editContactInfo"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.contactInfoEdit.name = this.contactInfo.name;
      this.contactInfoEdit.content = this.contactInfo.content;
    },
    handleSaveEdit() {
      if (
        this.contactInfoEdit.name != " " &&
        this.contactInfoEdit.name.trim() &&
        this.contactInfoEdit.content != "" &&
        this.contactInfoEdit.content.trim()
      ) {
        this.editContactInfo(this.contactInfoEdit);
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
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
.edit-contact__img {
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  display: flex;
  margin: auto;
}
@media only screen and (max-width: 600px) {
  .edit-contact__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
