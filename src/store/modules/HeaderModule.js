import vtcode from "@/assets/img/logos/vtcode.png";
var idHeader = 6;
var idLogo = 2;

const headerModule = {
  state: {
    headers: [
      {
        id: 1,
        name: "Trang chủ",
      },
      {
        id: 2,
        name: "Dịch vụ",
      },
      {
        id: 3,
        name: "Dự án",
      },
      {
        id: 4,
        name: "Đội ngũ",
      },
      {
        id: 5,
        name: "Liên hệ",
      },
    ],
    logos: [
      {
        id: 1,
        name: "VTCODE",
        img: vtcode,
      },
    ],
  },
  getters: {
    headers: (state) => state.headers,
    logos: (state) => state.logos,
  },
  mutations: {
    // HEADER ITEM
    ADD_HEADER(state, newHeader) {
      newHeader.id = idHeader++;
      state.headers.push(newHeader);
    },
    EDIT_HEADER(state, newHeader) {
      state.headers.map((item) => {
        if (item.id === newHeader.id) {
          Object.assign(item, newHeader);
        }
        return item;
      });
    },
    DELETE_HEADER(state, newHeader) {
      state.headers = state.headers.filter(
        (header) => header.id !== newHeader.id
      );
    },
    //HEADER LOGO
    ADD_LOGO(state, newLogo) {
      newLogo.id = idLogo++;
      state.logos.push(newLogo);
    },
    EDIT_LOGO(state, newLogo) {
      state.logos.map((item) => {
        if (item.id === newLogo.id) {
          Object.assign(item, newLogo);
        }
        return item;
      });
    },
    DELETE_LOGO(state, newLogo) {
      state.logos = state.logos.filter((logo) => logo.id !== newLogo.id);
    },
  },
  actions: {
    // HEADER LOGO
    addLogo({ commit }, newLogo) {
      commit("ADD_LOGO", newLogo);
    },
    editLogo({ commit }, newLogo) {
      commit("EDIT_LOGO", newLogo);
    },
    deleteLogo({ commit }, newLogo) {
      commit("DELETE_LOGO", newLogo);
    },
    //HEADER ITEM
    addHeader({ commit }, newHeader) {
      commit("ADD_HEADER", newHeader);
    },
    editHeader({ commit }, newHeader) {
      commit("EDIT_HEADER", newHeader);
    },
    deleteHeader({ commit }, newHeader) {
      commit("DELETE_HEADER", newHeader);
    },
  },
};
export default headerModule;
