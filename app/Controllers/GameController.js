import { ProxyState } from "../AppState.js"
import { gameService } from "../Services/GameService.js"


function _draw() {
  const enemy = ProxyState.activeEnemy
  document.getElementById('target').innerHTML = `
    <img class="img-fluid action rounded" loading="lazy" src="${enemy.imgUrl}"
    alt="slappy" onclick="app.gameController.slap()">
    <div class="mt-3 d-flex justify-content-between">
    <h3>${enemy.name}</h3>
    <h3>♥ <span id='health'>${enemy.hitPoints}</span></h3>
    </div>
  `
}

function _drawUpcomingEnemies() {
  const enemies = ProxyState.enemies
  let template = ''
  enemies.forEach(e => {
    template += `<li>${e.name}</li>`
  })

  document.getElementById('enemies').innerHTML = template
}

function _drawGameOver() {
  if (ProxyState.gameOver) {
    alert('You Have Survived Your Encounters.... until you fall asleep!!!')
  }
}

export class GameController {
  constructor() {
    // when the 'enemy' property is changed, run the function _draw
    ProxyState.on('activeEnemy', _draw)
    ProxyState.on('enemies', _drawUpcomingEnemies)
    ProxyState.on('gameOver', _drawGameOver)
    _draw()
  }

  slap() {
    gameService.slap()
  }

  createEnemy() {
    // event is what triggered this method(in this case submitt)
    window.event.preventDefault()
    console.log("Submitted")
    // JS-Docs : Creates Intellisense
    /**
     * @type {HTMLFormElement}
     */
    // @ts-ignore
    const formElem = window.event.target
    const targetData = {
      name: formElem.characterName.value,
      hitPoints: formElem.hitPoints.value,
      imgUrl: formElem.imgUrl.value
    }
    console.log(targetData)
    gameService.createEnemy(targetData)

    formElem.reset()
  }


}