
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC1vn1w_mMTdIONWHp97fL5pP-UceMuMuE",
  authDomain: "reactlinks-6a6fe.firebaseapp.com",
  projectId: "reactlinks-6a6fe",
  storageBucket: "reactlinks-6a6fe.appspot.com",
  messagingSenderId: "711333929983",
  appId: "1:711333929983:web:0666eadff76e4133c73dca"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export {
  auth,
  db
}