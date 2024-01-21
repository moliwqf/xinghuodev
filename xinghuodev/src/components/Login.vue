<template>
  <input type="text" v-model="username">
  <button @click="handleLogin">登录</button>
</template>

<script lang="ts">
import {defineComponent, ref, defineEmits} from "vue";
import {getSocket} from "@/components/socket-client";

export default defineComponent({
  name: 'Login',
  emits: ['showMain'],
  setup(props, {emit}) {
    const username = ref('');
    const handleLogin = () => {
      if (username.value.trim() === '') {
        return;
      }
      const socket = getSocket();
      socket.emit('login', username.value);
      emit('showMain');
    }
    return {
      username,
      handleLogin
    }
  }
});
</script>

<style scoped>

</style>