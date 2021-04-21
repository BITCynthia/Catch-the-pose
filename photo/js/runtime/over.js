import DataBus from '../databus'
import Button from '../base/button'

let databus = new DataBus()


export default class Over {
  constructor() {
    //背景
    this.BG_IMG = 'images/gameover/gameover.png'
    this.bg = new Image()
    this.bg.src = this.BG_IMG
  }

  tap(event) {
  }

  //游戏结束
  tapGameOver(event) {
  }

  //绘制通关界面
  render(ctx) {
    if (databus.gameOver) {
      return this.renderGameOver(ctx)
    }
  }

  //绘制游戏通关的界面
  renderGameOver(ctx) {
    ctx.drawImage(
      this.bg,
      0,
      0,
      databus.screenWidth,
      databus.screenHeight
    )
  }

}