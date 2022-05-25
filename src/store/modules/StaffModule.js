var idStaff = 4;

const staffModule = {
  state: {
    staffs: [
      {
        id: 1,
        name: "John",
        position: "Người sáng lập",
        office: "Giám đốc điều hành",
        avatar:
          "https://hoangtrinh666.github.io/vtcode-template/images/team1.jpg",
      },
      {
        id: 2,
        name: "Robert",
        position: "Người sáng lập",
        office: "Giám đốc điều hành",
        avatar:
          "https://hoangtrinh666.github.io/vtcode-template/images/team1.jpg",
      },
      {
        id: 3,
        name: "Alex",
        position: "Người sáng lập",
        office: "Giám đốc điều hành",
        avatar:
          "https://hoangtrinh666.github.io/vtcode-template/images/team1.jpg",
      },
    ],
  },
  getters: {
    staffs: (state) => state.staffs,
  },
  mutations: {
    // USER
    ADD_STAFF(state, newStaff) {
      newStaff.id = idStaff++;
      state.staffs.push(newStaff);
    },
    EDIT_STAFF(state, newStaff) {
      state.staffs.map((item) => {
        if (item.id === newStaff.id) {
          Object.assign(item, newStaff);
        }
        return item;
      });
    },
    DELETE_STAFF(state, newStaff) {
      state.staffs = state.staffs.filter((staff) => staff.id !== newStaff.id);
    },
  },
  actions: {
    // USER
    addStaff({ commit }, newStaff) {
      commit("ADD_STAFF", newStaff);
    },
    editStaff({ commit }, newStaff) {
      commit("EDIT_STAFF", newStaff);
    },
    deleteStaff({ commit }, newStaff) {
      commit("DELETE_STAFF", newStaff);
    },
  },
};
export default staffModule;
