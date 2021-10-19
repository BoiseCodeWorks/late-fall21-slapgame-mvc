import { Target } from "./Models/Target.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value.js').Value[]} */
  values = []
  // creates intellisense that the enemy property is type Target
  /** @type {Target} */
  enemy = new Target('Slappy', 83, 'https://i.ytimg.com/vi/vQ7F1Zj7KJE/maxresdefault.jpg')
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
