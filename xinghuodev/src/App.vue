<template>
  <div class="w-full h-screen">
    <div class="fixed bottom-5 left-5 bg-red-400 w-10 h-10" @click="clickBootHandler"></div>
    <div id="chatContainer" :class="chatShow ? 'chat-container-show' : 'chat-container-hidden'"
         class="fixed rounded-2xl bottom-10 left-16 min-h-64 bg-slate-100 chat-container shadow-2xl">
      <div :class="chatShow ? 'block' : 'hidden'">
        <div class="flex w-full bg-white px-6 py-5 items-center">
          <img class="w-8 h-8" src="@/assets/x-spark.png" alt="星火图像">
          <div class="items-center mx-2 flex">How can I help you today?</div>
          <svg t="1705558295300" class="icon ml-auto cursor-pointer" @click="clickBootHandler" viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="1640" width="16" height="16">
            <path d="M0 0h1024v1024H0z" fill="#bfbfbf" fill-opacity="0" p-id="1641"></path>
            <path
                d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
                fill="#bfbfbf" p-id="1642"></path>
          </svg>
        </div>
        <div class="px-4 w-full py-5 pb-0 overflow-y-auto" id="chat">
          <div class="flex mb-2">
            <img src="@/assets/spark-user.png" class="w-10 h-10 mr-3 cursor-pointer" alt="">
            <div class="flex flex-col" style="max-width: calc(100% - 50px)">
              <div class="font-semibold select-none mb-2">You</div>
              <div class="flex-col flex br-popper bg-white text-base pd-10 break-words">
                sadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsad
              </div>
            </div>
          </div>
          <div class="flex mb-2">
            <img src="@/assets/x-spark.png" class="w-10 h-10 mr-3 cursor-pointer" alt="">
            <div class="flex flex-col text-base" style="max-width: calc(100% - 50px)">
              <div class="font-semibold flex select-none mb-2">Spark</div>
              <div class="flex-col flex br-popper bg-white pd-10 break-words">
                sadfsadfsadsadfsadfsadsadfsdsadfsadfsadsadfsadfsadsadfsadfsad
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex absolute bottom-0 left-0 px-4 py-2">
              <textarea placeholder="Message Spark…"
                        v-model="message"
                        id="textInput"
                        @keydown.enter="sendMessage"
                        style="max-height: 200px;height: 52px;overflow-y: hidden;"
                        class="m-0 w-full resize-none border-0 rounded-2xl py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 outline-none dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"></textarea>
          <button @click="sendMessage" id="sendMessageBtn"
                  disabled
                  class="absolute bottom-5 rounded-lg border border-black enabled:bg-black disabled:text-gray-400 text-white dark:border-white dark:bg-white right-10 bg-black disabled:opacity-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white dark:text-black">
              <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <chat/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch, onMounted, reactive, provide} from 'vue'
import Chat from "@/components/Chat.vue";
import Emoji from "@/components/Emoji.vue";

export default defineComponent({
  name: 'App',
  components: {
    Chat,
    Emoji
  },
  setup() {
    // 面板显示
    const chatShow = ref(true);
    // 输入的信息
    const message: any = ref('');
    // textarea html对象
    let input: any = null;
    // 发送按钮
    let btn: any = null;
    let chatContainer: any = null;
    // 显示面板
    const clickBootHandler = (event: any) => {
      event.stopPropagation();
      chatShow.value = !chatShow.value;
    };
    // 初始化html对象
    onMounted(() => {
      input = document.getElementById('textInput');
      btn = document.getElementById('sendMessageBtn');
      chatContainer = document.getElementById('chatContainer');

      document.addEventListener('click', (event) => {
        let isSelf = chatContainer.contains(event.target);
        if (!isSelf) {
          chatShow.value = false;
        }
      });
    });
    // 监听输入信息
    watch(
        () => message.value,
        (msg: any) => {
          // 实现自适应textarea
          const hiddenArea = document.createElement('textarea');
          hiddenArea.classList.add(...input.classList);
          // hiddenArea.style.visibility = 'hidden';
          hiddenArea.value = input.value;
          hiddenArea.style.height = '52px';
          hiddenArea.style.width = input.clientWidth + 'px';
          document.body.appendChild(hiddenArea);
          const currentHeight = hiddenArea.scrollHeight;
          if (currentHeight < 200) {
            input.style.overflowY = 'hidden';
          } else {
            input.style.overflowY = 'auto';
          }
          input.style.height = currentHeight + 'px';

          // 如果有内容，设置按钮可用
          btn.disabled = !msg;
        }
    );
    // 发送消息
    const sendMessage = (event: any) => {
      console.log("发送消息");
      event.preventDefault();
      message.value = '';
    };

    return {
      chatShow,
      clickBootHandler,
      message,
      sendMessage
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

@media (min-width: 1000px) {
  .chat-container-show {
    width: 800px !important;
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

.br-popper {
  border-radius: 5px 20px 20px 20px;
}

.bl-popper {
  border-radius: 20px 5px 20px 20px;
}

.pd-10 {
  padding: 10px;
}

.send-msg {
  padding: 10px 48px 0 10px;
}
</style>
