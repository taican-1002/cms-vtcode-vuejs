<template>
  <ButtonAdd @click="handleOpenModal" />

  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Add Footer</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseModal"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="footerItem.name"
        />
      </div>
      <h5 class="pt-3">Description</h5>
      <div
        class="mb-3"
        v-for="(desItem, index) in footerItem.description"
        :key="index"
      >
        <div v-if="desItem.text">Text: {{ desItem.text }}</div>
      </div>

      <ButtonAdd @click="handleOpenModalDes" class="mb-3" />
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" @click="handleCloseModal">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onSubmit">
        ADD
      </button></template
    >
  </modal>

  <!-- Modal Description -->
  <modal v-if="showModalDes">
    <template v-slot:header
      ><h5 class="modal-title">Add Description</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleCloseModalDes"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Text <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control description-text"
          v-model="textDes"
        /></div
    ></template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="handleCloseModalDes"
      >
        Close
      </button>

      <button type="button" class="btn btn-primary" @click="onSubmitModalDes">
        ADD
      </button></template
    >
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
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
      footerItem: {
        name: "",
        description: [],
      },
      textDes: "",
      showModal: false,
      showModalDes: false,
    };
  },

  methods: {
    ...mapActions(["addFooter"]),
    onSubmit() {
      if (
        this.footerItem.name != "" &&
        this.footerItem.name.trim() &&
        this.footerItem.description != []
      ) {
        this.addFooter({
          name: this.footerItem.name,
          description: this.footerItem.description,
        });
        this.showModal = false;
        this.footerItem.name = "";
        this.footerItem.description = [];
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    handleCloseModal() {
      this.showModal = false;
      this.footerItem.name = "";
      this.footerItem.description = [];
    },

    onSubmitModalDes() {
      const inputDesText = document.querySelector(".description-text");
      // const inputDesIcon = document.querySelector(".description-icon");
      if (inputDesText.value != "" && inputDesText.value.trim()) {
        this.footerItem.description.push({
          text: inputDesText.value,
        });
        this.showModalDes = false;
        this.textDes = "";
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    handleCloseModalDes() {
      this.showModalDes = false;
      this.textDes = "";
    },
    handleOpenModal() {
      this.showModal = true;
    },

    handleOpenModalDes() {
      this.showModalDes = true;
    },
  },
};
</script>

<style scoped></style>
