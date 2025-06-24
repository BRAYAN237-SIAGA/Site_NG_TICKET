
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
    const email = document.getElementById("email").value;
    const motpasse = document.getElementById("motpasse").value;

    signInWithEmailAndPassword(auth, email, motpasse)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

          const uid = user.uid;
          const infoRef =collection(db,"AGENCES");
          const final = doc(infoRef,uid);
          const but = collection(final,"INFORMATION");

           getDocs(but).then(querySnapshot =>{
          querySnapshot.forEach(doc =>{
            const info = doc.data();
            
            if(info.status == "invalider"){
                alert("Votre compte n'est pas valide pour le moment,veuillez contacter l'equipe de NG_TICKET");
            }else if(info.status == "valider"){
                alert("votre connection a ete faite avec succes");
                window.location.href ="Site_Accueil_VoyageUrbain.html";
            }
        
          });
        }).catch(error =>   
        {
                console.log('Aucune utilisateur connecte ',error);
        });

    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert('erreur de connection : ${errorMessage}')
  });


});