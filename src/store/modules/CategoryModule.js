var idCategory = 3;

const categoryModule = {
  state: {
    categories: [
      {
        id: 1,
        name: "Sản phẩm",
        seo: "san-pham",
      },
      {
        id: 2,
        name: "Dịch vụ",
        seo: "dich-vu",
      },
    ],
  },
  getters: {
    categories: (state) => state.categories,
  },
  mutations: {
    // USER
    ADD_CATEGORY(state, newCategory) {
      newCategory.id = idCategory++;
      state.categories.push(newCategory);
    },
    EDIT_CATEGORY(state, newCategory) {
      state.categories.map((item) => {
        if (item.id === newCategory.id) {
          Object.assign(item, newCategory);
        }
        return item;
      });
    },
    DELETE_CATEGORY(state, newCategory) {
      state.categories = state.categories.filter(
        (user) => user.id !== newCategory.id
      );
    },
  },
  actions: {
    // USER
    addCategory({ commit }, newCategory) {
      commit("ADD_CATEGORY", newCategory);
    },
    editCategory({ commit }, newCategory) {
      commit("EDIT_CATEGORY", newCategory);
    },
    deleteCategory({ commit }, newCategory) {
      commit("DELETE_CATEGORY", newCategory);
    },
  },
};
export default categoryModule;
