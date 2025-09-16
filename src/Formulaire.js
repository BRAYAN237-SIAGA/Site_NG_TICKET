  import { initializeApp } from "firebase/app";

  import { getAuth,createUserWithEmailAndPassword  } from "firebase/auth";

  import { getFirestore,setDoc,doc,collection } from "firebase/firestore";

  
import emailjs from 'emailjs-com';

 

  const firebaseConfig = {
    apiKey: "AIzaSyCFERME8CyH09LWGnb0tOo-WEZZaB3YgoI",
    authDomain: "voyage-essaie.firebaseapp.com",
    databaseURL: "https://voyage-essaie-default-rtdb.firebaseio.com",
    projectId: "voyage-essaie",
    storageBucket: "voyage-essaie.firebasestorage.app",
    messagingSenderId: "534600678204",
    appId: "1:534600678204:web:078b496fa178faf40bfc39"
  };



  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const  db = getFirestore(app)


  const creer = document.getElementById("creer");
  creer.addEventListener('click',function(event){
    event.preventDefault();

    

    const agence = document.getElementById("agence").value;
    const promoteur = document.getElementById("promoteur").value;
    const email = document.getElementById("email").value;
    const motpasse = document.getElementById("motpasse").value;
    const confirmmotpasse = document.getElementById("confirmmotpasse").value;
    const date = document.getElementById("date").value;
    const villed = document.getElementById("villed").value;
    const quartierd = document.getElementById("villea").value;
    const telephone = document.getElementById("telephone").value;
    const ville = document.getElementById("ville").value;
    const pays = document.getElementById("pays").value;

     creer.classList.add('loading');

  // Simulation d'un délai de traitement (ex: requête réseau)
    setTimeout(() => {
    creer.classList.remove('loading');
    }, 3000);

    
      emailjs.init("cKk2lRbauj7dEMLoK");

      emailjs.send("service_6nm9ol6","template_en2pelj", {
          name :agence,
          promoteur :promoteur,
          email :email,
          telephone :telephone,
          pays :pays,
          ville :ville
        });

    createUserWithEmailAndPassword(auth, email, motpasse,agence,promoteur,date,villed,quartierd,ville,pays,telephone)
    .then((userCredential) => {
      const user = userCredential.user;
      const docRef = doc(db,"AGENCES",user.uid);
      const sousRef = collection(docRef,"INFORMATION");

      setDoc(doc(sousRef),{
        agence : agence,
        promoteur :promoteur,
        date_inscription: date,
        ville_depart1:villed,
        quartier_depart1 : quartierd,
        ville:ville,
        pays : pays,
        telephone:telephone,
        motpasse : motpasse,
        email : user.email,
        uid : user.uid,
        status : "invalider",
      }).then(() =>{  

              const controle = collection(db,"CONTROLE");
                const controle1 = doc(controle,"AGENCES");
                const controle2 = collection(controle1,"NG_TICKET");

      setDoc(doc(controle2),{
        agence : agence,
        promoteur :promoteur,
        date_inscription : date,
        ville_depart1:villed,
        quartier_depart1 : quartierd,
        ville:ville,
        pays : pays,
        telephone:telephone,
        motpasse : motpasse,
        email : user.email,
        uid : user.uid,
        status : "invalider",
      }).then(() =>{
        
        alert("votre compte a ete bien enregistrer et Incription envoyé avec succès");
        window.location.href ="Connection.html"

      });
        });  


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    alert('verifier votre connexion ou votre formulaire')
    });
  });


  