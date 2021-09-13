import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAKCfRjTQfDAeJ4m4NNIXvaECzGFVbI4LQ",
  authDomain: "waldo-style-app.firebaseapp.com",
  projectId: "waldo-style-app",
  storageBucket: "waldo-style-app.appspot.com",
  messagingSenderId: "627989325136",
  appId: "1:627989325136:web:8f4a8f67176b1ee667f855"
};

const Firebase = initializeApp(firebaseConfig);

export default Firebase;