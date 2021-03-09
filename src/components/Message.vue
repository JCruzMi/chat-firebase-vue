<template>
  <div class="message">
    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <div class="container">
          <div class="row">
            <div class="col-1">
              <Avatar class="avatar mt-5" :src="photoUrl" />
            </div>
            <div class="col">
              <div class="shadow-sm p-2 m-4 rounded" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
                <slot />
                <br>
                <span v-if="!sender">Send by: {{ name }}</span>
                <p>{{createdAt}}</p>
            </div>
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
  display: flexbox;
  margin-bottom: -20px;
}
.shadow-sm{
  display: flexbox;
  background-color: #ecf2f3;
}
.avatar{
  display: inline-block;
  margin-right: 10px;
}

p,span{
  margin-top: 5px;
  font-size: 12px;
  font-weight: bold;
  opacity: 0.5;
}
</style>