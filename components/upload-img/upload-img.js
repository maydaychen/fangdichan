let util = require(`../../utils/util.js`);

var app = getApp();
Component({
  externalClasses: ['cover-class'],
  properties: {
    isPrev: {
      type: Boolean,
      value: false
    },
    imgList: Array,
    maxCount: {
      type: Number,
      value: 2
    }
  },
  data: {
    imgs: [],
    longPath: [],
    shortPath: []
  },
  methods: {
    /**
     * 添加图片
     */
    _addImg() {
      const D = this.data
      util.upload({
        count: D.imgs.length ? D.maxCount - D.imgs.length : D.maxCount,
        success: res => {
          let imgList = D.imgs
          console.log(res)
          imgList.push(app.globalData.baseUrl + res.url)

          this.setData({
            imgs: imgList,
            longPath: imgList,
            shortPath: imgList,
          });
          this.triggerEvent('imgs', D.imgs, {})
        },
        progress: p => {
          console.log(p)
        }
      })
    },
    /**
     * 删除已选图片
     */
    _deleteImg(e) {
      const idx = e.currentTarget.dataset.idx
      let {
        imgs,
        longPath,
        shortPath
      } = this.data

      imgs.splice(idx, 1)
      longPath.splice(idx, 1)
      shortPath.splice(idx, 1)

      this.setData({
        imgs,
        longPath,
        shortPath
      })
      this.triggerEvent('imgs', shortPath, {})
    },
    /**
     * 预览图片
     * 关闭预览图片时会触发父组件的onShow事件,请注意
     * e.g
     * 监听此组件派发的prevImg事件 bind:prevImg='onPrevImg'
     * 
     * let isPrevImg = false
     * Page({
     *   onShow(){
     *     if(isPrevImg){
     *       isPrevImg = false
     *       return
     *     }
     *     // do something
     *   },
     *   onPrevImg(){
     *     isPrevImg = true
     *     // do something
     *   }
     * })
     * 
     */
    _prevImg(e) {
      this.triggerEvent('prevImg', {}, {})
      const idx = e.currentTarget.dataset.idx
      const D = this.data
      let urls = D.imgs
      wx.previewImage({
        urls,
        current: urls[idx]
      })
    }
  }
})