// component/navigate/navigate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url:{
      type:String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goUrl:function(){
      console.log(this.data.url)
      wx.navigateTo({
        url: this.data.url,
      })
    }
  }
})
