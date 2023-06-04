<template>
  <div class="home">
    <swiper
      class="swiper"
      :options="swiperOption"
      @slideChange="onSlideChange"
      ref="mySwiper"
    >
      <swiper-slide v-for="(item,index) in videoData" :key="index" >
        <video
          autoplay
          playsinline
          muted
          class="videoName"
          :id="'player'+ index"
          loop="loop"
          controls
          style="object-fit:fill"
          preload="auto"
          webkit-playsinline="true" 
          >
          <source :src="item.play_url" type="application/x-mpegURL" />
        </video>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-contrib-hls";
import "video.js/dist/video-js.css"

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { forYouList } from '@/services/api/video.js'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['tabIndex'],

  data() {
    return {
      videoData:[],
      swiperOption: {
        direction: "vertical",
        loop: false,
        height:896,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      on:{
        // 使用es6的箭头函数，使this指向vue对象
        click: ()=>{
          // 通过$refs获取对应的swiper对象
          let swiper = this.$refs.mySwiper;
          console.log(swiper) //当前点击的索引
        }
      }
    };
  },
  watch:{
    tabIndex(num){
      if(num === 1){
        this.videoData.forEach((item,index) => {
          document.getElementById('player' + index + '_html5_api').pause()
        });
      }else{
        this.videoData.forEach((item,index) => {
          document.getElementById('player' + index + '_html5_api').play()
        });
      }
    }
  },
  created() {
    this.getVideoUrl()
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getVideo();
      }, 500);
    });
    
  },
  methods: {
    getVideoUrl(){
      forYouList().then((res) => {
        this.videoData = res.items
      })
    },
    onSlideChange() {
      let swiper = this.$refs.mySwiper.$swiper; //当前点击的索引
      
      if(this.videoData.length > 0){
        this.videoData.forEach((item,index) => {
          const play = document.getElementById('player' + index + '_html5_api')

          if(index !== swiper.realIndex){
            play.pause()
            play.currentTime = 0
          }else{
            play.play()

          }
        });
      }
    },
    getVideo() {
      this.videoData.forEach((item,index)=>{
        this.myVideo = videojs(`player${index}`, {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false,
          controls: true,
          preload: 'auto',
          inactivityTimeout: false, //自动隐藏控制栏
          playsinline: true,  //解决在iPhone中播放时自动全屏问题
          hls: {
            withCredentials: true
          }
        });
      })
      
    },
  }
};
</script>
<style lang="scss" scoped>
.home{
  max-width: 900px;
  .swiper-slide{
    background: #000;
  }
}
video{
  width: 414px;
  height: 896px;
}

//进度条
.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  opacity: 1;
}
</style>