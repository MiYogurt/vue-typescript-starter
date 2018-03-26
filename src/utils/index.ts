import * as R from 'ramda'

interface exist {
  (path: Array<any>) : (...args: Array<any>) => Promise<void>
}

export function findAsyncDataFunction(object: any) {
  const method = 'asyncData'

  const exist: exist = R.path((R as any).__, object)
  const map = [
    ['asyncData'],
    ['options', 'asyncData'],
    ['options', 'methods', 'asyncData'],
    ['$options', 'asyncData']
  ]

  for (const path of map) {
    const asyncData = exist(path)
    if (asyncData) {
      return asyncData
    }
  }
  return null
}