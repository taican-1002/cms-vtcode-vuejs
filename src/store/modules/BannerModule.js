var idBanner = 2;

const bannerModule = {
  state: {
    banners: [
      {
        id: 1,
        slogan: "True Technology Ultimate Life",
        description:
          "VTCode, công nghệ đích thực tối ưu cuộc sống. Chúng tôi sẽ mang đến cho bạn các giải pháp tốt nhất.",
        image: "https://hoangtrinh666.github.io/vtco_remake/images/banner.png",
      },
    ],
  },
  getters: {
    banners: (state) => state.banners,
  },
  mutations: {
    // USER
    ADD_BANNER(state, newBanner) {
      newBanner.id = idBanner++;
      state.banners.push(newBanner);
    },
    EDIT_BANNER(state, newBanner) {
      state.banners.map((item) => {
        if (item.id === newBanner.id) {
          Object.assign(item, newBanner);
        }
        return item;
      });
    },
    DELETE_BANNER(state, newBanner) {
      state.banners = state.banners.filter(
        (banner) => banner.id !== newBanner.id
      );
    },
  },
  actions: {
    // USER
    addBanner({ commit }, newBanner) {
      commit("ADD_BANNER", newBanner);
    },
    editBanner({ commit }, newBanner) {
      commit("EDIT_BANNER", newBanner);
    },
    deleteBanner({ commit }, newBanner) {
      commit("DELETE_BANNER", newBanner);
    },
  },
};
export default bannerModule;
