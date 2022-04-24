import VueCookies from 'vue-cookies'

export const user = {
  namespaced: true,
  state() {
    return {
      userInfo: {}
    }
  },
  getters: {
    isLogin(state) {
      if (VueCookies.get('userInfo')) {
        // 유저정보 세션 남아있는 상태
        return true
      } else {
        // 유저정보 세션 날라간 상태
        return false
      }
    },
    userInfo(state) {
      const userInfo = VueCookies.get('userInfo')
      if (userInfo) {
        return userInfo
      } else {
        return null
      }
    }
  },
  mutations: {
    setUser(state, userInfo) {
      state.userInfo = userInfo
      VueCookies.set('userInfo', userInfo, '1h')
    },
    logout(state) {
      state.userInfo = {}
      VueCookies.remove('userInfo')
    }
  },
  actions: {}
}
