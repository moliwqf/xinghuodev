<template>
  <div ref="chatContainer"
       :class="chatShow ? 'chat-container-show' : 'chat-container-hidden'"
       class="fixed rounded-2xl bottom-10 left-16 min-h-64 chat-container shadow-2xl">
    <div :class="chatShow ? 'block' : 'hidden'" class="h-full" id="chatContent">
      <div class="flex w-full px-6 py-5 items-center">
        <img class="w-8 h-8" src="@/assets/x-spark.png" alt="星火图像">
        <div class="items-center mx-2 flex">How can I help you today?</div>
        <svg t="1705558295300"
             class="icon ml-auto cursor-pointer"
             @click="clickCloseIconHandler"
             viewBox="0 0 1024 1024"
             version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="1640" width="16" height="16">
          <path d="M0 0h1024v1024H0z" fill="#bfbfbf" fill-opacity="0" p-id="1641"></path>
          <path
              d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z"
              fill="#bfbfbf" p-id="1642"></path>
        </svg>
      </div>
      <div class="px-4 w-full py-5 pb-0 overflow-y-auto"
           style="max-height: calc(100% - 140px)" id="chat">
        <div class="flex mb-3">
          <img src="@/assets/spark-user.png"
               class="w-10 select-none cursor-default h-10 mr-3" alt="用户图片">
          <div class="flex flex-col" style="max-width: calc(100% - 55px)">
            <div class="font-semibold select-none mb-2">You</div>
            <div class="flex-col flex  text-base break-words">
              sadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsadsadfsadfsad
            </div>
          </div>
        </div>
        <div class="flex mb-3">
          <img src="@/assets/x-spark.png"
               class="w-10 h-10 mr-3 cursor-default select-none" alt="spark图片">
          <div class="flex flex-col text-base" style="max-width: calc(100% - 55px)">
            <div class="font-semibold flex select-none mb-2">Spark</div>
            <div class="flex-col flex bg-white break-words">
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
                      class="m-0 w-full border-[rgba(0,0,0,.2)] border-[1px] resize-none rounded-2xl py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 outline-none dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"></textarea>
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
</template>

<script lang="ts">
import {defineComponent, ref, watch, onMounted, inject, nextTick, getCurrentInstance} from "vue";

export default defineComponent({
  name: 'AIChat',
  setup() {
    const message: any = ref(''); // 输入的信息
    let chatContainer: any = null;
    // 到达消息底部
    const scrollIntoView = () => {
      nextTick(() => {
        let children = chatContainer.children;
        if (children.length > 0) {
          let lastChildren = children[children.length - 1];
          lastChildren.scrollIntoView(false);
        }
      });
    };
    const {proxy}:any = getCurrentInstance();
    // 发送消息
    const sendMessage = (event: any) => {
      // 1. 阻止textarea的enter换行
      event.preventDefault();
      // 2. 重新置消息为空
      message.value = '';
      // 3. 移置底端
      scrollIntoView();
    };
    const chatShow: any = inject('chatShow'); // 显示聊天内容
    // 显示面板
    const clickCloseIconHandler = (event: any) => {
      // 1. 阻止事件冒泡
      event.stopPropagation();
      // 2. 取反显示内容
      chatShow.value = !chatShow.value;
    };
    let input: any = null; // textarea html对象
    let btn: any = null; // 发送消息按钮
    onMounted(() => {
      input = document.getElementById('textInput');
      chatContainer = proxy.$refs.chatContainer;
      btn = document.getElementById('sendMessageBtn');
    });
    // 监听输入信息
    watch(
        () => message.value,
        (msg: any) => {
          // 实现自适应textarea - 原理：向body添加一个新的textarea，输入内容，获得新高度，重新赋值，再移除
          const hiddenArea = document.createElement('textarea');
          hiddenArea.classList.add(...input.classList);
          // hiddenArea.style.visibility = 'hidden';
          hiddenArea.value = msg;
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
          hiddenArea.remove();
        }
    );
    return {
      message,
      sendMessage,
      chatShow,
      clickCloseIconHandler
    }
  }
});
</script>

<style scoped>
.chat-container {
  height: calc(85% - 84px);
  z-index: 999;
  max-height: 600px;
  transition: width, height;
  transition-duration: 0.5s;
}

@media (min-width: 1000px) {
  .chat-container-show {
    width: 700px !important;
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