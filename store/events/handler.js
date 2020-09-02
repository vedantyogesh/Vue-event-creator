import firebase from "firebase/app";
import "firebase/firestore";
import { firestoreExtract } from "@/assets/extract";

export default {
  state: () => ({
    event: null
  }),
  mutations: {
    setEvent: (state, payload) => {
      state.event = payload;
    }
  },
  actions: {
    getEvent: async ({ commit }, payload) => {
      commit("loading/pageLoading", true, { root: true });
      try {
        let data = await firebase
          .firestore()
          .collection("events")
          .where("key", "==", payload.key)
          .get();
        let id = data.docs[0].id;
        data = data.docs[0].data();
        data = { ...data, id };
        commit("setEvent", data);
        commit("loading/pageLoading", false, { root: true });
      } catch (err) {
        commit("loading/pageLoading", false, { root: true });
        commit("alerts/setError", "An error occured! Please try again later.", {
          root: true
        });
        console.log(err);
      }
    },
    eventAction: async ({ commit, getters }, payload) => {
      commit("loading/btnLoading", true, { root: true });
      try {
        let data = { ...getters.event, verified: payload };
        await firebase
          .firestore()
          .collection("events")
          .doc(getters.event.id)
          .update(data);
        commit("setEvent", data);
        commit("loading/btnLoading", false, { root: true });
      } catch (err) {
        commit("loading/btnLoading", false, { root: true });
        commit("alerts/setError", "An error occured! Please try again later.", {
          root: true
        });
        console.log(err);
      }
    }
  },
  getters: {
    event: state => {
      return state.event;
    }
  }
};
