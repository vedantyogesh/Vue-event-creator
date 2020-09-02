export default {
  state: () => ({
    btnLoading: null,
    pageLoading: null
  }),
  mutations: {
    btnLoading: (state, payload) => {
      state.btnLoading = payload;
    },
    pageLoading: (state, payload) => {
      state.pageLoading = payload;
    }
  },
  actions: {
    btnLoading: ({ commit }, payload) => {
      commit("btnLoading", payload);
    },
    pageLoading: ({ commit }, payload) => {
      commit("pageLoading", payload);
    }
  },
  getters: {
    btnLoading: state => {
      return state.btnLoading;
    },
    pageLoading: state => {
      return state.pageLoading;
    }
  }
};
