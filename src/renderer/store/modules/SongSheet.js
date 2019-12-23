const state = {
  content: {}
};

const mutations = {
  SET_CONTENT(state, data) {
    state.content = data;
  }
};

const actions = {
  set_content({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_CONTENT', data);
      return resolve();
    });
  },
  clear_content({ commit }) {
    commit('SET_CONTENT', {});
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
