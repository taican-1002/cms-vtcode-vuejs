<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Category</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="handleCloseEdit"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="handleCloseEdit"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="handleSaveEdit"
              >
                SAVE CHANGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ButtonEdit from "@/examples/ButtonAction/ButtonEdit.vue";
import { useToast } from "vue-toastification";

export default {
  name: "EditCategory",
  components: { ButtonEdit },
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
</style>
