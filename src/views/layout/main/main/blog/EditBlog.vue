<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Edit Blog</h5>
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
          v-model="blogEdit.id"
          disabled
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label">Image</label>
        <div class="mb-3 text-left">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Image Preview
          </div>
          <img :src="previewImage" class="edit-blog_img" />
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
          >Title <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          v-model="blogEdit.title"
          @change="ToSeoUrl(this.blogEdit.title)"
          required
        />
      </div>
      <div class="mb-3 text-left">
        <label class="form-label">Seo</label>
        <input
          type="text"
          class="form-control"
          v-model="blogEdit.seo"
          disabled
        />
      </div>

      <div class="mb-3 text-left">
        <label class="form-label"
          >Category <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select form-category"
          id="validationDefault04"
          required
        >
          <option disabled value="">Select Category</option>
          <option
            v-for="item in categories"
            class="select-option"
            :key="item.id"
            :value="item.id"
            :selected="item.id === blogEdit.category.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="mb-3 text-left">
        <label for="validationDefault04" class="form-label"
          >Author <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select form-author"
          id="validationDefault04"
          required
        >
          <option selected disabled value="">Select Author</option>
          <option
            v-for="item in authors"
            class="select-option"
            :key="item.id"
            :value="item.id"
            :selected="item.id === blogEdit.author.id"
          >
            {{ item.role }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <CKEditor :content="blogEdit.description"></CKEditor>
      </div>
      <div class="mb-3 text-left">
        <label class="form-label">Create Date</label>
        <input
          type="text"
          class="form-control"
          v-model="blogEdit.createDate"
          required
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
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import CKEditor from "../CKEditor/CKEditor.vue";
import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "edit-staff",
  components: { ButtonEdit, CKEditor, Modal },
  computed: mapGetters(["categories", "authors"]),
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      blogEdit: {
        id: this.blog.id,
        title: this.blog.title,
        seo: this.blog.seo,
        category: this.blog.category,
        description: this.blog.description,
        author: this.blog.author,
        image: this.blog.image,
        createDate: this.blog.createDate,
      },
      showModal: false,
      previewImage: this.blog.image,
    };
  },
  props: ["blog"],
  methods: {
    ...mapActions(["editBlogAction"]),
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
      this.blogEdit.seo = str;
    },
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.blogEdit.title = this.blog.title;
      this.blogEdit.description = this.blog.description;
      this.blogEdit.seo = this.blog.seo;
      this.previewImage = this.blog.image;
    },
    handleSaveEdit() {
      const formCategory = document.querySelector(".form-category");
      const formAuthor = document.querySelector(".form-author");
      const objCategory = this.categories.filter(
        (item) => item.id == formCategory.value
      );
      const objAuthor = this.authors.filter(
        (item) => item.id == formAuthor.value
      );
      if (this.blogEdit.title != "" && this.blogEdit.title.trim()) {
        this.blogEdit.author = objAuthor[0];
        this.blogEdit.category = objCategory[0];
        this.blogEdit.image = this.previewImage;
        this.editBlogAction(this.blogEdit);
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

.edit-blog_img {
  width: 20rem;
  height: 20rem;
  /* border-radius: 100%; */
  display: flex;
  margin: auto;
}
@media only screen and (max-width: 600px) {
  .edit-blog_img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
