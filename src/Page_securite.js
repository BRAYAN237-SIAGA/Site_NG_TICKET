
import { initializeApp } from "firebase/app";

import { getAuth,signInWithEmailAndPassword  } from "firebase/auth";

import { getFirestore,doc,collection,query,getDocs,where,deleteDoc,updateDoc,addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFERME8CyH09LWGnb0tOo-WEZZaB3YgoI",
  authDomain: "voyage-essaie.firebaseapp.com",
  databaseURL: "https://voyage-essaie-default-rtdb.firebaseio.com",
  projectId: "voyage-essaie",
  storageBucket: "voyage-essaie.firebasestorage.app",
  messagingSenderId: "534600678204",
  appId: "1:534600678204:web:078b496fa178faf40bfc39"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const connecter = document.getElementById("connecter");

connecter.addEventListener("click",function(event){
    event.preventDefault();
    const motpasse = document.getElementById("motpasse").value;

    if(motpasse == "123456"){
        alert("Soyez le bienvenue dans la page de controle de l'equipe NG_travel");
        window.location.href ="Page_controle.html";
    }else{
        alert("Mot passe incorrect .");
    }



});