import EventUtil from './base/eventUtil'
import Invite from './runtime/invite.js'
import Game from './runtime/game'
import Over from './runtime/over'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.invite= new Invite()
    this.game = new Game()
    this.over = new Over()

    //说明页
    let eventUtilInvite=new EventUtil(
      ((e)=>{this.invite.tap(e)}).bind(this)
    )

    //游戏中
    let eventUtilGame = new EventUtil(
      ((e) => {this.game.tap(e)}).bind(this)
    )

    //游戏结束
    let eventUtilOver = new EventUtil(
      ((e) => {this.over.tap(e)}).bind(this)
      )

    databus.reset()

    window.requestAnimationFrame(
      this.loop.bind(this)
    )
  }

  /**
   * 通关判定
   */
  checkGameOver() {
    if (databus.gameLevel == 10) {
      databus.gameStart=false
      databus.gameOver = true
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.invite.render(ctx)
    this.game.render(ctx)
    this.over.render(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    // 统计是否有动画正在播放
    let isAniPlaying = false

    // 如果没有动画正在播放，查看游戏是否结束
    if (!isAniPlaying) {
      this.checkGameOver()
    }
  }

  // 实现游戏帧循环
  loop() {
    this.update()
    this.render()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
  
}
