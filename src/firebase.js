import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { ref, onUnmounted, computed } from 'vue'

firebase.initializeApp({
    apiKey: "AIzaSyAjXpgxeMx0699DvZAD_KiuEA9v83aRkTc",
    authDomain: "chat-vue-a30eb.firebaseapp.com",
    projectId: "chat-vue-a30eb",
    storageBucket: "chat-vue-a30eb.appspot.com",
    messagingSenderId: "158174792831",
    appId: "1:158174792831:web:0e99af7d8b9b7396e4c34a"
})

const auth = firebase.auth()

export function useAuth() {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  const isLogin = computed(() => user.value !== null)

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider)
  }
  const signOut = () => auth.signOut()

  return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)

export function useChat() {
  const messages = ref([])
  const unsubscribe = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(unsubscribe)

  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage }
}