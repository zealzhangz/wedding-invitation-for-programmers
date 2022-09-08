 import wx from './common/jweixin-1.6.0.js'
 import axios from 'axios'

 const wxApi = {
     /**
      * [wxRegister 微信Api初始化]
      * @param {Function} callback [ready回调函数]
      */
     wxRegister(callback) {
         let data = {
             url: window.location.href
         };
         axios.get('https://springboot-ojdf-5653-4-1313699246.sh.run.tcloudbase.com/api/config', // 后台提供接口，获取 wx.config 对象内所需字段
         ).then((data) => {
             wx.config({
                 debug: true, // 开启调试模式
                 appId: data.data.appId, // 必填，公众号的唯一标识
                 timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                 nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                 signature: data.data.signature, // 必填，签名
                 jsApiList: [
                     'onMenuShareTimeline',
                     'onMenuShareAppMessage',
                 ]// 必填，需要使用的JS接口列表
             });
         }).catch((e) => {
             console.log(e);
         });
         wx.ready((res) => {
             // 如果需要定制ready回调方法
             if (callback) {
                 callback();
             };
         });
     },
     ShareTimeline(option) {
         wx.onMenuShareTimeline({
             title: option.title, // 分享标题
             link: option.link, // 分享链接
             imgUrl: option.imgUrl || '', // 分享图标
             success() {
                 option.success();
             },
             cancel() {
                 option.cancel();
             },
             error() {
                 option.error();
             }
         })
     },
     ShareAppMessage(option) {
         wx.onMenuShareAppMessage({
             title: option.title, // 分享标题
             desc: option.desc, // 分享描述
             link: option.link, // 分享链接
             imgUrl: option.imgUrl || '', // 分享图标
             success() {
                 option.success();
             },
             cancel() {
                 option.cancel();
             },
             error() {
                 option.error();
             }
         })
     }
 }

 export default wxApi
