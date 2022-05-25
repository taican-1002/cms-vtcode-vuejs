import icool from "../../assets/img/partner/icool.png";
import fptShop from "../../assets/img/partner/logo-fptshop.png";
import cgv from "../../assets/img/partner/logo_cgv.png";
import galaxy from "../../assets/img/partner/galaxy-logo-mobile.png";
import heineken from "../../assets/img/partner/heineken-14-logo.png";
import vtco from "../../assets/img/partner/vtco.png";

var idPartner = 7;

const partnerModule = {
  state: {
    partners: [
      {
        id: 1,
        name: "Icool",
        logo: icool,
      },
      {
        id: 2,
        name: "FPT Shop",
        logo: fptShop,
      },
      {
        id: 3,
        name: "CGV",
        logo: cgv,
      },
      {
        id: 4,
        name: "Galaxy",
        logo: galaxy,
      },
      {
        id: 5,
        name: "Heineken",
        logo: heineken,
      },
      {
        id: 6,
        name: "VTCO",
        logo: vtco,
      },
    ],
  },
  getters: {
    partners: (state) => state.partners,
  },
  mutations: {
    // USER
    ADD_PARTNER(state, newPartner) {
      newPartner.id = idPartner++;
      state.partners.push(newPartner);
    },
    EDIT_PARTNER(state, newPartner) {
      state.partners.map((item) => {
        if (item.id === newPartner.id) {
          Object.assign(item, newPartner);
        }
        return item;
      });
    },
    DELETE_PARTNER(state, newPartner) {
      state.partners = state.partners.filter(
        (partner) => partner.id !== newPartner.id
      );
    },
  },
  actions: {
    // USER
    addPartner({ commit }, newPartner) {
      commit("ADD_PARTNER", newPartner);
    },
    editPartner({ commit }, newPartner) {
      commit("EDIT_PARTNER", newPartner);
    },
    deletePartner({ commit }, newPartner) {
      commit("DELETE_PARTNER", newPartner);
    },
  },
};
export default partnerModule;
