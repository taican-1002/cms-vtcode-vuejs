const userModule = {
  state: {
    users: [
      {
        id: 1,
        email: "john@gmail.com",
        password: "toilajohn",
      },
      {
        id: 2,
        email: "alex@yahoo.com",
        password: "alexlatoi",
      },
      {
        id: 3,
        email: "shia@gmai.com",
        password: "shiano1",
      },
    ],
  },
  getters: {
    users: (state) => state.users,
  },
  mutations: {
    // USER
    ADD_USER(state, newUser) {
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
