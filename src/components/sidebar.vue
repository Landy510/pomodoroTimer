<template>
  <aside>
    <div>
      <ul class="list-group">
        <li class="list-group-item text-left p-0 border-0 bg-secondary">
          <router-link class="nav-link font-weight-bold font-medium pl-1" to="/Todo">
            <font-awesome-icon class="mr-3" :icon="['far', 'list-alt']"/><span :class="{'NotClockPage':progress, 'isClockPage':!progress}">To-do list</span>
          </router-link>
        </li>
        <li class="list-group-item text-left p-0 border-0 bg-secondary">
          <router-link class="nav-link font-weight-bold font-medium pl-1" to="/Analytics">
            <font-awesome-icon class="mr-3" :icon="['fas', 'chart-bar']" /> <span :class="{'NotClockPage':progress, 'isClockPage':!progress}">Analytics</span>
          </router-link>
        </li>
        <li class="list-group-item text-left p-0 border-0 bg-secondary">
          <router-link class="nav-link font-weight-bold font-medium pl-1" to="/Rings">
            <font-awesome-icon class="mr-3" :icon="['fas', 'music']" /> <span :class="{'NotClockPage':progress, 'isClockPage':!progress}">Rings</span>
          </router-link>
        </li>
        <li class="list-group-item text-left p-0 border-0 bg-secondary" :class="{'NotClockPage':progress, 'isClockPage':!progress}">
          <router-link class="nav-link font-weight-bold font-medium pl-1" to="/">
            <font-awesome-icon class="mr-3" :icon="['far', 'clock']" /> <span>Back to Clock</span>
          </router-link>
        </li>
      </ul>
      <p class="font-medium" style="writing-mode: vertical-rl; margin-left:0;">
        Pomodoro
      </p>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {

    }
  },
  computed: {
    progress () {
      if (this.$route.path === '/') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .router-link-exact-active {
    color: #D6827B;
  }
  .NotClockPage {
    opacity: 0;
    transform: translateX(-200px);
    transition: all .5s;
  }
  .isClockPage {
    opacity: 1;
    transform: translateX(0px);
    transition: all .5s;
  }
</style>
