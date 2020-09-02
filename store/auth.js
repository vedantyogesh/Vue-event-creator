import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  state: () => ({
    user: null
  }),
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    login: async ({ commit }, payload) => {
      try {
        commit("loading/btnLoading", true, { root: true });

        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        const uid = user.user.uid;
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();
        if (doc.exists) commit("setUser", doc.data());
        else {
          await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set({ email: user.user.email });
          commit("setUser", { email: user.user.email });
        }
        $nuxt._router.push("/events");
        commit("alerts/setNotification", "Login successful.", { root: true });

        commit("loading/btnLoading", false, { root: true });
      } catch (err) {
        commit("loading/btnLoading", false, { root: true });
        commit("alerts/setError", err.message, {
          root: true
        });
        console.log(err);
      }
    },
    autoLogin: async ({ commit }) => {
      try {
        commit("loading/btnLoading", true, { root: true });

        const uid = firebase.auth().currentUser.uid;
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get();
        if (doc.exists) commit("setUser", doc.data());
        else {
          await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set({ email: user.user.email });
          commit("setUser", { email: user.user.email });
        }
        commit("alerts/setNotification", "Login successful.", { root: true });

        commit("loading/btnLoading", false, { root: true });
      } catch (err) {
        commit("loading/btnLoading", false, { root: true });
        commit("alerts/setError", err.message, {
          root: true
        });
        console.log(err);
      }
    },
    logout: async ({ commit }) => {
      try {
        commit("loading/btnLoading", true, { root: true });
        await firebase.auth().signOut();
        commit("setUser", null);
        commit("loading/btnLoading", false, { root: true });
      } catch (err) {
        commit("loading/btnLoading", false, { root: true });
        commit("alerts/setError", err.message, {
          root: true
        });
        console.log(err);
      }
    }
  },
  getters: {
    user: state => {
      return state.user;
    }
  }
};
