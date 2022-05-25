var idContact = 4;

const contactModule = {
  state: {
    contacts: [
      {
        id: 1,
        name: "John",
        phone: "0947512845",
        email: "abc@gmail.com",
        description: "Description 1",
      },
      {
        id: 2,
        name: "Robert",
        phone: "0947512845",
        email: "abc@gmail.com",
        description: "Description 2",
      },
      {
        id: 3,
        name: "Alex",
        phone: "0947512845",
        email: "abc@gmail.com",
        description: "Description 3",
      },
    ],
    contactInfos: [
      {
        id: 1,
        name: "Phone",
        content: "1900 77 99 18",
      },
      {
        id: 2,
        name: "Email",
        content: "info@vtcode.vn",
      },
      {
        id: 3,
        name: "Address",
        content: "234 Ngô Tất Tố, phường 22, quận Bình Thạnh, Tp. Hồ Chí Minh",
      },
    ],
  },
  getters: {
    contacts: (state) => state.contacts,
    contactInfos: (state) => state.contactInfos,
  },
  mutations: {
    // CONTACT
    ADD_CONTACT(state, newContact) {
      newContact.id = idContact++;
      state.contacts.push(newContact);
    },
    EDIT_CONTACT(state, newContact) {
      state.contacts.map((item) => {
        if (item.id === newContact.id) {
          Object.assign(item, newContact);
        }
        return item;
      });
    },
    DELETE_CONTACT(state, newContact) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== newContact.id
      );
    },
    // CONTACT INFO
    // ADD_CONTACT(state, newContact) {
    //   newContact.id = idContact++;
    //   state.contacts.push(newContact);
    // },
    EDIT_CONTACT_INFO(state, newContactInfo) {
      state.contactInfos.map((item) => {
        if (item.id === newContactInfo.id) {
          Object.assign(item, newContactInfo);
        }
        return item;
      });
    },
    // DELETE_CONTACT(state, newContact) {
    //   state.contacts = state.contacts.filter(
    //     (contact) => contact.id !== newContact.id
    //   );
    // },
  },
  actions: {
    //CONTACT
    addContact({ commit }, newContact) {
      commit("ADD_CONTACT", newContact);
    },
    editContact({ commit }, newContact) {
      commit("EDIT_CONTACT", newContact);
    },
    deleteContact({ commit }, newContact) {
      commit("DELETE_CONTACT", newContact);
    },
    //CONTACT INFO
    // addContact({ commit }, newContact) {
    //   commit("ADD_CONTACT", newContact);
    // },
    editContactInfo({ commit }, newContactInfo) {
      commit("EDIT_CONTACT_INFO", newContactInfo);
    },
    // deleteContact({ commit }, newContact) {
    //   commit("DELETE_CONTACT", newContact);
    // },
  },
};
export default contactModule;
