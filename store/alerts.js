export default {
  state: () => ({
    error: null,
    notification: null
  }),
  mutations: {
    setError: (state, payload) => {
      state.error = payload;
    },
    clearError: state => {
      state.error = null;
    },
    setNotification: (state, payload) => {
      state.notification = payload;
    },
    clearNotification: state => {
      state.notification = null;
    }
  },
  actions: {
    setError: ({ commit }, payload) => {
      commit("setError", payload);
    },
    clearError: ({ commit }) => {
      commit("clearError");
    },
    setNotification: ({ commit }, payload) => {
      commit("setNotification", payload);
    },
    clearNotification: ({ commit }) => {
      commit("clearNotification");
    }
  },
  getters: {
    error: state => {
      return state.error;
    },
    notification: state => {
      return state.notification;
    }
  }
};
