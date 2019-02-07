import compile from './Rx.pug'
import { CreateElement, ComponentOptions } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
// import './Rx.styl';

import { map, startWith, scan } from 'rxjs/operators';

@Component<Vue>({
  name: 'RxC',
  style: require('./Rx.styl').toString(),
  template: compile,
  subscriptions(this: RxC) {
    const up$ = this.up$.pipe(map(R.always(1)))
    const down$ = this.down$.pipe(map(R.always(-1)))
    const count$ = Rx.merge(up$, down$).pipe(
      startWith(0),
      scan<number>(R.add)
    )
      
    return {
      count: count$
    }
  },
})
export default class RxC extends Vue {
  down$ = new Rx.Subject<any>()
  up$ = new Rx.Subject<any>()
  asyncData(){
    console.log("async Data")
  }

}

