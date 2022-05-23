import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Insira abaixo a configuração do Firebase do seu app da Web

// Cole na linha acima

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

const auth = getAuth()
const db = getFirestore()
const storage = getStorage()

export { auth, db, storage }
