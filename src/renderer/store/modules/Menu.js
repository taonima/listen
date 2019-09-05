const state = {
  code: 1
};

const mutations = {
  SET_MENU (state, code) {
    state.code = code;
  }
};

const actions = {
  set_menu ({ commit }, code) {
    commit('SET_MENU', code);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
