import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBK2Ws6WEssgFMvlDtjankUCy0IlrDB7BY",
  authDomain: "habits-c273a.firebaseapp.com",
  projectId: "habits-c273a",
  storageBucket: "habits-c273a.appspot.com",
  messagingSenderId: "140246360973",
  appId: "1:140246360973:web:eaf7cd4d073e3a010893c4",
  measurementId: "G-TQC9XGVCMR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()