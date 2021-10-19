import { ProxyState } from "../AppState.js"
import { gameService } from "../Services/GameService.js"


function _draw() {
  document.getElementById('health').innerText = ProxyState.enemy.hitPoints
}

export class GameController {
  constructor() {
    // when the 'enemy' property is changed, run the function _draw
    ProxyState.on('enemy', _draw)
    _draw()
  }
  slap() {
    gameService.slap()
  }
}