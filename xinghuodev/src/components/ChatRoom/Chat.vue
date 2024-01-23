<template>
  <div class="fixed bottom-5 right-3 w-16 h-16 cursor-pointer">
    <img src="@/assets/chat-icon.png"
         @click="chatHandler" style="width: 100%; height: 100%" alt="聊天室">
  </div>
  <div v-show="chatDisplay"
       class="bounceInUp fixed w-[400px] rounded-2xl bottom-24 right-8 min-h-64 bg-slate-100 chat-room-container shadow-2xl">
    <div class="flex w-full bg-white px-[24px] py-[18px] items-center">
      <img class="w-11 h-11 cursor-pointer" src="../../assets/chatuserroomicon.jpg" alt="聊天室">
      <div class="mx-2 cursor-default">
        <div class="text-base">聊天室</div>
        <div class="text-sm font-light">当前1人在线</div>
      </div>
      <svg t="1705558295300" @click="chatHandler" class="icon ml-auto cursor-pointer" viewBox="0 0 1024 1024"
           xmlns="http://www.w3.org/2000/svg" p-id="1640" width="16" height="16">
        <path
            d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
            p-id="1642"></path>
      </svg>
    </div>
    <div class="px-4 w-full max-h-[calc(100%-128px)] py-5 pb-0 overflow-auto" id="chatRoom">
      <div class="flex mb-2" v-for="data in messages" :key="data.user"
           :class="data.fromUserId === userId ? 'flex-row-reverse' : ''">
        <img src="../../assets/spark-user.png"
             :class="data.fromUserId === userId ? 'ml-[10px]' : 'mr-[10px]'"
             class="w-10 h-10 cursor-pointer">
        <div class="flex flex-col" style="max-width: calc(100% - 100px)">

          <div class="text-[12px] select-none mb-[5px] mt-[3px]"
               :class="data.fromUserId === userId ? 'text-right' : ''">
            {{ data.fromUserId === userId ? '我' : data.fromUserId }}
          </div>
          <div :class="data.fromUserId === userId ? 'bl-popper' : 'br-popper'"
               class="flex bg-white text-base p-[10px] break-words">
            <div v-if="data.contentType === 0" v-html="data.content"></div>
            <div v-if="data.contentType === 2"
                 @click="handleAudioPlay($event)"
                 class="voice-static bg-cover cursor-pointer bg-center w-[24px] h-[24px]">
              <audio controls data-event="0"
                     data-playing="0"
                     hidden>
                <source :src="data.content">
              </audio>
            </div>
            <span v-if="data.contentType === 2">{{data.duration}}"</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[52px] flex absolute bottom-0 left-0 px-4 py-2 items-center" style="background-color: #f7f7f7">
      <Emoji v-show="emojiListShow" class="emotion"
             @content="(item: any) => content += item" :height="200"/>
      <button class="mr-2" @click="isVoice = !isVoice">
        <svg t="1705822788932" class="icon"
             v-show="!isVoice"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="11602" width="24" height="24">
          <path
              d="M512 163.882667c81.095111 0 147.086222 60.984889 147.086222 135.950222V509.013333c0 74.965333-65.976889 135.950222-147.086222 135.950223-81.095111 0-147.086222-60.984889-147.086222-135.950223V299.847111c0-74.965333 65.991111-135.964444 147.086222-135.964444m0-28.444445c-96.938667 0-175.530667 73.6-175.530667 164.394667V509.013333c0 90.794667 78.592 164.394667 175.530667 164.394667 96.938667 0 175.530667-73.6 175.530667-164.394667V299.847111c0-90.794667-78.592-164.408889-175.530667-164.408889z"
              fill="#2c2c2c" p-id="11603"></path>
          <path
              d="M512 776.760889c-144.170667 0-267.164444-114.346667-286.122667-265.969778a14.222222 14.222222 0 1 1 28.216889-3.527111C271.274667 644.693333 382.151111 748.316444 512 748.316444s240.725333-103.637333 257.905778-241.052444a14.222222 14.222222 0 1 1 28.216889 3.527111C779.164444 662.428444 656.170667 776.760889 512 776.760889z"
              fill="#2c2c2c" p-id="11604"></path>
          <path
              d="M511.616 895.616a14.222222 14.222222 0 0 1-14.222222-14.222222v-108.288c0-1.351111 0.199111-2.688 0.568889-3.996445l0.782222-2.659555a14.222222 14.222222 0 1 1 27.306667 7.992889l-0.213334 0.696889v106.254222a14.222222 14.222222 0 0 1-14.222222 14.222222z"
              fill="#2c2c2c" p-id="11605"></path>
          <path
              d="M705.408 902.784H318.592a14.222222 14.222222 0 1 1 0-28.444444h386.801778a14.222222 14.222222 0 0 1 0.014222 28.444444z"
              fill="#2c2c2c" p-id="11606"></path>
        </svg>
        <svg t="1705825465093" class="icon mt-1"
             v-show="isVoice"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="13285" width="24" height="24">
          <path
              d="M286.151111 128.014222h451.697778l5.76 0.071111 10.922667 0.256 5.191111 0.199111 5.020444 0.241778 9.571556 0.625778c32.440889 2.56 54.072889 8.817778 76.330666 20.736a158.961778 158.961778 0 0 1 65.877334 65.877333c11.164444 20.864 17.379556 41.187556 20.209777 70.371556l0.526223 5.959111 0.625777 9.571556 0.241778 5.020444 0.199111 5.191111 0.256 10.922667 0.085334 11.690666v354.503112l-0.085334 11.690666-0.256 10.922667-0.199111 5.191111-0.241778 5.020444-0.625777 9.571556c-2.56 32.440889-8.817778 54.072889-20.736 76.330667a158.961778 158.961778 0 0 1-65.877334 65.877333c-20.864 11.164444-41.187556 17.379556-70.371555 20.209778l-5.959111 0.526222-9.571556 0.625778-5.020444 0.241778-5.191111 0.199111-10.922667 0.256-11.690667 0.085333H292.081778l-11.690667-0.085333-10.922667-0.256-5.191111-0.199111-5.020444-0.241778-9.571556-0.625778c-32.440889-2.56-54.072889-8.817778-76.330666-20.736a158.961778 158.961778 0 0 1-65.877334-65.877333c-11.164444-20.864-17.379556-41.187556-20.209777-70.371556l-0.526223-5.959111-0.625777-9.571556-0.241778-5.020444-0.199111-5.191111-0.256-10.922667L85.333333 695.182222V328.803556l0.071111-5.745778 0.256-10.922667 0.199112-5.191111 0.241777-5.020444 0.625778-9.571556c2.56-32.440889 8.817778-54.072889 20.736-76.330667a158.961778 158.961778 0 0 1 65.877333-65.877333c20.864-11.164444 41.187556-17.379556 70.371556-20.209778l5.959111-0.526222 9.571556-0.625778 5.020444-0.241778 5.191111-0.199111 10.922667-0.256L286.151111 128z m459.434667 85.432889L736.682667 213.333333l-451.754667 0.014223-13.198222 0.241777-9.6 0.398223-6.855111 0.469333c-13.724444 1.109333-23.196444 3.100444-31.459556 6.229333l-2.716444 1.095111-3.783111 1.706667-3.712 1.891556a73.443556 73.443556 0 0 0-28.842667 27.306666l-2.033778 3.569778-0.938667 1.792-1.735111 3.584c-4.039111 8.874667-6.570667 18.488889-7.964444 33.137778l-0.369778 4.124444-0.426667 6.698667-0.312888 7.367111-0.199112 8.106667-0.099555 8.903111 0.014222 366.421333 0.241778 13.198222 0.398222 9.6 0.469333 6.855111c1.109333 13.724444 3.100444 23.196444 6.229334 31.459556l1.095111 2.716444 1.706667 3.783112 1.891555 3.712a73.443556 73.443556 0 0 0 27.306667 28.842666l3.569778 2.033778 1.792 0.938667 3.584 1.735111c8.874667 4.039111 18.488889 6.570667 33.137777 7.964444l4.124445 0.369778 6.698666 0.426667 7.367112 0.312889 8.106666 0.199111 8.903111 0.099555h449.365334l11.008-0.142222 9.770666-0.298667 7.025778-0.369777 6.385778-0.497778c13.696-1.237333 23.04-3.427556 31.388444-6.869334l2.759111-1.194666 3.584-1.735111 1.792-0.938667a73.443556 73.443556 0 0 0 28.842667-27.306667l2.033778-3.569777 0.938667-1.792 1.735111-3.584c4.039111-8.874667 6.570667-18.488889 7.964444-33.137778l0.369778-4.124445 0.426667-6.698666 0.312888-7.367111 0.199112-8.106667 0.099555-8.903111V329.984l-0.142222-11.008-0.298667-9.770667-0.369778-7.025777-0.497777-6.385778c-1.237333-13.696-3.427556-23.04-6.869334-31.388445l-1.194666-2.759111-1.735111-3.584-0.938667-1.792a73.443556 73.443556 0 0 0-27.306667-28.842666l-3.569778-2.033778-1.792-0.938667-3.584-1.735111c-8.874667-4.039111-18.488889-6.570667-33.137777-7.964444l-4.124445-0.369778-6.698666-0.426667-7.367112-0.312889-8.106666-0.199111zM682.666667 618.666667a42.666667 42.666667 0 0 1 0 85.333333H341.333333a42.666667 42.666667 0 0 1 0-85.333333h341.333334zM362.666667 469.333333a42.666667 42.666667 0 0 1 0 85.333334h-42.666667a42.666667 42.666667 0 0 1 0-85.333334h42.666667z m170.666666 0a42.666667 42.666667 0 0 1 0 85.333334h-42.666666a42.666667 42.666667 0 0 1 0-85.333334h42.666666z m170.666667 0a42.666667 42.666667 0 0 1 0 85.333334h-42.666667a42.666667 42.666667 0 0 1 0-85.333334h42.666667z m-341.333333-149.333333a42.666667 42.666667 0 0 1 0 85.333333h-42.666667a42.666667 42.666667 0 0 1 0-85.333333h42.666667z m170.666666 0a42.666667 42.666667 0 0 1 0 85.333333h-42.666666a42.666667 42.666667 0 0 1 0-85.333333h42.666666z m170.666667 0a42.666667 42.666667 0 0 1 0 85.333333h-42.666667a42.666667 42.666667 0 0 1 0-85.333333h42.666667z"
              fill="#8a8a8a" p-id="13286"></path>
        </svg>
      </button>
      <RecordingAnimate v-show="isRecording" class="absolute bottom-14 left-[41%]"/>
      <button v-show="isVoice" :class="isRecording ? 'bg-gray-100' : 'bg-white'"
              @mousedown="startRecording"
              @mouseup="stopRecording"
              class="h-[30px] w-full text-[13px] rounded-xl">
        {{ voiceText }}
      </button>
      <textarea placeholder="请输入内容"
                v-model="content"
                v-show="!isVoice"
                class="m-0 w-full pl-[10px] pt-[8px] text-[13px] resize-none outline-none rounded-xl h-[32px] overflow-hidden"></textarea>
      <img :src="emojiImg"
           class="w-6 h-6 mx-[8px] cursor-pointer" alt="表情" @click="emojiListHandler">
      <button disabled
              id="chatBtn"
              @click="sendMessage"
              class="bottom-5 ml-1 rounded-lg border border-black enabled:bg-black disabled:text-gray-400 text-white dark:border-white dark:bg-white right-10 bg-black disabled:opacity-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white dark:text-black">
          <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
          </path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch, nextTick} from "vue";
import Emoji from '@/components/Emoji/Emoji.vue'
import {getSocket} from "@/components/socket-client";
import {reactive} from "@vue/reactivity";
import RecordingAnimate from "@/components/ChatRoom/RecordingAnimate.vue";
import Recorder from "js-audio-recorder";
import {createUserId, processContent} from '@/util/createUserId'


export default defineComponent({
  components: {
    Emoji,
    RecordingAnimate
  },
  name: 'Chat',
  setup: function () {
    const socket = getSocket(); // 获取socket连接
    const user = ref(); // 用户信息
    const content = ref(''); // 发送信息
    let chatBtn: any = null; // 发送信息的按钮
    const chatDisplay = ref(false); // 是否显示聊天室
    let chatRoom: any = null; // 聊天室中间部分html对象
    const messages: Array<any> = reactive([]); // 聊天信息
    const mediaStream: any = ref(); // 媒体流
    const recorder: any = ref(); // recorder对象
    const isRecording = ref(false); // 是否处于录音中
    const isVoice = ref(false); // 是否处于录音界面
    const voiceText = ref('按住说话'); // 录音下的文字显示
    const userId = createUserId();
    // 开始录音
    const startRecording = () => {
      isRecording.value = true;
      navigator.mediaDevices.getUserMedia({audio: true})
          .then(stream => {
            mediaStream.value = stream;
            recorder.value = new Recorder(mediaStream.value);
            recorder.value.start();
          }).catch(error => console.log('Error accessing microphone', error));
      // 修改文本
      voiceText.value = '结束录音';
    };
    // 停止录音
    const stopRecording = () => {
      if (!isRecording.value) return;
      // 停止录音
      isRecording.value = false;
      recorder.value.stop();
      mediaStream.value.getAudioTracks().forEach((track: any) => track.stop());
      // 上传录音文件
      // 自定义协议 - 首4字节表示发送者，接着4字节表示接受者，然后1字节表示文件类型
      let buffer = new ArrayBuffer(9);
      let dataView = new DataView(buffer);
      dataView.setInt32(0, userId);
      dataView.setInt32(4, 0);
      dataView.setInt8(8, 2);
      const blob: any = recorder.value.getWAVBlob();
      const newBlob = new Blob([buffer, blob], {type: 'audio/wav'});
      socket.send(newBlob);
      // 修改文本
      voiceText.value = "按住说话";
    };


    // 到达底端
    const scrollIntoView = () => {
      nextTick(() => {
        let children = chatRoom.children;
        if (children.length > 0) {
          let lastChildren = children[children.length - 1];
          lastChildren.scrollIntoView(false);
        }
      });
    };

    // socket io 形式
    /*const receiveMessage = () => {
      socket.on('receiveMessage', (data: any) => {
        messages.push(data);
        scrollIntoView();
      })
    };
    const injectData = () => {
      socket.on('chat', (username: any) => {
        user.value = username;
      });
    };
    */
    const receiveMessage = () => {
      socket.onmessage = (data: any) => {
        let message = JSON.parse(data.data);
        if (message.flag) {
          if (message.data.contentType === 0) {
            message.data.content = processContent(message.data.content);
          }
          messages.push(message.data);
          scrollIntoView();
        }
      }
    }
    onMounted(() => {
      chatBtn = document.getElementById('chatBtn');
      chatRoom = document.getElementById('chatRoom');
      /*injectData();
      receiveMessage();*/
      receiveMessage();
    });
    // 监听发送的消息
    watch(
        () => content.value,
        (value, oldValue, onCleanup) => {
          chatBtn.disabled = !value;
        }
    );

    // 发送消息
    const sendMessage = () => {
      // 发送信息
      /*socket.emit('sendMessage', {
        content: content.value.toString(),
        user: user.value
      });*/
      let message = {
        userId: userId,
        content: content.value.toString()
      }
      socket.send(JSON.stringify(message));
      // 清空内容
      content.value = '';
    };
    // 修改聊天室可见状态
    const chatHandler = () => {
      chatDisplay.value = !chatDisplay.value;
    };
    // emoji图标
    const emojiListShow = ref(false);
    const emojiImg = ref(require('@/assets/emoji.png'));
    // 修改emoji图标样式
    const emojiListHandler = () => {
      emojiListShow.value = !emojiListShow.value;
      if (emojiListShow.value) {
        emojiImg.value = require('@/assets/emoji-yellow.png');
      } else {
        emojiImg.value = require('@/assets/emoji.png');
      }
    };
    // 控制音频播放
    const handleAudioPlay = (e:any) => {
      const parent:any = e.target;
      // 1. 获取audio元素
      const audio:any = parent.children[0];
      // 2. 为audio添加事件 - 如果data-event为0
      if (audio.getAttribute('data-event') === '0') {
        audio.addEventListener('ended', () => {
          audio.setAttribute('data-playing', '0');
          parent.classList.add('voice-static');
          parent.classList.remove('voice-run');
        });
        audio.setAttribute('data-event', '1');
      }
      // 3. 获取是否在播放
      const isPlaying = audio?.getAttribute('data-playing');
      if (isPlaying === '0') {
        audio.setAttribute('data-playing', '1');
        audio.play();
        parent.classList.remove('voice-static');
        parent.classList.add('voice-run');
      } else {
        audio.setAttribute('data-playing', '0');
        audio.pause();
        parent.classList.add('voice-static');
        parent.classList.remove('voice-run');
      }
    }
    return {
      content,
      emojiListShow,
      sendMessage,
      chatHandler,
      chatDisplay,
      emojiListHandler,
      emojiImg,
      messages,
      user,
      isRecording,
      isVoice,
      voiceText,
      startRecording,
      stopRecording,
      userId,
      handleAudioPlay
    }
  }
})
</script>

<style scoped>
img {
  display: inline-block;
}

.chat-room-container {
  height: calc(85% - 84px);
  z-index: 10000;
  max-height: 600px;
}

.voice-static {
  background-image: url("@/assets/voice-static.png");
}

.voice-run {
  background-image: url("@/assets/voice-run.gif");
}

.br-popper {
  border-radius: 5px 20px 20px 20px;
}

.bl-popper {
  border-radius: 20px 5px 20px 20px;
}

.bounceInUp {
  animation-name: bounceInUp;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes bounceInUp {
  0%, 60%, 75%, 90%, 100% {
    animation-timing-function: cubic-bezier(.215, .61, .355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  100% {
    transform: translateZ(0);
  }
}

.emotion {
  z-index: 2000;
  width: 400px;
  position: absolute;
  height: 200px;
  right: 0;
  bottom: 50px;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  background-image: -webkit-linear-gradient(45deg, hsla(0, 0%, 100%, .4) 25%, transparent 0, transparent 50%, hsla(0, 0%, 100%, .4) 0, hsla(0, 0%, 100%, .4) 75%, transparent 0, transparent);
  border-radius: 2em;
}

::-webkit-scrollbar-track {
  background-color: rgba(73, 177, 245, .2);
  border-radius: 2em;
}

::selection {
  background-color: #b3d4fc;
  color: #000;
  text-shadow: none;
}
</style>