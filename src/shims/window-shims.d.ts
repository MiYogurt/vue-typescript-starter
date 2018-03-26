import { Store } from 'vuex'
import Vue , { Component } from 'vue';

declare global {
  interface Window {
    readonly __INITIAL_STATE__: any
  }

  interface NodeRequire {
    ensure: any
  }
}
