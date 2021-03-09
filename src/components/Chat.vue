<template>
  <div v-if="isLogin" class="container mt-20">
    <button class="btn btn-dark"> {- </button>
    <img :src="user.photoURL">
    <span>{{user.displayName}}</span>
  </div>
  <div class="overflow-auto">
    <div class="container-sm mt-20">
      <Message
        v-for="{ id, text, userPhotoURL, userName, userId, createdAt } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
        :createdAt="createdAt.toDate()"
      >
        {{ text }}
      </Message>
    </div>
  </div>
  
  <div class="container-sm mt-20">
    <form v-if="isLogin" @submit.prevent="send">
      <input v-model="message" placeholder="Message" required />
      <button class="btn btn-secondary" type="submit">
        Send
      </button>
    </form>
  </div>
  
  
</template>
<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'
import Message from './Message.vue'
export default {
  components: { Message },
  setup() {
    const { user, isLogin } = useAuth()
    const { messages, sendMessage } = useChat()
    const bottom = ref(null)
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' })
        })
      },
      { deep: true }
    )
    const message = ref('')
    const send = () => {
      sendMessage(message.value)
      message.value = ''
    }
    console.log(user)
    return { user, isLogin, messages, bottom, message, send }
  }
}
</script>

<style scoped>
.container{
  background-color: white;
  border-radius: 10px;
}

.overflow-auto .container-sm{
  height: auto;
  max-height: 680px;
  width: auto;
  text-align: left;
  overflow-y: auto;
  overflow: auto;
  background-color: #E6E6E6;
  border-radius: 5px;

}
.container-sm{
  background-color: white;
  border-radius: 10px;
  text-align: center;
  width: auto;
  margin-bottom: 10px;
}

input{
  width: auto;
  height: auto;
  border: 0px;
}

.btn{
  width: auto;
  height: auto;
  margin-left: 10px;
}
</style>