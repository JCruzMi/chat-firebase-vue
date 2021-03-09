<template>
  <div class="overflow-auto">
    <div class="container-sm mt-20">
      <div class="mx-5">
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
  </div>
    <div class="container">
      <div class="container-sm">
        <form v-if="isLogin" @submit.prevent="send">
          <input v-model="message" placeholder="Message" required />
          <br>
          <button class="btn btn-secondary" type="submit">
            Send
          </button>
        </form>
      </div>
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
    return { user, isLogin, messages, bottom, message, send }
  }
}
</script>

<style scoped>
.overflow-auto .container-sm{
  height: 700px;
  overflow-y: auto;
  overflow: auto;
  scroll-behavior: smooth;
  background-color: #E6E6E6;
  border-radius: 5px;

}
.container{
  align-items: center;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

input{
  height: 40px;
  width: 90%;
  border-radius: 5px;
}

.btn{
  margin-top: 10px;
}
</style>