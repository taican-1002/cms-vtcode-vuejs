const footerModule = {
  state: {
    itemFooter: [
      {
        id: 1,
        name: "Địa chỉ",
        description: [
          {
            icon: ["phone"],
            text: "234 Ngô Tất Tố, phường 22, quận Bình Thạnh, Tp. Hồ Chí Minh",
          },
          {
            icon: ["phone"],
            text: "1900 77 99 18",
          },
          {
            icon: ["phone"],
            text: "info@vtcode.vn",
          },
          {
            icon: [
              "phone",
              "bone",
              "book-open",
              "champagne-glasses",
              "certificate",
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Sản phẩm",
        description: [
          {
            text: "Thi công hệ thống mạng công ty Tân Hùng Thái",
          },
          {
            text: "Thi công Datacenter Karaoke ICOOL",
          },
          {
            text: "Booth Karaoke",
          },
        ],
      },
      {
        id: 3,
        name: "Dịch vụ",
        description: [
          {
            text: "Xây dựng và thiết kế Website",
          },

          {
            text: "Phát triển ứng dụng di động",
          },
          {
            text: "Hosting, VPS, tên miền",
          },
        ],
      },
    ],
  },
  getters: {
    itemFooter: (state) => state.itemFooter,
  },
  mutations: {
    // FOOTER
    ADD_FOOTER(state, newItemFooter) {
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
  },
};
export default footerModule;
