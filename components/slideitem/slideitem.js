// components/slideitem/slideitem.js
Component({
  
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */ 
  properties: {
    itemColor: {
      type: String,
      value: '#fff'
    },
    cellHeight: {
      type: String,
      value: '120rpx'
    },
    row: {
      type: Number,
      value: 0
    },
    section: {
      type: Number,
      value: 0
    }   
  },

  /**
   * 组件的初始数据
   */
  data: {
    slideStyle: "left:0rpx",
    delBtnWidth: 180
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //------------------左滑删除逻辑-------------------

    touchS: function (e) {
      if (e.touches.length == 1) {
        this.setData({
          //设置触摸起始点水平方向位置
          startX: e.touches[0].clientX
        });
      }
    },

    touchM: function (e) {
      if (e.touches.length == 1) {
        //手指移动时水平方向位置
        var moveX = e.touches[0].clientX;
        //手指起始点位置与移动期间的差值
        var disX = this.data.startX - moveX;
        var delBtnWidth = this.data.delBtnWidth;
        var txtStyle = "";
        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0rpx";
        } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "rpx";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "rpx";
          }
        }
        this.setData({
          slideStyle: txtStyle
        })
      }
    },
    touchE: function (e) {
      if (e.changedTouches.length == 1) {
        //手指移动结束后水平位置
        var endX = e.changedTouches[0].clientX;
        //触摸开始与结束，手指移动的距离
        var disX = this.data.startX - endX;
        var delBtnWidth = this.data.delBtnWidth;
        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
        if (txtStyle != "left:0rpx"){
          this.triggerEvent('slideItemEvent', { row: this.data.row, section: this.data.section });
        }
        this.setData({
          slideStyle: txtStyle
        })
      }
    },
    //点击删除按钮事件
    delItem: function (e){
      this.setData({
        slideStyle: "left:0rpx"
      })
      this.triggerEvent('deleteItemEvent', { row: this.data.row, section: this.data.section});
    },
    restoreSalid: function () {
      this.setData({
        slideStyle: "left:0rpx"
      })
    },
    selectAction:function(){
      this.triggerEvent('selectItemEvent', { row: this.data.row, section: this.data.section });
    }
  }
})
