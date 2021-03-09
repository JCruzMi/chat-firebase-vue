<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <h1><strong>Huan</strong> Chat online</h1>
      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL"/>
        <button type="button" class="btn btn-warning" @click="signOut">
          Sign Out
        </button>
        
      </div>

      <button v-else type="button" class="btn btn-secondary" @click="signIn">
        Sign in
      </button>
    </div>
  </nav>
  
</template>

<script>
import Avatar from './Avatar.vue'

import { useAuth } from '@/firebase'
export default {
  components: { Avatar },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  }
}
</script>

<style scoped>
strong{
  color: rgb(223, 143, 53);  
}

h1 {
  color: white;
  text-align: center;
}
 
.btn{
    margin-left: 10px;
}

span {
  color: white;
}

.login{
    display: inline-block;
    align-items: center;   
}

nav{
  margin-bottom: 10px;
}
</style>