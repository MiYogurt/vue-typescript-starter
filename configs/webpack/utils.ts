import { curryN, concat } from 'ramda'
import { resolve } from 'path'

const getPath = curryN(3, resolve)(__dirname, '../..')

export { getPath }
