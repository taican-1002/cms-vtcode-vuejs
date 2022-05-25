<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit contact</h5>
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
          v-model="contactEdit.id"
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
          v-model="contactEdit.name"
          required
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Phone <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="contact-phone"
          v-model="contactEdit.phone"
          required
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Email <span style="color: #ff0000">*</span></label
        >
        <input
          type="email"
          class="form-control"
          v-model="contactEdit.email"
          required
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label"
          >Description <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          v-model="contactEdit.description"
          required
        />
      </div>
    </template>
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
import ButtonEdit from "@/examples/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "edit-contact",
  components: { ButtonEdit, modal: Modal },
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
      contactEdit: {
        id: this.contact.id,
        name: this.contact.name,
        phone: this.contact.phone,
        email: this.contact.email,
        description: this.contact.description,
      },
      showModal: false,
    };
  },
  props: ["contact"],

  methods: {
    ...mapActions(["editContact"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.contactEdit.name = this.contact.name;
      this.contactEdit.phone = this.contact.phone;
      this.contactEdit.email = this.contact.email;
      this.contactEdit.description = this.contact.description;
    },
    handleSaveEdit() {
      const regexMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
      const contactPhone = document.querySelector("#contact-phone");
      const regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (
        this.contactEdit.name != " " &&
        this.contactEdit.name.trim() &&
        this.contactEdit.phone != "" &&
        this.contactEdit.phone.trim() &&
        this.contactEdit.email != "" &&
        this.contactEdit.email.trim() &&
        this.contactEdit.description != "" &&
        this.contactEdit.description.trim()
      ) {
        if (regexMail.test(this.contactEdit.email)) {
          if (regexPhone.test(contactPhone.value) == false) {
            this.toast.error("Số điện thoại không hợp lệ!");
          } else {
            this.editContact(this.contactEdit);
            this.showModal = false;
          }
        } else {
          this.toast.warning("Email invalidate");
        }
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
