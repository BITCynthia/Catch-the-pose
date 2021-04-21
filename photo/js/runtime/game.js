import DataBus from '../databus'
import Button from '../base/button'

let databus = new DataBus()

//wx.cloud.init()
//const db = wx.cloud.database()

const THREE_SRC = 'images/gaming/No3.png'
const TWO_SRC = 'images/gaming/No2.png'
const ONE_SRC = 'images/gaming/No1.png'
const COUNTER_WIDTH = 51
const COUNTER_HEIGHT = 281

let POSE_SRC = 'images/gaming/targets/Sketch1.png'
const POSE_WIDTH = 2480
const POSE_HEIGHT = 3508

const POSES_WIDTH = 710
const POSES_HEIGHT = 1440

const CAMERA_UNtapping = 'images/gaming/untapping.png'
const CAMERA_tapping = 'images/gaming/tapping.png'
const CAMERA_WIDTH = 300
const CAMERA_HEIGHT = 300


const shot = [
  [4, 1, 3, 2, 3, 4, 1, 4, 3, 2, 3, 1, 2, 1, 4, 3, 2, 1],
  [4, 5, 3, 1, 2, 1, 4, 5, 3, 2, 2, 3, 5, 1, 4, 3, 5, 2, 4, 1],
  [4, 5, 3, 1, 2, 6, 1, 4, 5, 3, 2, 6, 2, 1, 3, 6, 5, 4, 1, 5, 4, 6, 2, 3],
  [4, 5, 3, 1, 2, 6, 7, 1, 4, 5, 3, 7, 2, 6, 7, 3, 1, 6, 2, 5, 4, 5, 2, 3, 1, 6, 7, 4],
  [3, 1, 2, 8, 4, 5, 6, 7, 1, 8, 4, 5, 3, 7, 2, 6, 3, 7, 1, 8, 4, 5, 2, 6, 1, 8, 4, 3, 7, 5, 2, 6],
  [8, 9, 4, 5, 3, 1, 2, 6, 7, 1, 8, 4, 5, 3, 7, 2, 6, 9, 6, 7, 1, 8, 9, 4, 5, 3, 1, 2, 6, 7, 1, 8, 9, 4, 5, 6, 7, 1, 8, 9, 3, 1, 2],
  [8, 9, 10, 4, 5, 3, 1, 2, 6, 7, 1, 8, 4, 5, 3, 7, 2, 6, 9, 10, 3, 6, 9, 10, 7, 2, 1, 8, 4, 5, 3, 6, 9, 10, 7, 2, 1, 8, 4, 5],
  [8, 9, 10, 4, 5, 11, 3, 1, 2, 6, 7, 1, 11, 8, 4, 5, 3, 7, 2, 6, 9, 10, 11, 3, 8, 9, 10, 4, 5, 1, 2, 6, 7],
  [8, 9, 10, 4, 5, 12, 11, 3, 1, 2, 6, 7, 1, 12, 11, 8, 4, 5, 3, 7, 2, 6, 9, 10]

]

export default class Game {
  constructor() {
    //背景
    this.BG_IMG = 'images/gaming/backgrounds/BG1.jpg'
    this.bg = new Image()
    this.bg.src = this.BG_IMG

    //记忆时间模糊背景
    this.BLURBG_IMG = 'images/gaming/targets/blurBG.png'
    this.blbg = new Image()
    this.blbg.src = this.BLURBG_IMG

    //倒计时
    let btnRatio = (databus.screenWidth * 0.06) / COUNTER_WIDTH
    this.three = new Button(
      THREE_SRC,
      (databus.screenWidth - btnRatio * COUNTER_WIDTH) * 0.5,
      (databus.screenHeight - btnRatio * COUNTER_HEIGHT) * 0.65,
      btnRatio * COUNTER_WIDTH,
      btnRatio * COUNTER_HEIGHT
    )
    this.two = new Button(
      TWO_SRC,
      (databus.screenWidth - btnRatio * COUNTER_WIDTH) * 0.5,
      (databus.screenHeight - btnRatio * COUNTER_HEIGHT) * 0.65,
      btnRatio * COUNTER_WIDTH,
      btnRatio * COUNTER_HEIGHT
    )
    this.one = new Button(
      ONE_SRC,
      (databus.screenWidth - btnRatio * COUNTER_WIDTH) * 0.5,
      (databus.screenHeight - btnRatio * COUNTER_HEIGHT) * 0.65,
      btnRatio * COUNTER_WIDTH,
      btnRatio * COUNTER_HEIGHT
    )

    //目标姿势
    btnRatio = (databus.screenWidth * 0.45) / POSE_WIDTH
    this.btnTarget = new Button(
      POSE_SRC,
      (databus.screenWidth - btnRatio * POSE_WIDTH) * 0.45,
      (databus.screenHeight - btnRatio * POSE_HEIGHT) * 0.2,
      btnRatio * POSE_WIDTH,
      btnRatio * POSE_HEIGHT
    )
    //备选姿势
    this.pic = new Image()

    //照相机
    btnRatio = (databus.screenWidth * 0.25) / CAMERA_WIDTH
    this.btnCameraUN = new Button(
      CAMERA_UNtapping,
      (databus.screenWidth - btnRatio * CAMERA_WIDTH) / 2,
      (databus.screenHeight - btnRatio * CAMERA_HEIGHT) * 0.9,
      btnRatio * CAMERA_WIDTH,
      btnRatio * CAMERA_HEIGHT
    )
    this.btnCamera = new Button(
      CAMERA_tapping,
      (databus.screenWidth - btnRatio * CAMERA_WIDTH) / 2,
      (databus.screenHeight - btnRatio * CAMERA_HEIGHT) * 0.9,
      btnRatio * CAMERA_WIDTH,
      btnRatio * CAMERA_HEIGHT
    )

    this.tapping = false

    //this.numbers = [4, 5, 6, 7, 8, 9, 10, 11, 12]
    this.numbers = [18, 20, 24, 28, 32, 43, 40, 34, 24]
    this.anss = [3, 5, 6, 4, 8, 9, 10, 11, 12]
    this.frequencys = [2, 2, 2, 2, 2, 2, 3, 3, 4]
    this.lasts = [2, 1.8, 1.6, 1.4, 1.2, 1, 0.8, 0.6, 0.4]
    this.indexhead = Math.floor(Math.random() * 12)
    //console.log("indexhead",this.indexhead)

  }

  tap(event) {
    if (databus.gameStart) {
      if (databus.action == false) {
        databus.action = true
        this.time = Date.now() / 1000
        console.log(this.time)
        this.number = this.numbers[databus.gameLevel - 1]
        this.ans = this.anss[databus.gameLevel - 1]
        this.frequency = this.frequencys[databus.gameLevel - 1]
        this.last = this.lasts[databus.gameLevel - 1]
        console.log(this.number, this.ans, this.frequency, this.last)
      }

      return this.tapGamePlaying(event)
    }
  }

  tapGamePlaying(event) {
    if (this.btnCameraUN.isTapped(event.x, event.y) || this.btnCamera.isTapped(event.x, event.y)) {
      this.tapping = true
      console.log(this.ans, this.i)
      if (this.ans == this.i) {
        databus.gameLevel++
        this.time = Date.now() / 1000
        console.log(this.time)
        this.number = this.numbers[databus.gameLevel - 1]
        this.ans = this.anss[databus.gameLevel - 1]
        this.frequency = this.frequencys[databus.gameLevel - 1]
        this.last = this.lasts[databus.gameLevel - 1]
        console.log(this.number, this.ans, this.frequency, this.last)

      }
      else {
        databus.gameLevel = 10
      }
    }

  }

  //绘制
  render(ctx) {
    if (databus.gameStart) {
      return this.renderGamePlaying(ctx)
    }
  }


  //绘制游戏中的界面
  renderGamePlaying(ctx) {
    //绘制背景
    this.BG_IMG = 'images/gaming/backgrounds/BG' + databus.gameLevel + '.jpg'
    this.bg.src = this.BG_IMG
    ctx.drawImage(
      this.bg,
      0,
      0,
      databus.screenWidth,
      databus.screenHeight
    )

    //绘制标题
    ctx.fillStyle = "#50F0F0"
    ctx.font = "bold 27px arial"
    ctx.fillText(
      'Level ' + databus.gameLevel,
      databus.contentPadding + databus.screenWidth * 0.3,
      databus.contentPaddingTop + databus.screenHeight / 50,
    )

    //绘制相机
    if (this.tapping == true) {
      this.btnCamera.render(ctx)
    }
    else {
      this.btnCameraUN.render(ctx)
    }

    if (Date.now() / 1000 < this.time + 3) {
      //绘制模糊背景
      ctx.drawImage(
        this.blbg,
        0,
        0,
        databus.screenWidth,
        databus.screenHeight * 0.8
      )

      //绘制目标姿势
      btnRatio = (databus.screenWidth * 0.45) / POSE_WIDTH
      POSE_SRC = 'images/gaming/targets/Sketch' + databus.gameLevel + '.png'
      this.btnTarget = new Button(
        POSE_SRC,
        (databus.screenWidth - btnRatio * POSE_WIDTH) * 0.45,
        (databus.screenHeight - btnRatio * POSE_HEIGHT) * 0.2,
        btnRatio * POSE_WIDTH,
        btnRatio * POSE_HEIGHT
      )
      this.btnTarget.render(ctx)

      //绘制倒计时
      if (Date.now() / 1000 < this.time + 1) {
        this.three.render(ctx)
      }
      else if (Date.now() / 1000 < this.time + 2) {
        this.two.render(ctx)
      }
      else {
        this.one.render(ctx)
      }
    }
    else {
      //目标小化姿势
      ctx.drawImage(
        this.blbg,
        databus.screenWidth * 0.25,
        databus.screenHeight * 0.09,
        databus.screenWidth * 0.42,
        databus.screenHeight * 0.4
      )
      var btnRatio = (databus.screenWidth * 0.2) / POSE_WIDTH
      this.btnTarget = new Button(
        POSE_SRC,
        (databus.screenWidth - btnRatio * POSE_WIDTH) * 0.45,
        (databus.screenHeight - btnRatio * POSE_HEIGHT) * 0.2,
        btnRatio * POSE_WIDTH,
        btnRatio * POSE_HEIGHT
      )
      this.btnTarget.render(ctx)

      //超时
      if (Date.now() / 1000 > this.time + 23) {
        databus.gameLevel = 10
      }
      else {
        //闪现答案们
        var index = (Math.floor((Date.now() / 1000 - (this.time + 3)) / this.last) + this.indexhead) % this.number
        //console.log("index", index)
        this.i = shot[databus.gameLevel - 1][index]
        console.log(this.i)
        this.pic.src = 'images/gaming/poses/' + '/P' + this.i + '.png'
        var btnRatio = (databus.screenWidth * 0.45) / POSES_WIDTH
        ctx.drawImage(
          this.pic,
          (databus.screenWidth - btnRatio * POSES_WIDTH) * 0.5,
          (databus.screenHeight - btnRatio * POSES_HEIGHT) * 0.55,
          btnRatio * POSES_WIDTH,
          btnRatio * POSES_HEIGHT
        )

      }

    }

  }
  
}