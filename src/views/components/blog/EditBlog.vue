<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Blog</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="showModal = false"
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
                <label class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="blogEdit.title"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label">Category</label>
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
                <!-- <input
                  type="text"
                  class="form-control"
                  v-model="blogEdit.category"
                  required
                /> -->
              </div>
              <div class="mb-3 text-left">
                <label for="validationDefault04" class="form-label"
                  >Author</label
                >
                <select
                  class="form-select form-author"
                  id="validationDefault04"
                  required
                >
                  <option selected disabled value="">Select Author</option>
                  <option value="Admin">Admin</option>
                </select>
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
                @click="showModal = false"
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

export default {
  name: "edit-staff",
  components: { ButtonEdit },
  computed: mapGetters(["categories"]),

  data() {
    return {
      blogEdit: {
        id: this.blog.id,
        title: this.blog.title,
        category: this.blog.category,
        author: this.blog.author,
        image: this.blog.image,
        createDate: this.blog.createDate,
      },
      showModal: false,
      previewImage: this.blog.image,
    };
  },
  props: ["blog"],
  mounted() {
    console.log(this.blogEdit.category.id);
  },
  methods: {
    ...mapActions(["editBlogAction"]),
    handleEdit() {
      this.showModal = true;
    },
    handleSaveEdit(e) {
      e.preventDefault();
      const formCategory = document.querySelector(".form-category");
      this.blogEdit.category = formCategory.value;
      this.blogEdit.image = this.previewImage;
      this.editBlogAction(this.blogEdit);
      this.showModal = false;
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
