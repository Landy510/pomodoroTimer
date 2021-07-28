import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    RightNowTime: JSON.parse(localStorage.getItem('SettingTime')) || '25:00',
    Todolist: JSON.parse(localStorage.getItem('Todo')) || [],
    TotalTime: 0,
    Progresspercent: 0,
    CountTime: 0,
    StopToCount: false,
    isPlay: false
  },
  actions: {
    StartToCount ({ commit, state }) {
      const wordNum = state.RightNowTime.indexOf(':', 0)
      const Minute = Number(state.RightNowTime.substr(0, wordNum)) * 60
      const Second = Number(state.RightNowTime.substr(wordNum + 1, state.RightNowTime.length))
      let MinAdd = false
      let SecAdd = false
      let TotalCountTime = Minute + Second
      const strIndex = JSON.parse(localStorage.getItem('SettingTime')).indexOf(':', 0)
      const TotalMinute = Number(JSON.parse(localStorage.getItem('SettingTime')).substr(0, strIndex)) * 60
      const TotalSecond = Number(JSON.parse(localStorage.getItem('SettingTime')).substr(strIndex + 1, JSON.parse(localStorage.getItem('SettingTime')).length))
      commit('SETTOTALTIME', TotalMinute + TotalSecond)
      const timeoutID = setInterval(function () {
        if (state.StopToCount) {
          if (SecAdd) {
            if (MinAdd) {
              const temp = '0' + parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
              commit('SETRIGHTTIME', temp)
            } else {
              const temp = parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
              commit('SETRIGHTTIME', temp)
            }
          } else {
            if (MinAdd) {
              const temp = '0' + parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
              commit('SETRIGHTTIME', temp)
            } else {
              const temp = parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
              commit('SETRIGHTTIME', temp)
            }
          }
          clearInterval(timeoutID)
          return
        }
        TotalCountTime = TotalCountTime - 1
        commit('ADDCOUNTTIME')
        commit('SETPROGRESSPERCENT', state.CountTime / state.TotalTime)
        if (TotalCountTime % 60 <= 9) SecAdd = true
        else SecAdd = false
        if (parseInt(TotalCountTime / 60) <= 9) MinAdd = true
        else MinAdd = false
        if (SecAdd) {
          if (MinAdd) {
            const temp = '0' + parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
            commit('SETRIGHTTIME', temp)
          } else {
            const temp = parseInt(TotalCountTime / 60).toString() + ':' + '0' + (TotalCountTime % 60).toString()
            commit('SETRIGHTTIME', temp)
          }
        } else {
          if (MinAdd) {
            const temp = '0' + parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
            commit('SETRIGHTTIME', temp)
          } else {
            const temp = parseInt(TotalCountTime / 60).toString() + ':' + (TotalCountTime % 60).toString()
            commit('SETRIGHTTIME', temp)
          }
        }
        if (TotalCountTime === 0) {
          commit('StopToCount')
        }
      }, 100)
    },
    StopToCount (context) {
      context.commit('StopToCount')
    },
    Reset (context) {
      context.commit('Reset')
    },
    AddTodo (context, { name, tomato }) {
      context.commit('AddTodo', { name, tomato })
    }
  },
  mutations: {
    SETTOTALTIME (state, toalTime) {
      state.TotalTime = toalTime
    },
    SETRIGHTTIME (state, rightTime) {
      state.RightNowTime = rightTime
    },
    ADDCOUNTTIME (state) {
      state.CountTime++
    },
    SETPROGRESSPERCENT (state, percent) {
      state.Progresspercent = percent
    },
    StopToCount (state) {
      state.StopToCount = true
    },
    CHANGE_ISPLAY (state, flag) {
      state.isPlay = flag
    },
    RESET_ACCUMULATE_COUNTTIME (state) {
      state.CountTime = 0
    },
    Reset (state) {
      let MinAdd = false
      let SecAdd = false
      const strIndex = JSON.parse(localStorage.getItem('SettingTime')).indexOf(':', 0)
      const TotalMinute = Number(JSON.parse(localStorage.getItem('SettingTime')).substr(0, strIndex)) * 60
      const TotalSecond = Number(JSON.parse(localStorage.getItem('SettingTime')).substr(strIndex + 1, JSON.parse(localStorage.getItem('SettingTime')).length))
      state.TotalTime = TotalMinute + TotalSecond
      if (state.TotalTime % 60 <= 9) SecAdd = true
      else SecAdd = false
      if (parseInt(state.TotalTime / 60) <= 9) MinAdd = true
      else MinAdd = false
      console.log('判別', MinAdd, SecAdd)
      state.RightNowTime = '0' + parseInt(state.TotalTime / 60).toString() + ':' + '0' + (state.TotalTime % 60).toString()
      console.log('終止時間', TotalMinute, TotalSecond, state.RightNowTime)
    },
    AddTodo (state, payload) {
      state.Todolist.push(payload)
      localStorage.setItem('Todo', JSON.stringify(state.Todolist))
    }
  }
})
