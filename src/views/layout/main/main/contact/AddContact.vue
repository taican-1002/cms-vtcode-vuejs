<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Contact</h5>
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
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          required
          v-model="contact.name"
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Phone <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          id="contact-phone"
          class="form-control"
          v-model="contact.phone"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Email <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          v-model="contact.email"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Description <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          v-model="contact.description"
          required
        />
      </div>
    </template>
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
      </button>
    </template>
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "AddStaff",
  components: { ButtonAdd, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      contact: {
        name: "",
        phone: "",
        email: "",
        description: "",
      },
      showModal: false,
    };
  },
  methods: {
    ...mapActions(["addContact"]),
    onSubmit() {
      if (
        this.contact.name != "" &&
        this.contact.name.trim() &&
        this.contact.phone != "" &&
        this.contact.phone.trim() &&
        this.contact.email != "" &&
        this.contact.email.trim() &&
        this.contact.description != "" &&
        this.contact.description.trim()
      ) {
        const regexMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        const contactPhone = document.querySelector("#contact-phone");
        const regexPhone = /((\+|)84|0[3|5|7|8|9])+([0-9]{8,9})\b/g;
        if (regexMail.test(this.contact.email)) {
          if (regexPhone.test(contactPhone.value) == false) {
            this.toast.error("Số điện thoại không hợp lệ!");
          } else {
            this.addContact({
              id: this.contact.id,
              name: this.contact.name,
              phone: this.contact.phone,
              email: this.contact.email,
              description: this.contact.description,
            });
            this.showModal = false;
            this.contact.id = "";
            this.contact.name = "";
            this.contact.email = "";
            this.contact.phone = "";
            this.contact.description = "";
          }
        } else {
          this.toast.warning("Email invalidate");
        }
      } else {
        console.log(this.contact.phone.length);
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
</style>
