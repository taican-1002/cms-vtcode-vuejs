<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Category</h5>
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
      <div class="mb-3">
        <label class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          v-model="categoryEdit.id"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="categoryEdit.name"
          @change="ToSeoUrl(this.categoryEdit.name)"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Seo</label>
        <input
          type="text"
          class="form-control"
          v-model="categoryEdit.seo"
          disabled
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
import ButtonEdit from "@//views/components/common/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "EditCategory",
  components: {
    ButtonEdit,
    modal: Modal,
  },
  data() {
    return {
      categoryEdit: {
        id: this.category.id,
        name: this.category.name,
        seo: this.category.seo,
      },
      showModal: false,
    };
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  props: ["category"],
  methods: {
    ...mapActions(["editCategory"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.categoryEdit.name = this.category.name;
      this.categoryEdit.seo = this.category.seo;
    },
    handleSaveEdit() {
      if (this.categoryEdit.name != "" && this.categoryEdit.name.trim()) {
        this.editCategory(this.categoryEdit);
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền tên!");
      }
    },
    ToSeoUrl(str) {
      // make the url lowercase
      // var encodedUrl = url.toLowerCase();
      // console.log(
      //   url
      //     .split(" ")
      //     .normalize("NFD")
      //     .replace(/[\u0300-\u036f]/g, "")
      // );

      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/\W+/g, " ");
      str = str.replace(/\s/g, "-");
      this.categoryEdit.seo = str;
    },
  },
};
</script>

<style scoped>
.mr-2 {
  margin-right: 1rem;
}
</style>
