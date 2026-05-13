import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey:            "AIzaSyACnCVM9c8KwPEoL3Rcc2wnjTxkOlqdvCU",
  authDomain:        "gestion-etu-7c95d.firebaseapp.com",
  projectId:         "gestion-etu-7c95d",
  storageBucket:     "gestion-etu-7c95d.firebasestorage.app",
  messagingSenderId: "301233706748",
  appId:             "1:301233706748:web:b5f7f2dd6dc9de7240a979"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)