<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Category</h5>
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
        <label for="exampleInputEmail1" class="form-label"
          >Name <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="category.name"
          @change="ToSeoUrl(category.name)"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Seo</label>
        <input
          type="text"
          class="form-control"
          v-model="category.seo"
          disabled
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
  name: "AddUser",
  components: { ButtonAdd, modal: Modal },
  data() {
    return {
      category: {
        name: "",
        seo: "",
      },
      showModal: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    ...mapActions(["addCategory"]),

    ToSeoUrl(str) {
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
      this.category.seo = str;
    },
    onSubmit() {
      if (this.category.name != "" && this.category.name.trim()) {
        this.addCategory({
          id: this.category.id,
          name: this.category.name,
          seo: this.category.seo,
        });
        this.showModal = false;
        this.category.id = "";
        this.category.name = "";
        this.category.seo = "";
      } else {
        this.toast.error("Vui lòng điền đẩy đủ thông tin!");
      }
    },
    handleToggleModal() {
      this.showModal = true;
    },
    handleChange() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped></style>
