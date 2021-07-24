<template>
  <div>
    <div class="row">
      <div class="col-lg-8">
        <section class="mb-2">
          <h5>{{ currentTodo.name }}</h5>
          <h5>{{ currentTodo.num }}</h5>
          {{ TargetIndex }}
          <div class="d-flex justify-content-center">
            <div class="sm-progress mr-1 rounded" style="width:33px; height: 12px; border: 1px solid #D6827B;" v-for="(item, index) in currentTodo.tomato" :key="index">
              <div class="sm-ptogress-content bg-primary h-100" :style="{width: `${item.width}%`}"></div>
            </div>
          </div>
        </section>
        <section class="clock_area">
          <div class="mb-0 clock_section" v-if="!timeToshowCongrat">
            <p class="clock_time mb-0">
              {{ TimeProgress }}
            </p>
            <div class="clock_option" :class="{'active':isPlay}">
              <font-awesome-icon :icon="['far', 'play-circle']" class="clock_play play_option" @click="startToCount"></font-awesome-icon>
              <font-awesome-icon :icon="['far', 'pause-circle']" class="clock_play pause_option" @click="stopToCount"></font-awesome-icon>
            </div>
          </div>
          <div class="mb-0 finished_slogan" v-else>
            <p class="mb-0">
              Well Done!
            </p>
            <small>
              Congratulation!
            </small>
          </div>
          <figure class="clock">
            <svg class="progress-ring" height="420" width="420">
              <defs>
                <linearGradient id="linear" x1="100%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%"   stop-color="#6CBBDA"/>
                  <stop offset="52%" stop-color="#C88AB3"/>
                  <stop offset="100%" stop-color="#E9827D"/>
                </linearGradient>
              </defs>
              <circle r="200" cx="210" cy="210" fill="transparent" stroke-width="15" stroke-dasharray="1256" stroke-dashoffset="0" :stroke="finishedBarShow"></circle>
              <circle r="200" cx="210" cy="210" fill="transparent" stroke-width="15" class="progress-ring__circle" :style="{ strokeDashoffset: percent }"></circle>
            </svg>
          </figure>
        </section>
      </div>
      <div class="col-lg-4">
        <div class="input-group mb-3 border-bottom">
          <input type="text" class="form-control border-0 bg-secondary pl-0 pb-0" placeholder="Add something new" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="newThing">
          <div class="input-group-append d-flex align-items-center text-center add_btn" @click="AddTodo">
            <font-awesome-icon class="text-primary" :icon="['fas', 'plus']" />
          </div>
        </div>
        <div>
          <h5 class="text-left font-weight-bold">Today’s to-do list</h5>
          <section>
            <ul class="list-group" v-for="(item, index) in TodoMission" :key="index">
             <li class="list-group-item p-0 text-left bg-secondary border-0 TodoItem d-flex align-items-center">
               <div class="d-flex justify-content-center align-items-center assign-btn mr-2" @click="assignTodo(item)">
                 <div></div>
               </div>
               {{ item.name }}
             </li>
            </ul>
          </section>
        </div>
        <div class="input-group mb-3 border-bottom">
          <input type="text" class="form-control border-0" placeholder="請輸入番茄鐘時間(分鐘)" aria-label="Recipient's username" aria-describedby="basic-addon2" @change="SettotalTime">
          <div class="input-group-append d-flex align-items-center text-center add_btn">
            <font-awesome-icon class="text-primary" :icon="['fas', 'plus']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {
      ProgressTotal: 0,
      newThing: '',
      currentTodo: {},
      TargetIndex: 0,
      timeToshowCongrat: false
    }
  },
  methods: {
    startToCount () {
      this.timeToshowCongrat = false
      this.$store.state.StopToCount = false
      this.$store.commit('CHANGE_ISPLAY', true)
      this.$store.dispatch('StartToCount')
    },
    SettotalTime (e) {
      if (e.target.value === '') {
        return
      }
      if (e.target.value <= 9) {
        localStorage.setItem('SettingTime', JSON.stringify('0' + e.target.value.toString() + ':00'))
        this.$store.state.RightNowTime = '0' + e.target.value.toString() + ':00'
      } else {
        localStorage.setItem('SettingTime', JSON.stringify(e.target.value.toString() + ':00'))
        this.$store.state.RightNowTime = e.target.value.toString() + ':00'
      }
    },
    stopToCount () {
      this.$store.commit('CHANGE_ISPLAY', false)
      this.$store.dispatch('StopToCount')
    },
    AddTodo () {
      if (this.newThing === '') {
        console.log('空任務')
        return
      }
      const name = this.newThing
      const tomato = []
      for (let i = 0; i < 2; i++) {
        tomato.push({ percent: 100, width: 0 })
      }
      this.$store.dispatch('AddTodo', { name, tomato })
    },
    assignTodo (item) {
      this.currentTodo = item
      let target = false
      this.currentTodo.tomato.forEach((item, index) => {
        if (!target && item.percent !== 100) {
          target = true
          this.TargetIndex = index
        }
      })
    }
  },
  computed: {
    TimeProgress () {
      return this.$store.state.RightNowTime
    },
    percent () {
      const offset = this.ProgressTotal - this.$store.state.Progresspercent * this.ProgressTotal
      return offset
    },
    isPlay () {
      return this.$store.state.isPlay
    },
    TodoMission () {
      return this.$store.state.Todolist
    },
    finishedBarShow () {
      if (this.timeToshowCongrat) {
        return 'url(#linear)'
      } else {
        return 'white'
      }
    }
  },
  mounted () {
    const circle = document.querySelector('.progress-ring__circle')
    const radius = circle.r.baseVal.value
    const circumference = radius * 2 * Math.PI
    circle.style.strokeDasharray = circumference
    this.ProgressTotal = circumference
  },
  watch: {
    percent () {
      const vm = this
      if (this.currentTodo.tomato) {
        this.currentTodo.tomato.forEach((item, index) => {
          if (index === this.TargetIndex) {
            item.width = this.$store.state.Progresspercent * 100
            if (item.width === 100) {
              this.TargetIndex++
              this.$store.state.Progresspercent = 0
              this.$store.commit('CHANGE_ISPLAY', false)
              this.$store.commit('StopToCount')
              if (this.TargetIndex === this.currentTodo.tomato.length) {
                vm.timeToshowCongrat = true
              }
              setTimeout(function () {
                vm.$store.dispatch('Reset')
                vm.$store.commit('RESET_ACCUMULATE_COUNTTIME')
              }, 500)
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .add_btn:hover {
    cursor: pointer;
  }
  .progress-ring__circle {
    transition: 0.5s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: #D6827B;
  }
  .clock_area {
    position: relative;
  }
  .clock_section {
    position: absolute;
    top: 25%;
    left: 17%;
  }
  .clock_time {
    font-size: 130px;
    color: #D6827B;
  }
  .clock_play {
    font-size: 50px;
    color: black;
  }
  .clock_play:hover {
    cursor:pointer;
  }
  .clock_option {
    position: relative;
    transform-style: preserve-3d;
    transition: all .5s;
  }
  .clock_option.active {
    transform: rotateY(180deg);
  }
  .play_option {
    position: absolute;
    left: 43%;
    backface-visibility: hidden;
  }
  .pause_option {
    position: absolute;
    left: 42%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }
  .TodoItem {
    font-size: 18px;
  }
  .assign-btn {
    cursor: pointer;
    height:20px;
    width:20px;
    border:1px solid black;
    border-radius: 50%;
    div {
       height:10px;
       width:10px;
       border-radius: 50%;
    }
  }
  .assign-btn:hover div {
    background-color: #D6827B;
  }
  .sm-ptogress-content {
    width: 0%;
  }
  .progress-bg {
    background-color: yellow;
  }
  .progress-finished {
    width: 100%;
  }
  .finished_slogan {
    position:absolute;
    top:35%;
    left: 18%;
    & > p {
      font-size: 60px;
      font-weight: 600;
      background: linear-gradient(270deg, #6CBBDA 0%, #C88AB3 52%, #E9827D 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    & > small {
      font-size: 14px;
      font-style: italic;
    }
  }
</style>
