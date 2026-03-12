import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAndlGUpqNDwqtUfG8mEIKsN5OiEUz_CPU",
  authDomain: "formulario-expoorienta.firebaseapp.com",
  projectId: "formulario-expoorienta",
  storageBucket: "formulario-expoorienta.firebasestorage.app",
  messagingSenderId: "281757446580",
  appId: "1:281757446580:web:27e612e804d35014eac2e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };