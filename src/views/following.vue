<template>
  <div class="home">
    <swiper
      class="swiper"
      :options="swiperOption"
      @slideChange="onSlideChange"
      ref="mySwiper"
    >
      <swiper-slide v-for="(item, index) in videoData" :key="item.id">
        <video
          :ref="'videoCon' + index"
          autoplay
          playsinline
          muted
          class="videoName"
          :id="'my_player' + index"
          loop="loop"
          controls
          style="object-fit: fill"
          preload="auto"
          webkit-playsinline="true"
          @timeupdate="videoTimeUpdate(index)"
        >
          <source :src="item.play_url" type="application/x-mpegURL" />
        </video>
        <div class="control-play">

          <div class="control-progress common-progress">
            <div>
              <el-slider v-model="vcProgress" @change="getNewTime(vcProgress,index)" input-size="small"></el-slider>
            </div>
          </div>

        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { followingList } from '@/services/api/video.js'
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['tabIndex'],
  data() {
    return {
      videoData: [],
      swiperOption: {
        direction: 'vertical',
        loop: false,
        height: 896,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      on: {
        // 使用es6的箭头函数，使this指向vue对象
        click: () => {
          // 通过$refs获取对应的swiper对象
          let swiper = this.$refs.mySwiper
          console.log(swiper) //当前点击的索引
        },
      },
      vcIsPlay: false, //是否播放
      opcityVal: {
        opacity: '1'
      },
      currentTimeVal: 0, // 当前时间
      vcCurrentTime: '00:00:00', //当前时间格式化
      vcProgress: 0, //进度条的绑定时间
    }
  },
  created() {
    this.getVideoUrl()
  },
  watch: {
    tabIndex(num) {
      if (num === 0) {
        this.videoData.forEach((item, index) => {
          document.getElementById('my_player' + index + '_html5_api').pause()
        })
      } else {
        this.videoData.forEach((item, index) => {
          document.getElementById('my_player' + index + '_html5_api').play()
          document.getElementById('my_player' + index + '_html5_api').currentTime = 50
          //添加视频准备完成后的回调函数
          document.getElementById('my_player' + index + '_html5_api').on('loadedmetadata', function() {
            document.getElementById('my_player' + index + '_html5_api').play();            			//自动播放
            document.getElementById('my_player' + index + '_html5_api').currentTime(100);		    //跳转
          });
        })
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getVideo()
      }, 500)
    })
  },
  methods: {
    getVideoUrl() {
      followingList().then((res) => {
        this.videoData = res.items
      })
    },
    onSlideChange() {
      let swiper = this.$refs.mySwiper.$swiper
      if (this.videoData.length > 0) {
        this.videoData.forEach((item, index) => {
          const play = document.getElementById('my_player' + index + '_html5_api')
          if (index !== swiper.realIndex) {
            play.pause()
            play.currentTime = 0
          } else {
            play.play()
          }
        })
      }
    },
    getVideo() {
      this.videoData.forEach((item, index) => {
        this.myVideo = videojs(`my_player${index}`, {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false,
          controls: true,
          preload: 'auto',
          inactivityTimeout: false, //自动隐藏控制栏
          playsinline: true, //解决在iPhone中播放时自动全屏问题
          hls: {
            withCredentials: true,
          },
          
        })
      })
    },

    timeupdate(){
      console.log(123)
    },
    // 获取时间
    videoTimeUpdate(index) {
      let videoObj = this.$refs[`videoCon${index}`]
      let currTime = videoObj[0].currentTime*10 //当前时间
      this.vcProgress = currTime  //赋值给进度条
      this.vcCurrentTime = this.getFormatVideoTime(currTime)
      console.log(currTime)
    },
        //格式化时间
    getFormatVideoTime(time) {
      let curtime = time
      let h = parseInt(curtime / 3600)
      let m = parseInt((curtime % 3600) / 60)
      let s = parseInt(curtime % 60)
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return h + ':' + m + ':' + s
    },
    getNewTime(val,index) {
      console.log(val)
      let videoObj = this.$refs[`videoCon${index}`] 
      if(videoObj){
        videoObj[0].currentTime = val
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  max-width: 900px;
  .swiper-slide {
    background: #000;
  }
}
video {
  width: 414px;
  height: 896px;
}

//进度条
.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  opacity: 1;
}
</style>