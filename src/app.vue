<template>
  <div id="app">
    <router-link to="/">/</router-link>
    <router-link to="/hello">hello</router-link>
    <router-link to="/rx">rx</router-link>
    <router-link to="/cool">cool</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  name = 'done'
  initialEnthusiasm = 1
}
</script>
