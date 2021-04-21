# 绿哥哥的小游戏

## 简介

user study

![screenshot](screenshot.jpg)

## 源码目录介绍

``` text
./js
├── base                                   // 定义游戏开发基础类
│   ├── button.js                          // 游戏内可点击图片类
│   └── eventUtil.js                       // 处理点击、滑动事件的类
├── libs
│   └── weapp-adapter.js                   // 小游戏适配器
├── models
├── runtime
│   ├── background.js                      // 背景
│   ├── invite.js                          // 开始菜单
│   ├── game.js                            // 游戏中按钮
│   └── over.js                            // 结束(通关)界面
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```
