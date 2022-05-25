<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Blog</h5>
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
                  required
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
              <!-- <div class="mb-3">
                <QuillEditor
                  v-model:content="blogEdit.description"
                  contentType="html"
                  theme="snow"
                  toolbar="full"
                />
              </div> -->
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
import { mapGetters } from "vuex";
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useToast } from "vue-toastification";
import CKEditor from "../CKEditor/CKEditor.vue";

export default {
  name: "edit-staff",
  components: { ButtonEdit, CKEditor },
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
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.blogEdit.title = this.blog.title;
      this.blogEdit.description = this.blog.description;
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
.modal-wrap,
.modal-content {
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
.modal {
  display: block !important; /* I added this to see the modal, you don't need this */
}

/* Important part */
.modal-dialog {
  overflow-y: initial !important;
  margin: 0.75rem auto;
}
.modal-body {
  height: 80vh;
  overflow-y: auto;
}

.modal-wrapper {
  display: table-cell;
  /* vertical-align: middle; */
}

.edit-blog_img {
  width: 10rem;
  height: 10rem;
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
