const state = {
  content: '',
  songList: [],
  playingSong: {}
};

const mutations = {
  SET_CONTENT(state, data) {
    state.content = data;
  },
  SET_SONGLIST(state, data) {
    state.songList = data;
  },
  PUSH_SONGLIST(state, data) {
    state.songList = [
      ...state.songList,
      data
    ];
  },
  SET_PLAYINGSONG(state, data) {
    state.playingSong = data;
  }
};

const actions = {
  set_content({ commit }, data) {
    commit('SET_CONTENT', data);
  },
  clear_content({ commit }) {
    commit('SET_CONTENT', {});
  },
  set_songList({ commit }, data) {
    commit('SET_SONGLIST', data);
  },
  push_songList({ commit }, data) {
    commit('PUSH_SONGLIST', data);
  },
  del_songList({ commit, state }, data) {
    commit('SET_SONGLIST', state.songList.filter(i => i.id !== data));
  },
  clear_songList({ commit }) {
    commit('SET_SONGLIST', []);
  },
  set_playingSong({ commit }, data) {
    commit('SET_PLAYINGSONG', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
