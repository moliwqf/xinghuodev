<template>
  <div class="fixed bottom-5 right-3 w-16 h-16 cursor-pointer">
    <img src="@/assets/chat-icon.png"
         @click="chatHandler" style="width: 100%; height: 100%" alt="聊天室">
  </div>
  <div v-show="chatDisplay"
       class="bounceInUp fixed w-[400px] rounded-2xl bottom-24 right-8 min-h-64 bg-slate-100 chat-room-container shadow-2xl">
    <div class="flex w-full bg-white px-[24px] py-[18px] items-center">
      <img class="w-11 h-11 cursor-pointer" src="@/assets/chatuserroomicon.jpg" alt="聊天室">
      <div class="mx-2 cursor-default">
        <div class="text-base">聊天室</div>
        <div class="text-sm font-light">当前1人在线</div>
      </div>
      <svg t="1705558295300" @click="chatHandler" class="icon ml-auto cursor-pointer" viewBox="0 0 1024 1024"
           version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="1640" width="16" height="16">
        <path
            d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
            p-id="1642"></path>
      </svg>
    </div>
    <div class="px-4 w-full max-h-[calc(100%-128px)] py-5 pb-0 overflow-auto" id="chat">
      <div class="flex mb-2">
        <img src="@/assets/spark-user.png" class="w-10 h-10 mr-[10px] cursor-pointer" alt="">
        <div class="flex flex-col" style="max-width: calc(100% - 100px)">
          <div class="text-[12px] select-none mb-[5px] mt-[3px]">You</div>
          <div class="flex-col flex br-popper bg-white text-base pd-10 break-words">
            sadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsad
          </div>
        </div>
      </div>
      <div class="flex mb-2">
        <img src="@/assets/spark-user.png" class="w-10 h-10 mr-[10px] cursor-pointer" alt="">
        <div class="flex flex-col" style="max-width: calc(100% - 100px)">
          <div class="text-[12px] select-none mb-[5px] mt-[3px]">You</div>
          <div class="flex-col flex br-popper bg-white text-base pd-10 break-words">
            sadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsad
          </div>
        </div>
      </div>
      <div class="flex mb-2 flex-row-reverse">
        <img src="@/assets/spark-user.png" class="w-10 h-10 ml-[10px] cursor-pointer" alt="">
        <div class="flex flex-col" style="max-width: calc(100% - 100px)">
          <div class="text-[12px] select-none mb-[5px] mt-[3px] text-right">You</div>
          <div class="flex-col flex bl-popper bg-white text-base pd-10 break-words">
            sadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsad
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[52px] flex absolute bottom-0 left-0 px-4 py-2 items-center" style="background-color: #f7f7f7">
      <img :src="voiceOrKeyboardImg" @click="voiceHandler" class="w-[24px] mr-[8px] h-[24px] cursor-pointer" alt="录音">
      <emotion v-show="emojiListShow" class="emotion" @emotion="(i: any) => content += i" :height="200"/>
      <textarea placeholder="请输入内容"
                v-show="voiceDisplay"
                v-model="content"
                class="m-0 w-full pl-[10px] pt-[8px] text-[13px] resize-none outline-none rounded-xl h-[32px] overflow-hidden"></textarea>
      <button v-show="!voiceDisplay" class="bg-white w-full text-[13px] h-[32px] rounded-xl">按 住 说 话</button>
      <img src="@/assets/emji.png"
           class="w-6 h-6 mx-[8px] cursor-pointer" alt="表情" @click="emojiListShow = !emojiListShow">
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
import {defineComponent, onMounted, ref, watch} from "vue";
import Emotion from '@/components/index.vue'

export default defineComponent({
  name: 'Chat',
  components: {
    Emotion
  },
  setup() {
    const content = ref('');
    let chatBtn: any = null;
    const chatDisplay = ref(false);
    const voiceDisplay = ref(true);
    const voiceOrKeyboardImg = ref(require('@/assets/ic_voice.png'));

    onMounted(() => {
      chatBtn = document.getElementById('chatBtn');
    });
    watch(
        () => content.value,
        (value, oldValue, onCleanup) => {
          chatBtn.disabled = !value;
        }
    );
    const sendMessage = () => {
      // 1. 清空内容
      content.value = '';
      // 2. 发送信息
    };
    const chatHandler = () => {
      chatDisplay.value = !chatDisplay.value;

    };
    const voiceHandler = () => {
      voiceDisplay.value = !voiceDisplay.value;
      if (voiceDisplay.value) {
        voiceOrKeyboardImg.value = require('@/assets/ic_voice.png');
      } else {
        voiceOrKeyboardImg.value = require('@/assets/keyboard.png')
      }
    };
    const emojiListShow = ref(false);
    return {
      content,
      emojiListShow,
      sendMessage,
      chatHandler,
      chatDisplay,
      voiceHandler,
      voiceOrKeyboardImg,
      voiceDisplay
    }
  }
})
</script>

<style scoped>
.chat-room-container {
  height: calc(85% - 84px);
  z-index: 10000;
  max-height: 600px;
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