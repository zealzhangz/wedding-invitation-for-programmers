<template>
    <div class="wedding-invitation" :class="{ 'invitation-bounce':canOpen }">
        <div class="invitation-container" :class="{ 'invitation-down':isOpening }">
            <div class="invitation-cover">
                <div class="cover-content" :class="{'invitation-up':isOpening}">
                    <div class="content-inside">
                        <img class="content-inside-photo" src="../images/wedding.jpeg">
                        <p>我们结婚啦！</p>
                        <p><b>张奥 & 胡芮</b></p>
                        <p>婚庆时间：2022年9月24日15点整</p>
                        <p>婚庆地点：云南省玉溪市江川区澄川线31公里处<b>柏田庄园</b></p>
                        <p>晚宴时间：2022年9月24日17点30分</p>
                        <p>婚庆地点：云南省玉溪市江川区宁海路36号<b>江川宾馆</b></p>
                        <div class="content-inside-bless">
                            <input
                                    placeholder="写下你的祝福"
                                    @keyup.enter="sendBarrage"
                                    @focus="isFocused = true"
                                    @blur="isFocused = false, hasEntered = false"
                                    v-model="wish"
                                    ref="wishInput"
                            >
                            <p v-if="!wish && isFocused && hasEntered">请输入祝福哦</p>
                            <div>
                                <button @click="sendBarrage">发送祝福弹幕</button>
                                <button @click="closeInvitation">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cover-inside-left" :class="{'opening':isOpening}"></div>
                <div class="cover-inside-right" :class="{'opening':isOpening}"></div>
                <img class="cover-inside-seal" src="../images/seal.png" @click="openInvitation"
                     :class="{'invitation-flight':isOpening}">
            </div>
        </div>
    </div>
</template>

<script>
    // import wxapi from "@/wxsdk";
    import axios from 'axios'

    export default {
        props: ['canOpen'],
        data() {
            return {
                isOpening: false,
                wish: '',
                isFocused: false,
                hasEntered: false
            }
        },
        mounted() {
            // wxapi.wxRegister(this.wxRegCallback());
            /**
             const headers = {
      "Content-Type": "application/json",
    };
             const url = "https://springboot-ojdf-5653-4-1313699246.sh.run.tcloudbase.com/api/config";
             axios.get(url, { headers:{ 'Content-Type': 'application/json;charset=UTF-8' }}
             ).then((data) => {
      wx.config({
        debug: false, // 开启调试模式
        appId: data.data.data.appId, // 必填，公众号的唯一标识
        timestamp: data.data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.data.data.nonceStr, // 必填，生成签名的随机串
        signature: data.data.data.signature, // 必填，签名
        jsApiList: [
          'onMenuShareAppMessage', //旧的接口，即将废弃
          'onMenuShareTimeline' //旧的接口，即将废弃
        ]
      });
      wx.ready(function(){
        // 分享给好友
        wx.onMenuShareAppMessage({
          title: '张奥和胡芮的婚礼', // 分享标题
          desc: '张奥和胡芮的婚礼', // 分享描述
          link: 'https://zhangaoo.com/wedding/', // 分享链接
          imgUrl: 'https://zhangaoo.com/wedding/img/wedding.73c64515.jpeg', // 分享图标
          success: function () {
            console.log('ShareAppMessage sucess')
          },
          cancel: function () {
            console.log('ShareAppMessage failed')
          }
        })
      });
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.onMenuShareTimeline({
          title: '张奥和胡芮的婚礼', // 分享标题
          desc: '张奥和胡芮的婚礼', // 分享描述
          link: 'https://zhangaoo.com/wedding/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
          imgUrl: 'https://zhangaoo.com/wedding/img/wedding.73c64515.jpeg', // 分享图标
          success: function () {
            // 设置成功
          }
        })
      });        
      
    }).catch((e) => {
      console.log(e);
    });**/
        },
        methods: {
            // 打开邀请函
            openInvitation() {
                this.isOpening = true
            },
            closeInvitation() {
                this.isOpening = false
                setTimeout(() => {
                    this.$emit('onClose')
                    this.$emit('sendBarrage', "感谢各位亲朋好友！")
                }, 660)
            },
            // 发送弹幕
            sendBarrage() {
                this.$nextTick(() => {
                    this.hasEntered = true
                    if (!this.wish) {
                        return
                    }
                    //保存弹幕到数据库
                    // const url = "https://springboot-ojdf-5653-4-1313699246.sh.run.tcloudbase.com/api/comment";
                    // axios.post(url, {
                    //         text: this.wish
                    //     }, {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
                    // ).then((data) => {
                    //     console.log(data.data)
                    // }).catch(function (err) {
                    //     console.log(err);
                    // });
                    this.isOpening = false
                    this.$refs.wishInput.blur()
                    setTimeout(() => {
                        this.$emit('sendBarrage', this.wish)
                    }, 660)
                })
            }
        }
    }
</script>

<style lang="less">
    .wedding-invitation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 30px 20px;
        padding-top: 60px;
        z-index: 4;
        transform: scale(0.05);
        -webkit-transform: scale(0.05);
        opacity: 0;
        transition: transform 0.8s cubic-bezier(.26, 1.84, .39, .61), opacity 0.5s linear;
        -webkit-transition: -webkit-transform 0.8s cubic-bezier(.26, 1.84, .39, .61), opacity 0.5s linear;
        background-size: 100%;
        overflow: hidden;

        &.invitation-bounce {
            opacity: 1;
            transform: scale(1);
            -webkit-transform: scale(1);
        }

        .invitation-container {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
            -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);

            &.invitation-down {
                transform: translateY(20px);
                -webkit-transform: translateY(20px);
            }

            .invitation-cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #D65047;
                border-radius: 10px;
                perspective: 500px;
                box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);

                .cover-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    padding: 10px 20px;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
                    -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);

                    &.invitation-up {
                        transform: translateY(-60px);
                        -webkit-transform: translateY(-60px);
                    }

                    .content-inside {
                        height: 100%;
                        padding: 20px;
                        color: #a9895d;
                        background-color: #FFF1DE;
                        text-align: center;
                        overflow: auto;

                        .content-inside-photo {
                            width: 62%;
                            margin-bottom: 10px;
                            padding: 5px;
                            border: 1px solid #f7debb;
                        }

                        p {
                            margin-top: 0;
                            margin-bottom: 5px;
                        }

                        .content-inside-bless {
                            input {
                                width: 100%;
                                height: 35px;
                                margin-bottom: 10px;
                                outline: none;
                                border: none;
                                border-bottom: 1px solid #f7debb;
                                color: #a9895d;
                                background: transparent;
                                font-size: 16px;

                                &::-webkit-input-placeholder {
                                    color: #E8D1B1;
                                    font-size: 12px;
                                }

                                &::-moz-placeholder {
                                    color: #E8D1B1;
                                    font-size: 12px;
                                }

                                &:-ms-input-placeholder {
                                    color: #E8D1B1;
                                    font-size: 12px;
                                }

                                &:-moz-placeholder {
                                    color: #E8D1B1;
                                    font-size: 12px;
                                }
                            }

                            > div {
                                display: flex;

                                button {
                                    width: 100%;
                                    height: 35px;
                                    color: #a9895d;
                                    background: #f7debb;
                                    border: none;
                                    outline: none;

                                    &:disabled {
                                        opacity: 0.8;
                                    }

                                    &:first-child {
                                        margin-right: 10px;
                                        flex: 1;
                                    }

                                    &:last-child {
                                        width: 60px;
                                        border: 1px solid #f7debb;
                                        background: transparent;
                                    }
                                }
                            }
                        }
                    }
                }

                .cover-inside-left {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 70%;
                    height: 100%;
                    border-radius: 10px;
                    background-color: #D65047;
                    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
                    z-index: 6;
                    transition: transform 0.5s;
                    -webkit-transition: -webkit-transform 0.5s;
                    transform-origin: 0 50%;
                    -webkit-transform-origin: 0 50%;

                    &.opening {
                        transform: rotate3d(0, 1, 0, -140deg);
                        -webkit-transform: rotate3d(0, 1, 0, -140deg);
                    }
                }

                .cover-inside-right {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 40%;
                    height: 100%;
                    border-radius: 10px;
                    background-color: #D65047;
                    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
                    z-index: 5;
                    transition: transform 0.5s;
                    -webkit-transition: -webkit-transform 0.5s;
                    transform-origin: 100% 50%;
                    -webkit-transform-origin: 100% 50%;

                    &.opening {
                        transform: rotate3d(0, 1, 0, 140deg);
                        -webkit-transform: rotate3d(0, 1, 0, 140deg);
                    }
                }

                .cover-inside-seal {
                    position: absolute;
                    left: 70%;
                    bottom: 100px;
                    width: 80px;
                    height: 80px;
                    margin-left: -40px;
                    z-index: 7;
                    transform-origin: 50% 50%;
                    -webkit-transform-origin: 50% 50%;
                    transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
                    -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);

                    &.invitation-flight {
                        opacity: 0;
                    }
                }
            }
        }
    }
</style>
