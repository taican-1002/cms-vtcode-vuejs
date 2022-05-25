var idUser = 4;
const userModule = {
  state: {
    users: [
      {
        id: 1,
        email: "admin@gmail.com",
        role: {
          id: 1,
          name: "admin",
        },
        password: "Admin@123",
      },
      {
        id: 2,
        email: "john@gmail.com",
        role: {
          id: 2,
          name: "client",
        },
        password: "toilajohn",
      },

      {
        id: 3,
        email: "shia@gmai.com",
        role: {
          id: 2,
          name: "client",
        },
        password: "shiano1",
      },
    ],
    roleUser: [
      {
        id: 1,
        name: "admin",
      },
      {
        id: 2,
        name: "client",
      },
    ],
  },
  getters: {
    users: (state) => state.users,
    roleUser: (state) => state.roleUser,
  },
  mutations: {
    // USER
    ADD_USER(state, newUser) {
      newUser.id = idUser++;
      state.users.push(newUser);
    },
    EDIT_USER(state, newUser) {
      state.users.map((item) => {
        if (item.id === newUser.id) {
          Object.assign(item, newUser);
        }
        return item;
      });
    },
    DELETE_USER(state, newUser) {
      state.users = state.users.filter((user) => user.id !== newUser.id);
    },
  },
  actions: {
    // USER
    addUser({ commit }, newUser) {
      commit("ADD_USER", newUser);
    },
    editUserAction({ commit }, newUser) {
      commit("EDIT_USER", newUser);
    },
    deleteUserAction({ commit }, newUser) {
      commit("DELETE_USER", newUser);
    },
  },
};
export default userModule;
