import firebase from "firebase/app";
import "firebase/firestore";
import { firestoreExtract } from "@/assets/extract";

export default {
  state: () => ({
    events: null
  }),
  mutations: {
    setEvents: (state, payload) => {
      state.events = payload;
    }
  },
  actions: {
    getEvents: async ({ commit }, payload) => {
      commit("loading/pageLoading", true, { root: true });
      try {
        firebase
          .firestore()
          .collection("events")
          .onSnapshot(snap => {
            commit("setEvents", firestoreExtract(snap));
            commit("loading/pageLoading", false, { root: true });
          });
      } catch (err) {
        commit("loading/pageLoading", false, { root: true });
        commit("setError", "An error occured! Please try again later.");
        console.log(err);
      }
    }
  },
  getters: {
    events: state => {
      return state.events;
    }
  }
};
