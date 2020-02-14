const state = {
  account: {},
  bindings: [],
  profile: {},
  loginType: ''
}

const mutations = {
  SET_USER (state, data) {
    const { account, bindings, profile, loginType } = { ...data }
    state.account = account
    state.bindings = bindings
    state.profile = profile
    state.loginType = loginType
  }
}

const actions = {
  set_user ({ commit }, data) {
    commit('SET_USER', data)
  },
  clear_user ({ commit }) {
    commit('SET_USER', {
      account: {},
      bindings: [],
      profile: {},
      loginType: ''
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
