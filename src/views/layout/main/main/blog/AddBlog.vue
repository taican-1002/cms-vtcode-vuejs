<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->
  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add Blog</h5>
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
        <label for="exampleInputPassword1" class="form-label">Image</label>
        <div class="mb-3">
          <div
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Image Preview
          </div>
          <img :src="previewImage" class="add-blog__img" />
        </div>
        <input
          type="file"
          class="form-control"
          accept="image/*"
          @change="uploadImage"
          id="file-input"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Title <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="blog.title"
          @change="ToSeoUrl(blog.title)"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Seo</label>
        <input type="text" class="form-control" disabled v-model="blog.seo" />
      </div>
      <div class="mb-3">
        <label for="validationDefault04" class="form-label"
          >Category <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select form-category"
          id="validationDefault04"
          required
        >
          <option selected disabled value="">Select Category</option>
          <option v-for="item in categories" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="validationDefault04" class="form-label"
          >Author <span style="color: #ff0000">*</span></label
        >
        <select
          class="form-select form-author"
          id="validationDefault04"
          required
        >
          <option selected disabled value="">Select Author</option>
          <option v-for="item in authors" :key="item.id" :value="item.id">
            {{ item.role }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <CKEditor @send-content="getContent" :content="ckeditor"></CKEditor>
      </div>
      <div class="mb-3">
        <div
          class="text-uppercase text-secondary text-xl font-weight-bolder opacity-7"
        >
          Create Date : {{ currentDateTime() }}
        </div>
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

import noImage from "../../../../../assets/img/no-image.png";
import ButtonAdd from "@//views/components/common/ButtonAction/ButtonAdd.vue";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";

import CKEditor from "../CKEditor/CKEditor.vue";
import { ref } from "@vue/reactivity";

import Modal from "../../../../components/common/Modal.vue";

export default {
  name: "add-blog",
  computed: mapGetters(["categories", "authors"]),
  setup() {
    const toast = useToast();
    const initialData = ref("Hello");
    // const getContent = (val) => {
    //   console.log(val);
    // };
    return {
      // getContent,
      initialData,
      toast,
    };
  },
  mounted() {
    // this.quill = this.blog.description;
    this.ckeditor = this.blog.description;
  },
  data() {
    return {
      ckeditor: "",
      blog: {
        title: "",
        category: {},
        seo: "",
        author: {},
        image: "",
        description: "",
        createDate: "",
      },
      // showModalModal: false,
      showModal: false,
      previewImage: noImage,
    };
  },
  components: {
    ButtonAdd,
    CKEditor,
    modal: Modal,
  },
  methods: {
    ...mapActions(["addBlog"]),
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
      this.blog.seo = str;
    },
    getContent(val) {
      // console.log(val);
      this.ckeditor = val;
    },
    onSubmit() {
      const formSelectCategory = document.querySelector(".form-category");
      const formSelectAuthor = document.querySelector(".form-author");
      const objCategory = this.categories.filter(
        (item) => item.id == formSelectCategory.value
      );
      const objAuthor = this.authors.filter(
        (item) => item.id == formSelectAuthor.value
      );
      // console.log(objAuthor);
      if (
        this.blog.title != "" &&
        this.blog.title.trim() &&
        formSelectCategory.value != "" &&
        formSelectCategory.value.trim() &&
        formSelectAuthor.value != "" &&
        formSelectAuthor.value.trim()
      ) {
        this.addBlog({
          id: this.blog.id,
          title: this.blog.title,
          seo: this.blog.seo,
          category: objCategory[0],
          author: objAuthor[0],
          description: this.ckeditor,
          image: this.previewImage,
          createDate: this.currentDateTime(),
        });
        console.log(this.ckeditor);
        this.showModal = false;
        this.blog.id = "";
        this.blog.title = "";
        this.blog.seo = "";
        this.blog.category = {};
        this.blog.author = {};
        this.previewImage = noImage;
        this.blog.createDate = "";
        const inputFile = document.querySelector("#file-input");
        inputFile.value = "";
        this.ckeditor = "";
        formSelectCategory.value = "";
        formSelectAuthor.value = "";
        // console.log(this.blog.description);
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },

    handleToggleModal() {
      this.showModal = true;
    },
    handleChange() {
      this.showModal = false;
      this.blog.id = "";
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
.form-select,
.form-select:focus {
  border-color: unset !important;
  outline: 0;
  box-shadow: none !important;
}

.add-blog__img {
  width: 20rem;
  height: 20rem;
  display: flex;
  margin: auto;
  object-fit: contain;
}

@media only screen and (max-width: 600px) {
  .add-blog__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>
s
