var idContact = 4;

const contactModule = {
  state: {
    contacts: [
      {
        id: 1,
        name: "John",
        tel: "0123456",
        email: "abc@gmail.com",
        topic: "Topic 1",
        description: "Description 1",
      },
      {
        id: 2,
        name: "Robert",
        tel: "0123456",
        email: "abc@gmail.com",
        topic: "Topic 2",
        description: "Description 2",
      },
      {
        id: 3,
        name: "Alex",
        tel: "0123456",
        email: "abc@gmail.com",
        topic: "Topic 3",
        description: "Description 3",
      },
    ],
  },
  getters: {
    contacts: (state) => state.contacts,
  },
  mutations: {
    // USER
    ADD_STAFF(state, newContact) {
      newContact.id = idContact++;
      state.contacts.push(newContact);
    },
    EDIT_STAFF(state, newContact) {
      state.contacts.map((item) => {
        if (item.id === newContact.id) {
          Object.assign(item, newContact);
        }
        return item;
      });
    },
    DELETE_STAFF(state, newContact) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== newContact.id
      );
    },
  },
  actions: {
    addStaff({ commit }, newContact) {
      commit("ADD_STAFF", newContact);
    },
    editStaff({ commit }, newContact) {
      commit("EDIT_STAFF", newContact);
    },
    deleteStaff({ commit }, newContact) {
      commit("DELETE_STAFF", newContact);
    },
  },
};
export default contactModule;
