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
          .doc(payload.id)
          .get();

        data = data.data();
        let id = payload.id;
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
    addFile: async ({ commit, dispatch }, payload) => {
      commit("loading/btnLoading", true, { root: true });
      try {
        let data = await firebase
          .firestore()
          .collection("events")
          .doc(payload.id)
          .get();
        console.log(data);
        data = data.data();
        console.log(data);

        if (payload.type == "file") {
          let files = [];
          if (data.files != undefined && data.files != null) {
            files = data.files;
          }
          files.push({
            name: payload.name,
            url: payload.url,
            date: payload.date
          });
          await firebase
            .firestore()
            .collection("events")
            .doc(payload.id)
            .update({ files: files });
          commit("loading/btnLoading", false, { root: true });
        }
        if (payload.type == "image") {
          let images = [];
          if (data.images != undefined && data.images != null) {
            images = data.images;
          }
          images.push({
            name: payload.name,
            url: payload.url,
            date: payload.date
          });
          await firebase
            .firestore()
            .collection("events")
            .doc(payload.id)
            .update({ images: images });
          commit("loading/btnLoading", false, { root: true });
        }
        dispatch("getEvent", { id: payload.id });
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
