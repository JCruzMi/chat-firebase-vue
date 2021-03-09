<template>
  <div class="message">
    <div :class="sender ? 'flex-direction-row-reverse' : ''">
      <div class="container">
        <div class="row">
          <div v-if="!sender" class="col-auto">
            <Avatar class="avatar" :src="photoUrl"/>
          </div>
          <div class="col">
            <div :class="sender ? 'shadow p-2 mb-5 bg-info rounded' : 'shadow p-3 mb-5 bg-white rounded'">
              <slot />
              <br>
              <span v-if="!sender">Send by: {{ name }}</span>
              <p>{{createdAt}}</p>
            </div>
          </div>
          <div v-if="sender" class="col-auto">
            <Avatar class="avatar" :src="photoUrl"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false },
    createdAt: {type: String, default: ''}
  }
}
</script>

<style scoped>

.message{
  margin-top: 20px;
  display: flexbox;
  margin-bottom: -30px;
}

.avatar{
  width: 40px;
  height: 40px;
}


p,span{
  margin-top: 5px;
  font-size: 12px;
  font-weight: bold;
  opacity: 0.5;
}
</style>