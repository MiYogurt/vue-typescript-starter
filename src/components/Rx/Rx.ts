import compile from './Rx.pug'
import { CreateElement, ComponentOptions } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { add, always } from 'ramda'
import { Observable, Subject } from 'rxjs'
import './Rx.styl';

@Component({
  name: 'rx',
  // style: require('./Rx.styl').toString(),
  template: compile(),
  subscriptions(this: Rx) {
    const up$ = this.up$.map(always(1))
    const down$ = this.down$.map(always(-1))
    const count$ = Observable.merge(up$, down$)
      .startWith(0)
      .scan(add)
    return {
      count: count$
    }
  }
})
export default class Rx extends Vue {
  down$ = new Subject<any>()
  up$ = new Subject<any>()
  asyncData(){
    
  }
}
