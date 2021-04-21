import DataBus from '../databus'
import Button from '../base/button'

let databus = new DataBus()

//wx.cloud.init()
//const db = wx.cloud.database()

//背景
const BG_SRC = 'images/invite/invite.png'



export default class Invite {
  constructor() {
    //背景
    this.bg = new Image()
    this.bg.src = BG_SRC

    //用户登录
    //this.login()
  }

  login() {
    db.collection('rubbish').add({
      data: {
        //通过写入“rubbish”数据库获取用户ID
      },
      success: res => {
        var openid = res._openid
        //查询01userInfo是否已经存在该用户
        db.collection('01userInfo').where(
          { _openid: openid }).get({
            success: res => {
              if (res.data.length != 0) {
                //wx.showToast({
                //  icon: 'none',
                // title: '用户已存在'
                //})
                databus.id = res.data[0]._id
                databus.openid = res.data[0]._openid
                databus.marked = res.data[0].marked
                databus.start = res.data[0].start
                databus.number = (databus.start + databus.marked) % 200 + 201
                //console.log(databus.openid)
              }
              else {
                //随机一个起始数start
                let ranStart = Math.floor(Math.random() * 200)
                //console.log(ranStart)
                //首次使用，写入数据库
                db.collection('01userInfo').add({
                  data: {
                    start: ranStart,
                    marked: 0
                  },
                  success: res => {
                    //wx.showToast({
                    //  icon: 'none',
                    //  title: '写入数据库成功'
                    //})
                    databus.marked = 0
                    databus.start = ranStart
                    databus.number = (ranStart) % 200 + 201
                    //console.log(res)

                    databus.id = res.data[0]._id
                    databus.openid = res.data[0]._openid
                  }
                })
              }
            },
            fail: err => {
              //wx.showToast({
              //  icon: 'none',
              //  title: '查询数据库失败'
              //})
            }
          })
      },
      fail: err => {
        //wx.showToast({
        //  icon: 'none',
        //  title: '写入rubbish失败'
        //})
      }
    })

  }

  //触发按键事件
  tap(event) {
    if (databus.invite) {
      return this.tapInvite(event)
    }
  }

  tapInvite(event) {
      databus.invite = false
      databus.gameStart = true
  }

  //绘制
  render(ctx) {
    if (databus.invite) {
      return this.renderInvite(ctx)
    }
  }

  //绘制邀请评分页
  renderInvite(ctx) {
    //背景
    ctx.drawImage(
      this.bg,
      0,
      0,
      databus.screenWidth,
      databus.screenHeight
    )

    //绘制半透明背景
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, databus.screenWidth, databus.screenHeight);
    ctx.globalAlpha = 1

    //绘制说明
    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    var str = "  这是一款拼手速的小游戏，以观察判断、快速点击为游戏操作循环。"
    var lineWidth = databus.contentPadding
    var lineHeight = databus.contentPaddingTop + databus.screenHeight / 14
    for (let i = 0; i < str.length; i++) {
      //console.log(lineWidth)
      if (lineWidth > databus.contentWidth) {
        lineWidth = databus.contentPadding
        lineHeight += 22
      }
      ctx.fillText(str[i], lineWidth, lineHeight)
      lineWidth += 22
    }

    str = "  游戏基本玩法："
    lineWidth = databus.contentPadding
    lineHeight += 50
    for (let i = 0; i < str.length; i++) {
      //console.log(lineWidth)
      if (lineWidth > databus.contentWidth) {
        lineWidth = databus.contentPadding
        lineHeight += 22
      }
      ctx.fillText(str[i], lineWidth, lineHeight)
      lineWidth += 22
    }

    str = "  1、定时关卡游戏，每个关卡20s，一共9个关卡（城市），游戏时间共计20*9=180s；"
    lineWidth = databus.contentPadding
    lineHeight += 25
    for (let i = 0; i < str.length; i++) {
      //console.log(lineWidth)
      if (lineWidth > databus.contentWidth) {
        lineWidth = databus.contentPadding
        lineHeight += 22
      }
      ctx.fillText(str[i], lineWidth, lineHeight)
      lineWidth += 22
    }

    str = "  2、每个城市关卡，模特卫莱会摆3-12个pose，在20秒的时间内你必须根据游戏提供的正确姿势，在不断变化的姿势中点击屏幕抓拍到正确的姿势。"
    lineWidth = databus.contentPadding
    lineHeight += 25
    for (let i = 0; i < str.length; i++) {
      //console.log(lineWidth)
      if (lineWidth > databus.contentWidth) {
        lineWidth = databus.contentPadding
        lineHeight += 22
      }
      ctx.fillText(str[i], lineWidth, lineHeight)
      lineWidth += 22
    }

    str = " （点击任意位置开始游戏）"
    lineWidth = databus.contentPadding
    lineHeight += 50
    for (let i = 0; i < str.length; i++) {
      //console.log(lineWidth)
      if (lineWidth > databus.contentWidth) {
        lineWidth = databus.contentPadding
        lineHeight += 22
      }
      ctx.fillText(str[i], lineWidth, lineHeight)
      lineWidth += 22
    }
  }

}