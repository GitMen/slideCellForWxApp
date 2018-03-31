//index.js

Page({
  data: {
    dataArray: ["天王盖地虎", "宝塔镇河妖", "磨磨唧唧"],
    lastSlideSender: null
  },
  onLoad:function(){
    //选择组件对象
    
  },
  /**
   * cell绑定事件,删除触发
   */
  deleteAction: function (e) {
    //拿到角标
    var row = e.detail.row;
    wx.showToast({
      icon:'none',
      title: 'index='+row,
    })
  },
  /**
   * cell绑定事件,滑动触发
   */
  slideAction: function (e) {
    //拿到角标
    var row = e.detail.row;
    //获取角标cell
    var slideSender = this.selectComponent("#slideitem-" + row);
    //在data中定义lastSlideSender 属性,用户记录上一个打开的cell
    var lastSlideSender = this.data.lastSlideSender;
    //如果存在已经打开的cell则关闭
    if (lastSlideSender != null && lastSlideSender != slideSender) {
      lastSlideSender.restoreSalid();
    }
    this.setData({
      lastSlideSender: slideSender
    })
  }
  
})
