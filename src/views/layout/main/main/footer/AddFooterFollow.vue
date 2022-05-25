<template>
  <ButtonAdd @click="handleOpenModal" />
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Footer</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseModal"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Format <span style="color: #ff0000">*</span></label
        >
        <select class="form-select form-select__format" required>
          <option selected value="" disabled>Choose format</option>
          <option value="fab">fab</option>
          <option value="fas">fas</option>
          <option value="far">far</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Icon <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control form-control__icon" required />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="footerFollow.name"
        /></div
    ></template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" @click="handleCloseModal">
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
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "AddFooter",
  components: { ButtonAdd, modal: Modal },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      footerFollow: {
        name: "",
        icon: [],
      },
      showModal: false,
      showModalDes: false,
    };
  },

  methods: {
    ...mapActions(["addFooterFollow"]),
    onSubmit() {
      const formFormat = document.querySelector(".form-select__format");
      const formIcon = document.querySelector(".form-control__icon");

      if (
        this.footerFollow.name != "" &&
        this.footerFollow.name.trim() &&
        formFormat.value != "" &&
        formFormat.value.trim() &&
        formIcon.value != "" &&
        formIcon.value.trim()
      ) {
        console.log(this.footerFollow.icon);
        this.footerFollow.icon.push(formFormat.value, formIcon.value);
        this.addFooterFollow({
          name: this.footerFollow.name,
          icon: this.footerFollow.icon,
        });
        this.showModal = false;
        this.footerFollow.name = "";
        this.footerFollow.icon = [];
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    handleCloseModal() {
      this.showModal = false;
      this.footerFollow.name = "";
      this.footerFollow.icon = [];
    },

    handleOpenModal() {
      this.showModal = true;
    },
  },
};
</script>

<style scoped></style>
