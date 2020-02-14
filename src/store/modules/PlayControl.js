const state = {
  songList: [],
  playingSong: {},
  playerOption: {
    paused: true,
    currentTime: 0,
    currentTimeStr: 0
  }
}

const mutations = {
  SET_SONGLIST (state, data) {
    state.songList = data
  },
  PUSH_SONGLIST (state, { position, data }) {
    switch (position) {
      case 'before':
        state.songList = [
          data,
          ...state.songList
        ]
        break
      default:
        state.songList = [
          ...state.songList,
          data
        ]
        break
    }
  },
  SET_PLAYINGSONG (state, data) {
    state.playingSong = data
  },
  SET_PLAYEROPTION (state, data) {
    state.playerOption = {
      ...state.playerOption,
      ...data
    }
  }
}

const actions = {
  set_songList ({ commit }, data) {
    commit('SET_SONGLIST', data)
  },
  push_songList ({ commit }, data) {
    commit('PUSH_SONGLIST', data)
  },
  del_songList ({ commit, state }, data) {
    commit('SET_SONGLIST', state.songList.filter(i => i.id !== data))
  },
  clear_songList ({ commit }) {
    commit('SET_SONGLIST', [])
  },
  set_playingSong ({ commit }, data) {
    commit('SET_PLAYINGSONG', data)
  },
  set_playerOption ({ commit }, data) {
    commit('SET_PLAYEROPTION', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
