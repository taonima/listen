const state = {
  content: ''
};

const mutations = {
  SET_CONTENT(state, data) {
    state.content = data;
  }
};

const actions = {
  set_content({ commit }, data) {
    commit('SET_CONTENT', data);
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
