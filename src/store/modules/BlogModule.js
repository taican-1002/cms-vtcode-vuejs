var idBlog = 3;

const blogModule = {
  state: {
    blogs: [
      {
        id: 1,
        title: "Thi công hệ thông mạng công ty tnhh Tân Hùng Thái",
        createDate: "6/5/2022",
        category: {
          id: 1,
          name: "Dự án",
          seo: "du-an",
        },
        author: "admin",
        description: "",
        image:
          "https://hoangtrinh666.github.io/vtcode-template/images/pro1.jpg",
      },
      {
        id: 2,
        title: "Lập Trình Phần Mềm",
        createDate: "5/5/2022",
        category: {
          id: 2,
          name: "Dịch vụ",
          seo: "dich-vu",
        },
        author: "admin",
        description: "",
        image:
          "https://hoangtrinh666.github.io/vtcode-template/images/service1.webp",
      },
    ],
  },
  getters: {
    blogs: (state) => state.blogs,
  },
  mutations: {
    // BLOG
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
  },
};
export default blogModule;
