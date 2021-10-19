import { ProxyState } from "../AppState.js"
import { Target } from "../Models/Target.js"

class GameService {
  createEnemy(targetData) {
    // convert raw data (POJO) into actual data (Target)
    let target = new Target(targetData.name, targetData.hitPoints, targetData.imgUrl)
    // create new array of all current enemies and add the new one at the end
    // the = triggers any listeners
    ProxyState.enemies = [...ProxyState.enemies, target]
    console.log(ProxyState.enemies)
  }
  slap() {
    const target = ProxyState.activeEnemy
    target.hitPoints -= Math.floor(Math.random() * 10)
    if (target.hitPoints < 0) {

      // do something
      target.hitPoints = 0
      if (ProxyState.enemies.length > 0) {
        ProxyState.activeEnemy = ProxyState.enemies.shift()
        // Array methods do not trigger the listener, you manually set it to itself to trigger
        ProxyState.enemies = ProxyState.enemies
        return
      } else {
        ProxyState.gameOver = true
      }
    }

    console.log(target.hitPoints)
    // trigger the .on for 'activeEnemy' kindof "saving" the changes
    ProxyState.activeEnemy = target
  }

}
// NOTE this is a use of the 'singleton' pattern
// where the instance is exported not the class definition
export const gameService = new GameService()