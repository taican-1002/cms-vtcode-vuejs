<template>
  <ButtonEdit @click="showModal = true" />

  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Footer</h5>
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
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          v-model="editItem.id"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="editItem.name"
        />
      </div>
      <div class="edit-footer__des">
        <h5 class="pt-3 text-left">Description</h5>
        <ButtonAdd @click="handleAddModalDes" class="mb-3" />
      </div>

      <div
        class="mb-3 description-content text-left"
        v-for="(desItem, index) in editItem.description"
        :key="index"
      >
        <div class="mb-3 description-text">
          {{ desItem.text }}
        </div>
        <ButtonEdit
          @click="handleOpenModalDes(desItem, index)"
          class="mb-3 float-left"
          style="margin-bottom: 1rem !important"
        />
        <ButtonDelete @click="handleDeleteDesItem(desItem)" /></div
    ></template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" @click="handleCloseEdit">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onSubmit">
        SAVE CHANGE
      </button></template
    >
  </modal>

  <!-- Modal Add Des -->
  <modal v-if="showModalAddDes">
    <template v-slot:header>
      <h5 class="modal-title">Add Description</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModalAddDes = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Text <span style="color: #ff0000">*</span></label
        >
        <input type="text" class="form-control add-des__text" /></div
    ></template>
    <template v-slot:footer
      ><button
        type="button"
        class="btn btn-secondary"
        @click="showModalAddDes = false"
      >
        Close
      </button>

      <button
        type="button"
        class="btn btn-primary"
        @click="onSubmitAddModalDes"
      >
        ADD
      </button>
    </template>
  </modal>

  <!-- Modal Description -->
  <modal v-if="showModalIcon">
    <template v-slot:header
      ><h5 class="modal-title">Edit Description</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModalIcon = false"
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
          class="form-control des-text"
          v-model="textDes"
        /></div
    ></template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModalIcon = false"
      >
        Close
      </button>

      <button type="button" class="btn btn-primary" @click="onSubmitModalDes">
        SAVE
      </button></template
    >
  </modal>

  <!-- Modal Delete Des Item -->
  <modalSmall v-if="showModalDelete">
    <template v-slot:header>
      <h5 class="modal-title">Delete Footer</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModalDelete = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">Bạn có chắc muốn xóa item này ?</div>
    </template>
    <template v-slot:footer
      ><button
        type="button"
        class="btn btn-secondary"
        @click="showModalDelete = false"
      >
        Close
      </button>

      <button
        type="button"
        class="btn btn-primary"
        @click="handleDeleteModalDes"
      >
        DELETE
      </button>
    </template>
  </modalSmall>
</template>

<script>
import { mapActions } from "vuex";
import ButtonEdit from "@//views/components/common/ButtonAction/ButtonEdit.vue";
import ButtonDelete from "@//views/components/common/ButtonAction/ButtonDelete.vue";
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";
import ModalSmall from "../../../../components/common/ModalSmall.vue";

export default {
  name: "EditFooter",
  components: {
    ButtonEdit,
    ButtonAdd,
    ButtonDelete,
    modal: Modal,
    modalSmall: ModalSmall,
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      itemEditDel: {
        index: 0,
        item: "",
      },
      value: null,
      options: ["bone", "book-open", "certificate", "phone"],
      editItem: {
        id: this.footerItem.id,
        name: this.footerItem.name,
        description: this.footerItem.description,
      },

      textDes: "",
      showModal: false,
      showModalIcon: false,
      showModalAddDes: false,
      showModalDelete: false,
    };
  },
  props: ["footerItem"],
  methods: {
    ...mapActions(["editFooter"]),

    /**Modal */
    onSubmit() {
      if (this.editItem.name != "" && this.editItem.name.trim()) {
        this.editFooter(this.editItem);
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    handleCloseEdit() {
      this.showModal = false;
      this.editItem.name = this.footerItem.name;
      this.editItem.description = this.footerItem.description;
    },

    /**Modal */
    handleOpenModalDes(desItem, index) {
      this.showModalIcon = true;
      this.value = desItem.icon;
      this.textDes = desItem.text;
      this.itemEditDel.index = index;
    },
    /**Modal Description  */
    onSubmitAddModalDes() {
      const addDesText = document.querySelector(".add-des__text");
      if (addDesText.value != "" && addDesText.value.trim()) {
        this.editItem.description.push({
          text: addDesText.value,
        });
        this.showModalAddDes = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    /**Modal Description */
    onSubmitModalDes() {
      if (this.textDes != "" && this.textDes.trim()) {
        this.editItem.description[this.itemEditDel.index] = {
          text: this.textDes,
        };
        this.showModalIcon = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },

    /**Modal Add Des */
    handleAddModalDes() {
      this.showModalAddDes = true;
    },
    /**Modal Delete Des Item  */
    handleDeleteDesItem(desItem) {
      this.showModalDelete = true;
      this.itemEditDel.item = desItem.text;
    },
    handleDeleteModalDes() {
      this.showModalDelete = false;
      const delDesItem = this.editItem.description.filter(
        (item) => item.text != this.itemEditDel.item
      );
      this.editItem.description = delDesItem;
    },
  },
};
</script>

<style scoped>
.text-left {
  text-align: left;
}
.float-left {
  float: left;
}
.mr-2 {
  margin-right: 1rem;
}
.form-label {
  float: left;
}
.edit-footer__des {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.description-icon {
  display: flex;
}
.description-content {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
