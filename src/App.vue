<template>
  <Nav />
  <Chat />
  <Footer />
</template>

<script>
import Nav from '@/components/Nav.vue'
import Chat from '@/components/Chat.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: { Nav, Chat, Footer}
}
</script>

<style>
body{
  background-color: #39393A;
}
</style>