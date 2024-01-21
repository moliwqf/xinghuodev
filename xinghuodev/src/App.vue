<template>
  <div class="w-full h-screen" v-show="isLogin">
    <div>{{ obj.output }}<span class="easy-typed-cursor">|</span></div>
    <div class="fixed bottom-5 left-5 bg-red-400 w-10 h-10"
         @click="clickBootHandler"></div>
    <AIChat id="aiContainer"/>
    <Chat/>
  </div>
  <login v-if="!isLogin" @showMain="displayMainHandler"/>
</template>

<script lang="ts">
import {defineComponent, ref, watch, onMounted, onBeforeMount, provide, getCurrentInstance} from 'vue'
import Chat from "@/components/ChatRoom/Chat.vue";
import Emoji from "@/components/Emoji/EmojiItem.vue";
import {socketInstance, getSocket} from '@/components/socket-client';
import Login from "@/components/Login.vue";
import EasyTyper from 'easy-typer-js'
import {reactive} from "@vue/reactivity";
import AIChat from "@/components/AIChat/AIChat.vue";

export default defineComponent({
  name: 'App',
  components: {
    Chat,
    Emoji,
    Login,
    AIChat
  },
  setup(props, ctx) {
    const obj = reactive({
      output: '',
      isEnd: false,
      speed: 80,
      singleBack: true,
      sleep: 0,
      type: 'normal',
      backSpeed: 40,
      sentencePause: true
    });
    const {proxy}: any = getCurrentInstance();
    const isLogin = ref(true);
    const chatShow = ref(true); // 面板显示
    let aiContainer: any = null; // ai-container
    const socket = socketInstance(); // 获取socket连接
    // 向 AIChat组件提供chatShow
    provide('chatShow', chatShow);
    // 显示面板
    const clickBootHandler = (event: any) => {
      event.stopPropagation();
      chatShow.value = !chatShow.value;
      console.log(chatShow)
    };
    // 连接成功
    const connectSocket = () => {
      socket.on('connect', () => { // 默认通道 connect是通道名称
        console.log('连接成功');
      });
    };
    onBeforeMount(() => {
      connectSocket();
    })
    // 初始化html对象
    onMounted(() => {
      const typed = new EasyTyper(obj, `我是Vue3输出的内容`, () => {
        console.log('输入完毕');
      }, () => {
      });
      aiContainer = document.getElementById('aiContainer');
      document.addEventListener('click', (event) => {
        let isSelf = aiContainer.contains(event.target);
        if (!isSelf) {
          chatShow.value = false;
        }
      });
    });
    const displayMainHandler = () => {
      isLogin.value = true;
    }

    return {
      chatShow,
      clickBootHandler,
      isLogin,
      displayMainHandler,
      obj
    }
  }
});
</script>

<style>
.chat-container {
  height: calc(85% - 84px);
  z-index: 999;
  max-height: 600px;
  transition: width, height;
  transition-duration: 0.5s;
}

.easy-typed-cursor {
  margin-left: 5px;
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0% {
    opacity: 1
  }
  50% {
    opacity: 0
  }
  100% {
    opacity: 1

  }
}


@-webkit-keyframes blink {
  0% {
    opacity: 1
  }
  50% {
    opacity: 0
  }
  100% {
    opacity: 1

  }
}

@-moz-keyframes blink {
  0% {
    opacity: 1
  }
  50% {
    opacity: 0
  }
  100% {
    opacity: 1

  }
}


@media (min-width: 1000px) {
  .chat-container-show {
    width: 800px !important;
  }
}

@media (min-width: 760px) {
  .chat-container-show {
    width: 600px;
  }
}

@media (max-width: 490px) {
  .chat-container-show {
    width: 400px;
  }
}

.chat-container-hidden {
  width: 0 !important;
  height: 0 !important;
}


div::-webkit-scrollbar {
  width: 10px; /* 设置滚动条的宽度 */
}

/* 设置滚动条的轨道背景色 */
div::-webkit-scrollbar-track {
  background-color: #fff;
}

/* 设置滚动条的滑块样式 */
div::-webkit-scrollbar-thumb {
  background-color: #e1e1e9;
  border-radius: 6px; /* 设置滑块的圆角 */
}

/* 当滑块被激活（被点击）时的样式 */
div::-webkit-scrollbar-thumb:hover {
  background-color: #d9d9e3;
}

/* 设置滚动条轨道的样式 */
textarea::-webkit-scrollbar {
  width: 10px; /* 设置滚动条的宽度 */
}

/* 设置滚动条的轨道背景色 */
textarea::-webkit-scrollbar-track {
  background-color: #fff;
}

/* 设置滚动条的滑块样式 */
textarea::-webkit-scrollbar-thumb {
  background-color: #e1e1e9;
  border-radius: 6px; /* 设置滑块的圆角 */
}

/* 当滑块被激活（被点击）时的样式 */
textarea::-webkit-scrollbar-thumb:hover {
  background-color: #d9d9e3;
}
</style>
