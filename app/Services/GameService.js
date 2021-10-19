import { ProxyState } from "../AppState.js"

class GameService {
  slap() {
    ProxyState.enemy.hitPoints--
    console.log(ProxyState.enemy.hitPoints)
    // trigger the .on
    ProxyState.enemy = ProxyState.enemy
  }

}
// NOTE this is a use of the 'singleton' pattern
// where the instance is exported not the class definition
export const gameService = new GameService()