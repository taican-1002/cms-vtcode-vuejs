var idFooter = 5;
var idFooterFollow = 5;
const footerModule = {
  state: {
    itemFooter: [
      {
        id: 1,
        name: "Dịch vụ",
        description: [
          {
            text: "Giá thành",
          },
          {
            text: "Dịch vụ",
          },
          {
            text: "Chúng tôi",
          },
          {
            text: "Định hướng",
          },
        ],
      },
      {
        id: 2,
        name: "Chính sách",
        description: [
          {
            text: "Chính sách",
          },
          {
            text: "Hỗ trợ",
          },
          {
            text: "Bảo mật",
          },
        ],
      },
      {
        id: 3,
        name: "Nhân lực",
        description: [
          {
            text: "Lập trình viên",
          },
          {
            text: "Thiết kế",
          },
        ],
      },
      {
        id: 4,
        name: "Blog",
        description: [
          {
            text: "CEO",
          },
          {
            text: "Cuộc sống",
          },
          {
            text: "Điều khoản",
          },
          {
            text: "Công nghệ",
          },
        ],
      },
    ],
    followFooter: [
      {
        id: 1,
        name: "Facebook",
        icon: ["fab", "facebook"],
      },
      {
        id: 2,
        name: "Twitter",
        icon: ["fab", "twitter"],
      },
      {
        id: 3,
        name: "Instagram",
        icon: ["fab", "instagram"],
      },
      {
        id: 4,
        name: "Youtube",
        icon: ["fab", "youtube"],
      },
    ],
  },
  getters: {
    itemFooter: (state) => state.itemFooter,
    followFooter: (state) => state.followFooter,
  },
  mutations: {
    // FOOTER
    ADD_FOOTER(state, newItemFooter) {
      newItemFooter.id = idFooter++;
      state.itemFooter.push(newItemFooter);
    },
    EDIT_FOOTER(state, newItemFooter) {
      state.itemFooter.map((item) => {
        if (item.id === newItemFooter.id) {
          Object.assign(item, newItemFooter);
        }
        return item;
      });
    },
    DELETE_FOOTER(state, newItemFooter) {
      state.itemFooter = state.itemFooter.filter(
        (footerItem) => footerItem.id !== newItemFooter.id
      );
    },
    // FOOTER FOLLOW
    ADD_FOOTER_FOLLOW(state, newFooterFollow) {
      newFooterFollow.id = idFooterFollow++;
      state.followFooter.push(newFooterFollow);
    },
    EDIT_FOOTER_FOLLOW(state, newFooterFollow) {
      state.followFooter.map((item) => {
        if (item.id === newFooterFollow.id) {
          Object.assign(item, newFooterFollow);
        }
        return item;
      });
    },
    DELETE_FOOTER_FOLLOW(state, newFooterFollow) {
      state.followFooter = state.followFooter.filter(
        (footerFollow) => footerFollow.id !== newFooterFollow.id
      );
    },
  },
  actions: {
    // FOOTER
    addFooter({ commit }, newItemFooter) {
      commit("ADD_FOOTER", newItemFooter);
    },
    editFooter({ commit }, newItemFooter) {
      commit("EDIT_FOOTER", newItemFooter);
    },
    deleteFooter({ commit }, newItemFooter) {
      commit("DELETE_FOOTER", newItemFooter);
    },
    // FOOTER FOLLOW
    addFooterFollow({ commit }, newFooterFollow) {
      commit("ADD_FOOTER_FOLLOW", newFooterFollow);
    },
    editFooterFollow({ commit }, newFooterFollow) {
      commit("EDIT_FOOTER_FOLLOW", newFooterFollow);
    },
    deleteFooterFollow({ commit }, newFooterFollow) {
      commit("DELETE_FOOTER_FOLLOW", newFooterFollow);
    },
  },
};
export default footerModule;
