const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const contentWidth = window.innerWidth * 0.85
const contentHeight = window.innerHeight * 0.85

let instance

/**
 * 全局状态管理器
 * 
 * @export
 * @class DataBus
 */
export default class DataBus {
  constructor() {
    if (instance) {
      return instance
    }

    instance = this

    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.contentWidth = contentWidth
    this.contentHeight = contentHeight
    this.contentPadding = (this.screenWidth - this.contentWidth) / 2
    this.contentPaddingTop = (this.screenHeight - this.contentHeight) / 2;

    this.id
    this.openid
    this.start
    this.marked
    this.number

    this.reset()
  }

  /**
   * 重启游戏，重制数据
   * 
   * @memberof DataBus
   */
  reset() {
    this.invite = true
    this.gameStart = false        //true则开始评分
    this.action=false             //解决bug
    this.gameLevel = 1            //当前评分第几张图
    this.gameOver = false         //一轮评分结束
  }


  /**
   * 返回当前的游戏时间
   * 
   * @returns 
   * @memberof DataBus
   */
  getCurrentTime() {
    let time = Math.floor((Date.now() - this.startTime) / 1000);
    let minute = Math.floor(time / 60)
    if (minute < 10) {
      minute = '0' + minute
    }
    let second = Math.floor(time % 60)
    if (second < 10) {
      second = '0' + second
    }
    return minute + ':' + second
  }
}