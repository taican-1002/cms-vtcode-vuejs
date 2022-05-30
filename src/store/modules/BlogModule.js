var idBlog = 3;

const blogModule = {
  state: {
    blogs: [
      {
        id: 1,
        title: "Thi công hệ thông mạng công ty tnhh Tân Hùng Thái",
        seo: "thi-cong-he-thong-mang-cong-ty-tnhh-tan-hung-thai",
        createDate: "6/5/2022",
        category: {
          id: 1,
          name: "Dự án",
          seo: "du-an",
        },
        isPin: false,
        author: {
          id: 1,
          role: "admin",
        },
        description: "",
        image:
          "https://hoangtrinh666.github.io/vtcode-template/images/pro1.jpg",
      },
      {
        id: 2,
        title: "Lập Trình Phần Mềm",
        seo: "lap-trinh-phan-mem",
        createDate: "5/5/2022",
        category: {
          id: 2,
          name: "Dịch vụ",
          seo: "dich-vu",
        },
        isPin: false,
        author: {
          id: 2,
          role: "client",
        },
        description: "",
        image:
          "https://hoangtrinh666.github.io/vtcode-template/images/service1.webp",
      },
    ],
    authors: [
      {
        id: 1,
        role: "admin",
      },
      {
        id: 2,
        role: "client",
      },
    ],
  },
  getters: {
    blogs: (state) => state.blogs,
    isPinBlog: (state) => state.blogs.filter((item) => item.isPin == true),
    authors: (state) => state.authors,
  },
  mutations: {
    // BLOG
    ISPIN_BLOG(state, newBlog) {
      state.blogs.map((item) => {
        if (item.id === newBlog.id) {
          item.isPin = !item.isPin;
        }
        return item;
      });
    },
    ADD_BLOG(state, newBlog) {
      newBlog.id = idBlog++;
      state.blogs.push(newBlog);
    },
    EDIT_BLOG(state, newBlog) {
      state.blogs.map((item) => {
        if (item.id === newBlog.id) {
          Object.assign(item, newBlog);
        }
        return item;
      });
    },
    DELETE_BLOG(state, newBlog) {
      state.blogs = state.blogs.filter((blog) => blog.id !== newBlog.id);
    },
  },
  actions: {
    // BLOG
    addBlog({ commit }, newBlog) {
      commit("ADD_BLOG", newBlog);
    },
    editBlogAction({ commit }, newBlog) {
      commit("EDIT_BLOG", newBlog);
    },
    deleteBlogAction({ commit }, newBlog) {
      commit("DELETE_BLOG", newBlog);
    },
    isPinBlogAction({ commit }, newBlog) {
      commit("ISPIN_BLOG", newBlog);
    },
  },
};
export default blogModule;
