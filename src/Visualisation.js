import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";

import { getFirestore,doc,collection,query,getDocs,where,deleteDoc,updateDoc,addDoc,onSnapshot } from "firebase/firestore";

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
  const db = getFirestore(app);
  const auth = getAuth(app);

  auth.onAuthStateChanged(user =>{
    if(user){
      const uid = user.uid;
      const infoRef =collection(db,"AGENCES");
      const final = doc(infoRef,uid);
      const but = collection(final,"INFORMATION");
        getDocs(but).then(querySnapshot =>{
          querySnapshot.forEach(doc =>{
            const info = doc.data();
        if(info.status == "valider"){
            document.getElementById("nom").innerHTML = info.uid;
        }else if(info.status == "invalider"){
            document.getElementById("nom").innerHTML = "";

        }
          });
        }).catch(error =>   
        {
                console.log('Aucune utilisateur connecte ',error);
              });
    }else{
          console.log('Aucun utilisateur connecte');
          }
  });


  auth.onAuthStateChanged(user =>{
    if(user){
      const uid = user.uid;
      const infoRef =collection(db,"AGENCES");
      const final = doc(infoRef,uid);
      const but = collection(final,"INFORMATION");

      getDocs(but).then(querySnapshot =>{
          querySnapshot.forEach(doct =>{
            const info = doct.data();

             if(info.status == "valider"){
            const buRef = collection(db,"AGENCES");
            const busfirst = doc(buRef,uid);
            const bussecond = collection(busfirst,info.agence);
            const busthird = doc(bussecond,"BUS");
            const busend = collection(busthird,"DETAILS");



            const tableau_bus = document.getElementById("tableau_1");
            tableau_bus.style.width ="100%";
            tableau_bus.style.borderCollapse = "collapse";
        

            const ligneEntete = document.createElement("tr");

            const celluleEntete = document.createElement("th");
            celluleEntete.textContent = "Numero bus";
            const celluleEntete0 = document.createElement("th");
            celluleEntete0.textContent = "Etat";
            const celluleEntete1 = document.createElement("th");
            celluleEntete1.textContent = "Categorie";
            const celluleEntete2 = document.createElement("th");
            celluleEntete2.textContent = "Chauffeur";
            const celluleEntete3 = document.createElement("th");
            celluleEntete3.textContent = "Date voyage";
            const celluleEntete4 = document.createElement("th");
            celluleEntete4.textContent = "Heure depart";
            const celluleEntete5 = document.createElement("th");
            celluleEntete5.textContent = "Immatriculation";
            const celluleEntete6 = document.createElement("th");
            celluleEntete6.textContent = "Code bus";
            const celluleEntete7 = document.createElement("th");
            celluleEntete7.textContent = "Nombre siege";
            const celluleEntete8 = document.createElement("th");
            celluleEntete8.textContent = "Prix ticket";
            const celluleEntete9 = document.createElement("th");
            celluleEntete9.textContent = "Quartier depart";
            const celluleEntete10 = document.createElement("th");
            celluleEntete10.textContent = "Quartier arriver";
            const celluleEntete11 = document.createElement("th");
            celluleEntete11.textContent = "trajet";
            const celluleEntete12 = document.createElement("th");
            celluleEntete12.textContent = "Ville depart";
            const celluleEntete13 = document.createElement("th");
            celluleEntete13.textContent = "ville arriver";
            const celluleEntete14 = document.createElement("th");
            celluleEntete14.textContent = "Place prise";
            const celluleEntete15 = document.createElement("th");
            celluleEntete15.textContent = "Status";
            const celluleEntete16 = document.createElement("th");
            celluleEntete16.textContent = "Action_1";
            const celluleEntete17 = document.createElement("th");
            celluleEntete17.textContent = "Action_2";

            ligneEntete.appendChild(celluleEntete);
            ligneEntete.appendChild(celluleEntete0);
            ligneEntete.appendChild(celluleEntete1);
            ligneEntete.appendChild(celluleEntete2);
            ligneEntete.appendChild(celluleEntete3);
            ligneEntete.appendChild(celluleEntete4);
            ligneEntete.appendChild(celluleEntete5);
            ligneEntete.appendChild(celluleEntete6);
            ligneEntete.appendChild(celluleEntete7);
            ligneEntete.appendChild(celluleEntete8);
            ligneEntete.appendChild(celluleEntete9);
            ligneEntete.appendChild(celluleEntete10);
            ligneEntete.appendChild(celluleEntete11);
            ligneEntete.appendChild(celluleEntete12);
            ligneEntete.appendChild(celluleEntete13);
            ligneEntete.appendChild(celluleEntete14);
            ligneEntete.appendChild(celluleEntete15);
            ligneEntete.appendChild(celluleEntete16);
            ligneEntete.appendChild(celluleEntete17);
            tableau_bus.appendChild(ligneEntete);



            getDocs(busend).then((querySnapshot) => {
              querySnapshot.forEach((docte) =>{
                const bus = docte.data();
                const iddocbus = docte.id;


                  
                const userRef1 = collection(db,"CONTROLE");
                const userfirst2 = doc(userRef1,"PAIEMENT");
                const usersecond3 = collection(userfirst2,"INFORMATION");

                const compteur_place_filtre = query(usersecond3,where("code_bus", "==",bus.motpassebus));

                getDocs(compteur_place_filtre).then((filtre) =>{
                  const compteur_place = filtre.docs.length;

                  const ligne = document.createElement("tr");

                const cellule = document.createElement("td");
                cellule.textContent = bus.numerobus;
                const cellule0 = document.createElement("td");
                cellule0.textContent = bus.etat;
                const cellule1 = document.createElement("td");
                cellule1.textContent = bus.categories;
                const cellule2 = document.createElement("td");
                cellule2.textContent = bus.chauffeur;
                const cellule3 = document.createElement("td");
                cellule3.textContent = bus.date_voyage;
                const cellule4 = document.createElement("td");
                cellule4.textContent = bus.heure_depart;
                const cellule5 = document.createElement("td");
                cellule5.textContent = bus.immatriculation;
                const cellule6 = document.createElement("td");
                cellule6.textContent = bus.motpassebus;
                const cellule7 = document.createElement("td");
                cellule7.textContent = bus.nombre_siege;
                const cellule8 = document.createElement("td");
                cellule8.textContent = bus.prix_ticket;
                const cellule9 = document.createElement("td");
                cellule9.textContent = bus.quartier_depart;
                const cellule10 = document.createElement("td");
                cellule10.textContent = bus.quartier_arriver;
                const cellule11 = document.createElement("td");
                cellule11.textContent = bus.trajet;
                const cellule12 = document.createElement("td");
                cellule12.textContent = bus.ville_depart;
                const cellule13 = document.createElement("td");
                cellule13.textContent = bus.ville_arriver;
                const cellule14 = document.createElement("td");
                cellule14.textContent = compteur_place;
                const cellule15 = document.createElement("td");
                cellule15.textContent = bus.status;
                const cellule16 = document.createElement("td");
                const cellule17 = document.createElement("td");

                const bouton_voir = document.createElement("button");
                bouton_voir.textContent = "Voir";
                const bouton_reduire = document.createElement("button");
                bouton_reduire.textContent = "Reduire";
                bouton_reduire.style.display = "none";
                bouton_reduire.style.width= "80px";
                const bouton_ajouter = document.createElement("button");
                bouton_ajouter.textContent = "Ajouter";
                bouton_ajouter.style.display = "none";
                bouton_ajouter.style.width= "80px";
                bouton_voir.style.width= "80px";
                bouton_voir.style.color= "white";
                bouton_voir.style.borderRadius= "10px";
                bouton_voir.style.fontWeight="bold";
                bouton_voir.style.backgroundColor= "#F96A24";
                bouton_voir.style.boxShadow="3px 3px 3px#efdcd2";
                bouton_voir.style.margin= "0 auto";
        
                const bouton_supbus = document.createElement("button");
                bouton_supbus.textContent = "Supprimer";
                bouton_supbus.style.width= "80px";
                bouton_supbus.style.borderRadius= "10px";
                bouton_supbus.style.fontWeight="bold";
                bouton_supbus.style.color="black";
                bouton_supbus.style.backgroundColor= "#E8E8E8";
                bouton_supbus.style.boxShadow="3px 3px 3px #e4e2de";
                bouton_supbus.style.margin= "0 auto";

                const bouton_ouvrir = document.createElement("button");
                bouton_ouvrir.textContent = "Ouvrir";
                bouton_ouvrir.style.width= "80px";
                bouton_ouvrir.style.borderRadius= "10px";
                bouton_ouvrir.style.fontWeight="bold";
                bouton_ouvrir.style.color="black";
                bouton_ouvrir.style.backgroundColor= "#20ee3f";
                bouton_ouvrir.style.boxShadow="3px 3px 3px rgb(136, 202, 146)";
                bouton_ouvrir.style.margin= "0 auto";

                const bouton_fermer = document.createElement("button");
                bouton_fermer.textContent = "Fermer";
                bouton_fermer.style.width= "80px";
                bouton_fermer.style.borderRadius= "10px";
                bouton_fermer.style.fontWeight="bold";
                bouton_fermer.style.color="black";
                bouton_fermer.style.backgroundColor= "#f31313";
                bouton_fermer.style.boxShadow="3px 3px 3px rgb(246, 141, 141)";
                bouton_fermer.style.margin= "0 auto";

                cellule16.appendChild(bouton_ouvrir);
                cellule16.appendChild(bouton_fermer);
                cellule17.appendChild(bouton_voir);
                cellule17.appendChild(bouton_supbus);
                cellule17.appendChild(bouton_reduire);
                cellule17.appendChild(bouton_ajouter);

                ligne.append(cellule);
                ligne.append(cellule0);
                ligne.append(cellule1);
                ligne.append(cellule2);
                ligne.append(cellule3);
                ligne.append(cellule4);
                ligne.append(cellule5);
                ligne.append(cellule6);
                ligne.append(cellule7);
                ligne.append(cellule8);
                ligne.append(cellule9);
                ligne.append(cellule10);
                ligne.append(cellule11);
                ligne.append(cellule12);
                ligne.append(cellule13);
                ligne.append(cellule14);
                ligne.append(cellule15);
                ligne.append(cellule16);
                ligne.append(cellule17);

                tableau_bus.appendChild(ligne);  

                bouton_ouvrir.addEventListener("click", ()=>{
                  document.getElementById('dialog2').style.display = 'block';
                                    
                  document.getElementById('annuler2').addEventListener('click', ()=> {
                    document.getElementById('dialog2').style.display = 'none';
                  });
                  
                  document.getElementById('acceder2').addEventListener('click', ()=> {
                    const busaccepter = doc(busend,iddocbus);
                    updateDoc(busaccepter,{
                        status : "ouvert"
                    });
                    document.getElementById('dialog2').style.display = 'none';
                      alert("Le bus est desormais ouvert .");
                      onSnapshot(collection(busthird, "DETAILS"), (snapshot) => {
                        const users = snapshot.docs.map(doc => doc.data());
                        console.log("Données à jour :", users);
                        setTimeout(function() {
                        location.reload(true);
                      }, 1800);
                      });
                  });                 
                });


                bouton_fermer.addEventListener("click", ()=>{
                  document.getElementById('dialog3').style.display = 'block';
                                    
                  document.getElementById('annuler3').addEventListener('click', ()=> {
                    document.getElementById('dialog3').style.display = 'none';
                  });
                  
                  document.getElementById('acceder3').addEventListener('click', ()=> {
                    const busaccepter = doc(busend,iddocbus);
                    updateDoc(busaccepter,{
                        status : "fermé "
                    });
                    document.getElementById('dialog3').style.display = 'none';
                        alert("Le bus est desormais fermé .");
                        onSnapshot(collection(busthird, "DETAILS"), (snapshot) => {
                        const users = snapshot.docs.map(doc => doc.data());
                        console.log("Données à jour :", users);
                        setTimeout(function() {
                        location.reload(true);
                      }, 1800);
                      });
                  });                 
                });
                   
                bouton_supbus.addEventListener("click", ()=>{
                  document.getElementById('dialog').style.display = 'block';
                                    
                  document.getElementById('annuler').addEventListener('click', ()=> {
                    document.getElementById('dialog').style.display = 'none';
                  });
                  
                  document.getElementById('acceder').addEventListener('click', ()=> {
                    const bussup = doc(busend,iddocbus);
                    deleteDoc(bussup).then(()=>{

                    });
                    document.getElementById('dialog').style.display = 'none';
                        onSnapshot(collection(busthird, "DETAILS"), (snapshot) => {
                        const users = snapshot.docs.map(doc => doc.data());
                        console.log("Données à jour :", users);
                        setTimeout(function() {
                        location.reload(true);
                      }, 1800);
                      });
                  });                 
                });
        
        
                bouton_voir.addEventListener("click" , ()=>{
                  const codebus = bus.motpassebus;
                  const tableau_user = document.getElementById("tableau_user");
                  tableau_user.innerHTML="";
                  tableau_user.style.width ="100%";
                  tableau_user.style.borderCollapse = "collapse";

                  const ligneEnteteUser = document.createElement("tr");

                  const celluleEnteteUser1 = document.createElement("th");
                  celluleEnteteUser1.textContent = "Nom";
                  const celluleEnteteUser2 = document.createElement("th");
                  celluleEnteteUser2.textContent = "Numero telephone";
                  const celluleEnteteUser3 = document.createElement("th");
                  celluleEnteteUser3.textContent = "Code ticket";
                  const celluleEnteteUser4 = document.createElement("th");
                  celluleEnteteUser4.textContent = "Code bus";
                  const celluleEnteteUser5 = document.createElement("th");
                  celluleEnteteUser5.textContent = "Immatriculation";
                  const celluleEnteteUser6 = document.createElement("th");
                  celluleEnteteUser6.textContent = "Date voyage";
                  const celluleEnteteUser7 = document.createElement("th");
                  celluleEnteteUser7.textContent = "Numero place";
                  const celluleEnteteUser8 = document.createElement("th");
                  celluleEnteteUser8.textContent = "categories";
                  const celluleEnteteUser9 = document.createElement("th");
                  celluleEnteteUser9.textContent = "Prix ticket";
                  const celluleEnteteUser10 = document.createElement("th");
                  celluleEnteteUser10.textContent = "Quartier depart";
                  const celluleEnteteUser11 = document.createElement("th");
                  celluleEnteteUser11.textContent = "Quartier arriver";
                  const celluleEnteteUser12 = document.createElement("th");
                  celluleEnteteUser12.textContent = "Ville depart";
                  const celluleEnteteUser13 = document.createElement("th");
                  celluleEnteteUser13.textContent = "Ville arriver";
                  const celluleEnteteUser14 = document.createElement("th");
                  celluleEnteteUser14.textContent = "Etat";
  
  
                  ligneEnteteUser.appendChild(celluleEnteteUser1);
                  ligneEnteteUser.appendChild(celluleEnteteUser2);
                  ligneEnteteUser.appendChild(celluleEnteteUser3);
                  ligneEnteteUser.appendChild(celluleEnteteUser4);
                  ligneEnteteUser.appendChild(celluleEnteteUser5);
                  ligneEnteteUser.appendChild(celluleEnteteUser6);
                  ligneEnteteUser.appendChild(celluleEnteteUser7);
                  ligneEnteteUser.appendChild(celluleEnteteUser8);
                  ligneEnteteUser.appendChild(celluleEnteteUser9);
                  ligneEnteteUser.appendChild(celluleEnteteUser10);
                  ligneEnteteUser.appendChild(celluleEnteteUser11);
                  ligneEnteteUser.appendChild(celluleEnteteUser12);
                  ligneEnteteUser.appendChild(celluleEnteteUser13);
                  ligneEnteteUser.appendChild(celluleEnteteUser14);
  
                  tableau_user.appendChild(ligneEnteteUser);



                  const userRef = collection(db,"CONTROLE");
                  const userfirst = doc(userRef,"PAIEMENT");
                  const usersecond = collection(userfirst,"INFORMATION");

                  const q = query(usersecond,where("code_bus", "==",codebus));


                  bouton_ajouter.addEventListener("click",()=>{
                    document.getElementById('dialog1').style.display = 'block';
                    
                    document.getElementById('annuler1').addEventListener('click', function() {
                      document.getElementById('dialog1').style.display = 'none';
                    });
                    
                    document.getElementById('acceder1').addEventListener('click', function() {
                      let nom_voyageur = document.getElementById("nom_voyageur");
                      let numero_voyageur = document.getElementById("numero_voyageur");

                      const userRef_ajouter = collection(db,"CONTROLE");
                      const userfirst_ajouter = doc(userRef_ajouter,"PAIEMENT");
                      const usersecond_ajouter = collection(userfirst_ajouter,"INFORMATION");

                        function generateRandomSum(){
                          const min = 100000;
                          const max = 999999;
                          return Math.floor(Math.random()*(max - min + 1)) + min;
                      };
                      const randomSum_ajouter = generateRandomSum();
  
                      addDoc(usersecond_ajouter,{
                        immatriculation_bus : bus.immatriculation,
                        nom : nom_voyageur.value,
                        numero : numero_voyageur.value,
                        categories :bus.categories,
                        ville_depart :bus.ville_depart,
                        quartier_depart : bus.quartier_depart,
                        ville_arriver : bus.ville_arriver,
                        quartier_arriver :bus.quartier_arriver,
                        prix_ticket :bus.prix_ticket,
                        date_voyage: bus.date_voyage,
                        code_bus: bus.motpassebus,
                        codeticket: randomSum_ajouter,
                        place_prise: bus.place_prise + 1,
                        check: "VALIDER",
                      });
                    
                        const docbus = doc(busend,iddocbus);
                        updateDoc(docbus,{
                          place_prise:bus.place_prise+1
                        });

                      document.getElementById('dialog1').style.display = 'none';
                      alert("Voyageur ajouté avec succes.");
                        onSnapshot(collection(busthird, "DETAILS"), (snapshot) => {
                        const users = snapshot.docs.map(doc => doc.data());
                        console.log("Données à jour :", users);
                        setTimeout(function() {
                        location.reload(true);
                      }, 2000);
                      });

                    });
                  });

                  getDocs(q).then((querySnapshotuser) =>{
                    querySnapshotuser.forEach((docuser) =>{

                      const iddoc = docuser.id;
                      const sup = doc(usersecond,iddoc);

                      const user = docuser.data();
            
                      const ligneuser = document.createElement("tr");
  
                      const celluleuser1 = document.createElement("td");
                      celluleuser1.textContent = user.nom;
                      const celluleuser2 = document.createElement("td");
                      celluleuser2.textContent = user.numero;
                      const celluleuser3 = document.createElement("td");
                      celluleuser3.textContent = user.codeticket;
                      const celluleuser4 = document.createElement("td");
                      celluleuser4.textContent = user.code_bus;
                      const celluleuser5 = document.createElement("td");
                      celluleuser5.textContent = user.immatriculation_bus;
                      const celluleuser6 = document.createElement("td");
                      celluleuser6.textContent = user.date_voyage;
                      const celluleuser7 = document.createElement("td");
                      celluleuser7.textContent = user.place_prise;
                      const celluleuser8 = document.createElement("td");
                      celluleuser8.textContent = user.categories;
                      const celluleuser9 = document.createElement("td");
                      celluleuser9.textContent = user.prix_ticket;
                      const celluleuser10 = document.createElement("td");
                      celluleuser10.textContent = user.quartier_depart;
                      const celluleuser11 = document.createElement("td");
                      celluleuser11.textContent = user.quartier_arriver;
                      const celluleuser12 = document.createElement("td");
                      celluleuser12.textContent = user.ville_depart;
                      const celluleuser13 = document.createElement("td");
                      celluleuser13.textContent = user.ville_arriver;
                      const celluleuser14 = document.createElement("td");

                      const bouton_etat = document.createElement("button");
                      bouton_etat.textContent = "NG_TICKET";
                      bouton_etat.style.width= "100px";
                      bouton_etat.style.borderRadius= "10px";
                      bouton_etat.style.color="black";
                      bouton_etat.style.fontWeight="bold";
                      bouton_etat.style.backgroundColor= "#E8E8E8";
                      bouton_etat.style.boxShadow="3px 3px 3px #e4e2de";
                      bouton_etat.style.margin= "0 auto";
  
                      ligneuser.append(celluleuser1);
                      ligneuser.append(celluleuser2);
                      ligneuser.append(celluleuser3);
                      ligneuser.append(celluleuser4);
                      ligneuser.append(celluleuser5);
                      ligneuser.append(celluleuser6);
                      ligneuser.append(celluleuser7);
                      ligneuser.append(celluleuser8);
                      ligneuser.append(celluleuser9);
                      ligneuser.append(celluleuser10);
                      ligneuser.append(celluleuser11);
                      ligneuser.append(celluleuser12);
                      ligneuser.append(celluleuser13);
                      ligneuser.append(bouton_etat);
  
                      tableau_user.appendChild(ligneuser);

                      const searchInput = document.getElementById('searchInput');

                    searchInput.addEventListener('input', function () {
                      const filter = this.value.toLowerCase();
                      const rows = tableau_user.getElementsByTagName('tr');

                      Array.from(rows).forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(filter) ? '' : 'none';
                      });
                    });



                      if(user.check == "VALIDER"){
                        
                        bouton_etat.style.backgroundColor= " #F96A24";
                        bouton_etat.style.boxShadow="3px 3px 3px #efdcd2";
                      }else if(user.check == "INVALIDER"){
                      
                        bouton_etat.style.backgroundColor= " #E8E8E8";
                        bouton_etat.style.boxShadow="3px 3px 3px #e4e2de";
                      }
            
                    });
                  });
                  tableau_user.style.display="block";
                  bouton_voir.style.display ="none";
                  bouton_supbus.style.display="none";
                  bouton_reduire.style.display ="block";
                  bouton_ajouter.style.display ="block";
                  bouton_voir.style.width= "80px";
                  bouton_reduire.style.borderRadius= "10px";
                  bouton_reduire.style.fontWeight="bold";
                  bouton_reduire.style.color ="white";
                  bouton_reduire.style.backgroundColor= "#F96A24";
                  bouton_reduire.style.boxShadow="3px 3px 3px  #efdcd2";
                  bouton_ajouter.style.margin= "0 auto";
                  bouton_ajouter.style.borderRadius= "10px";
                  bouton_ajouter.style.fontWeight="bold";
                  bouton_ajouter.style.color ="black";
                  bouton_ajouter.style.backgroundColor= "#E8E8E8";
                  bouton_ajouter.style.boxShadow="3px 3px 3px  #efdcd2";
                  bouton_ajouter.style.margin= "0 auto";
                });

                bouton_reduire.addEventListener("click",()=>{
                const tableau_user = document.getElementById("tableau_user");
                tableau_user.style.display="none";
                bouton_voir.style.display ="block";
                bouton_supbus.style.display ="block";
                bouton_reduire.style.display ="none";
                bouton_ajouter.style.display ="none";
              });

              



                });
            });
          });

            }else if(info.status == "invalider"){
            document.getElementById("nom").innerHTML = "";

            }


        });
    }).catch(error =>{
    console.log('Aucune utilisateur connecte ',error);
   });
    }else{
        console.log('Aucun utilisateur connecte');
    }
  });

auth.onAuthStateChanged(user =>{
  if(user){
      const uid = user.uid;
      const infoRef =collection(db,"AGENCES");
      const final = doc(infoRef,uid);
      const but = collection(final,"INFORMATION");
 getDocs(but).then(querySnapshot =>{
  querySnapshot.forEach(doct =>{
      const info = doct.data();

      if(info.status == "valider"){
      const destinationRef = collection(db,"AGENCES");
      const destinationfirst = doc(destinationRef,uid);
      const destinationsecond = collection(destinationfirst,info.agence);
      const destinationfirst1 = doc(destinationsecond,"DESTINATION");
      const destinationsecond2 = collection(destinationfirst1,"INFORMATION");
  
      getDocs(destinationsecond2).then((querySnapshot) => {
        
        const tbody_2 =document.getElementById("tbody_2");
        querySnapshot.forEach((docte) =>{

          const docdestination = docte.id;
  
          const tr = document.createElement("tr");
  
          const tdnomagence = document.createElement("td");
          const tdville1 = document.createElement("td");
          const tdville2 = document.createElement("td");
          const tdquartier1 = document.createElement("td");
          const tdquartier2 = document.createElement("td");
          const tddevice = document.createElement("td");  
          const tdactiondestination = document.createElement("td");
  
          tdnomagence.textContent = docte.data().nomagence;
          tdville1.textContent = docte.data().ville1;
          tdville2.textContent = docte.data().ville2;
          tdquartier1.textContent = docte.data().quartier1;
          tdquartier2.textContent = docte.data().quartier2;
          tddevice.textContent = docte.data().device;

          const bouton_supdestination = document.createElement("button");
          bouton_supdestination.textContent = "Supprimer";
          bouton_supdestination.style.width= "80px";
          bouton_supdestination.style.fontWeight="bold";
          bouton_supdestination.style.borderRadius= "10px";
          bouton_supdestination.style.color="black";
          bouton_supdestination.style.backgroundColor= "#E8E8E8";
          bouton_supdestination.style.boxShadow="3px 3px 3px  #e4e2de";


  
          tr.appendChild(tdnomagence);
          tr.appendChild(tdville1);
          tr.appendChild(tdville2);
          tr.appendChild(tdquartier1);
          tr.appendChild(tdquartier2);
          tr.appendChild(tddevice);
          tr.appendChild(bouton_supdestination);
  
          tbody_2.appendChild(tr);

          bouton_supdestination.addEventListener('click', function() {
            document.getElementById('dialog').style.display = 'block';

            document.getElementById('annuler').addEventListener('click', function() {
              document.getElementById('dialog').style.display = 'none';
            });
            
            document.getElementById('acceder').addEventListener('click', function() {
              
            const destinationsup = doc(destinationsecond2,docdestination);

            deleteDoc(destinationsup).then(()=>{ 
            });  
            
            const destinationglobal1 = collection(db,"CONTROLE");
            const destinationglobal2 = doc(destinationglobal1,"DESTINATION");
            const destinationglobal3 = collection(destinationglobal2,"NG_TRAVEL");
  
            const difdestination = query(destinationglobal3,where( "codesup","==",docte.data().codesup));
  
            getDocs(difdestination).then((querySnapshotdest) =>{
              querySnapshotdest.forEach((docdest) =>{
                const iddocdestinationglobal = docdest.id;
  
                const destinationglobalsup = doc(destinationglobal3,iddocdestinationglobal);
             
              deleteDoc(destinationglobalsup).then(()=>{
  
              });
  
              });
            });
              document.getElementById('dialog').style.display = 'none';
                                    setTimeout(function() {
                        location.reload(true);
                      }, 1800);
              
            });

          });
          
        });
      });
      }else if(info.status == "invalider"){
            document.getElementById("nom").innerHTML = "";

      }




  });
 }).catch(error =>{
  console.log('Aucune utilisateur connecte ',error);
 });
  }else{
      console.log('Aucun utilisateur connecte');
  }
});



    auth.onAuthStateChanged(user =>{
      if(user){
          const uid = user.uid;
          const infoRef =collection(db,"AGENCES");
          const final = doc(infoRef,uid);
          const but = collection(final,"INFORMATION");
     getDocs(but).then(querySnapshot =>{
      querySnapshot.forEach(doct =>{
          const info = doct.data();

          if(info.status == "valider"){
          const categoriesRef = collection(db,"AGENCES");
          const categoriesfirst = doc(categoriesRef,uid);
          const categoriessecond = collection(categoriesfirst,info.agence);
          const categoriesthird = doc(categoriessecond,"CATEGORIES");
          const categoriessend = collection(categoriesthird,"DETAILS");
      
          getDocs(categoriessend).then((querySnapshot) => {
            
            const tbody_3 =document.getElementById("tbody_3");
            querySnapshot.forEach((docte) =>{
              const doccategorie = docte.id;
      
              const tr = document.createElement("tr");
      
              const tdnomagence = document.createElement("td");
              const tdnomcategorie = document.createElement("td");
              const tdactioncategorie = document.createElement("td");
      
              tdnomagence.textContent = docte.data().nomagence;
              tdnomcategorie.textContent = docte.data().nomcategorie;

              const bouton_supcategorie = document.createElement("button");
              bouton_supcategorie.textContent = "Supprimer";
              bouton_supcategorie.style.width= "80px";
              bouton_supcategorie.style.borderRadius= "10px";
              bouton_supcategorie.style.fontWeight="bold";
              bouton_supcategorie.style.color="black";
              bouton_supcategorie.style.backgroundColor= "#E8E8E8";
              bouton_supcategorie.style.boxShadow="3px 3px 3px  #e4e2de";

              
          
      
              tr.appendChild(tdnomagence);
              tr.appendChild(tdnomcategorie);
              tr.appendChild(bouton_supcategorie);
      
              tbody_3.appendChild(tr);

              
              bouton_supcategorie.addEventListener('click', function() {
                document.getElementById('dialog').style.display = 'block';

                  
              document.getElementById('annuler').addEventListener('click', function() {
                document.getElementById('dialog').style.display = 'none';
              });
              
              document.getElementById('acceder').addEventListener('click', function() {
                const categoriesup = doc(categoriessend,doccategorie);
                deleteDoc(categoriesup).then(()=>{
      
                }); 
                document.getElementById('dialog').style.display = 'none';
                                      setTimeout(function() {
                        location.reload(true);
                      }, 1800);
              });

              });
                 
            });
          });
          }else if(info.status == "invalider"){
            document.getElementById("nom").innerHTML = "";

          }
  

  
      });
     }).catch(error =>{
      console.log('Aucune utilisateur connecte ',error);
     });
      }else{
          console.log('Aucun utilisateur connecte');
      }
  });
  

  auth.onAuthStateChanged(user =>{
    if(user){
        const uid = user.uid;
        const infoRef =collection(db,"AGENCES");
        const final = doc(infoRef,uid);
        const but = collection(final,"INFORMATION");
   getDocs(but).then(querySnapshot =>{
    querySnapshot.forEach(doct =>{
      
     const info = doct.data();


      if(info.status == "valider"){
                const commentaireRef = collection(db,"AGENCES");
        const commentairefirst = doc(commentaireRef,uid);
        const commentairesecond = collection(commentairefirst,"COMMENTAIRE");
        const commentairethird = doc(commentairesecond,"DETAILS");
        const commentairesecond2 = collection(commentairethird,"INFORMATION");
    
        getDocs(commentairesecond2).then((querySnapshot) => {
          
          const tbody_4 =document.getElementById("tbody_4");
          querySnapshot.forEach((docte) =>{

            const doccommentaire = docte.id ;
            const tr = document.createElement("tr");
    
            const tdspeudo = document.createElement("td");
            const tdcommentaire = document.createElement("td");

            tdspeudo.textContent = "COMMENTAIRE";
            tdcommentaire.textContent = docte.data().commentaire;

            const bouton_supcommentaire = document.createElement("button");
            bouton_supcommentaire.textContent = "Supprimer";
            bouton_supcommentaire.style.width= "80px";
            bouton_supcommentaire.style.borderRadius= "10px";
            bouton_supcommentaire.style.fontWeight="bold";
            bouton_supcommentaire.style.color="black";
            bouton_supcommentaire.style.backgroundColor= "#E8E8E8";
            bouton_supcommentaire.style.boxShadow="3px 3px 3px #e4e2de";

            

            tr.appendChild(tdspeudo);
            tr.appendChild(tdcommentaire);
            tr.appendChild(bouton_supcommentaire);
    
            tbody_4.appendChild(tr);


            bouton_supcommentaire.addEventListener('click', function() {
              document.getElementById('dialog').style.display = 'block';

              document.getElementById('annuler').addEventListener('click', function() {
                document.getElementById('dialog').style.display = 'none';
              });
              
              document.getElementById('acceder').addEventListener('click', function() {
                const commenatiresup = doc(commentairesecond2,doccommentaire);
                deleteDoc(commenatiresup).then(()=>{
      
                });
                document.getElementById('dialog').style.display = 'none';
                                      setTimeout(function() {
                        location.reload(true);
                      }, 1800);
              });


            });
            
            


          });
        });

        const messageRef = collection(db,"AGENCES");
        const messagefirst = doc(messageRef,uid);
        const messagesecond1 = collection(messagefirst,"MESSAGE");
        const messagethird = doc(messagesecond1,"DETAILS");
        const messagesecond = collection(messagethird,"INFORMATION");
    
        getDocs(messagesecond).then((querySnapshot) => {
          
          const tbody_4 =document.getElementById("tbody_4");

          querySnapshot.forEach((doct) =>{

            const tr = document.createElement("tr");
            const docmessage = doct.id;
    
            const tdspeudo = document.createElement("td");
            const tdmessage = document.createElement("td");

            tdspeudo.textContent = "MESSAGE";
            tdmessage.textContent = doct.data().message;

            const bouton_supmessage = document.createElement("button");
            bouton_supmessage.textContent = "Supprimer";
            bouton_supmessage.style.width= "80px";
            bouton_supmessage.style.borderRadius= "10px";
            bouton_supmessage.style.color="black";
            bouton_supmessage.style.fontWeight="bold";
            bouton_supmessage.style.backgroundColor= "#E8E8E8";
            bouton_supmessage.style.boxShadow="3px 3px 3px  #e4e2de";

            
            tr.appendChild(tdspeudo);
            tr.appendChild(tdmessage);
            tr.appendChild(bouton_supmessage);
    
            tbody_4.appendChild(tr);

          
            bouton_supmessage.addEventListener('click', function() {
              document.getElementById('dialog').style.display = 'block';

              document.getElementById('annuler').addEventListener('click', function() {
                document.getElementById('dialog').style.display = 'none';
              });
              
              document.getElementById('acceder').addEventListener('click', function() {
                const messagesup = doc(messagesecond,docmessage);
                deleteDoc(messagesup).then(()=>{
      
                });
                document.getElementById('dialog').style.display = 'none';
                  setTimeout(function() {
                        location.reload(true);
                      }, 1800);
                
                
              });

            });
           });
        });

      }else if(info.status == "invalider"){
            document.getElementById("nom").innerHTML = "";

      }



    });
   }).catch(error =>{
    console.log('Aucune utilisateur connecte ',error);
   });
    }else{
        console.log('Aucun utilisateur connecte');
    }
});


auth.onAuthStateChanged(user =>{
  if(user){
    const uid = user.uid;
    const infoRef =collection(db,"AGENCES");
    const final = doc(infoRef,uid);
    const but = collection(final,"INFORMATION");
      getDocs(but).then(querySnapshot =>{
        querySnapshot.forEach(doct =>{
          const info = doct.data();

          if(info.status == "valider"){

                      const buRef = collection(db,"AGENCES");
          const busfirst = doc(buRef,uid);
          const bussecond = collection(busfirst,info.agence);
          const busthird = doc(bussecond,"BUS");
          const busend = collection(busthird,"DETAILS");



          const tableau_bus = document.getElementById("tableau_5");
          tableau_bus.style.width ="100%";
          tableau_bus.style.borderCollapse = "collapse";


          const ligneEntete = document.createElement("tr");

          const celluleEntete1 = document.createElement("th");
          celluleEntete1.textContent = "Categorie";
          const celluleEntete2 = document.createElement("th");
          celluleEntete2.textContent = "Chauffeur";
          const celluleEntete3 = document.createElement("th");
          celluleEntete3.textContent = "Date voyage";
          const celluleEntete4 = document.createElement("th");
          celluleEntete4.textContent = "Heure depart";
          const celluleEntete5 = document.createElement("th");
          celluleEntete5.textContent = "Immatriculation";
          const celluleEntete6 = document.createElement("th");
          celluleEntete6.textContent = "Code bus";
          const celluleEntete7 = document.createElement("th");
          celluleEntete7.textContent = "Prix ticket";
          const celluleEntete8 = document.createElement("th");
          celluleEntete8.textContent = "Quartier depart";
          const celluleEntete9 = document.createElement("th");
          celluleEntete9.textContent = "Quartier arriver";
          const celluleEntete10 = document.createElement("th");
          celluleEntete10.textContent = "trajet";
          const celluleEntete11 = document.createElement("th");
          celluleEntete11.textContent = "Ville depart";
          const celluleEntete12 = document.createElement("th");
          celluleEntete12.textContent = "ville arriver";
          const celluleEntete13 = document.createElement("th");
          celluleEntete13.textContent = "Action";

          ligneEntete.appendChild(celluleEntete1);
          ligneEntete.appendChild(celluleEntete2);
          ligneEntete.appendChild(celluleEntete3);
          ligneEntete.appendChild(celluleEntete4);
          ligneEntete.appendChild(celluleEntete5);
          ligneEntete.appendChild(celluleEntete6);
          ligneEntete.appendChild(celluleEntete7);
          ligneEntete.appendChild(celluleEntete8);
          ligneEntete.appendChild(celluleEntete9);
          ligneEntete.appendChild(celluleEntete10);
          ligneEntete.appendChild(celluleEntete11);
          ligneEntete.appendChild(celluleEntete12);
          ligneEntete.appendChild(celluleEntete13);
          tableau_bus.appendChild(ligneEntete);


getDocs(busend).then((querySnapshot) => {
querySnapshot.forEach((docte) =>{

  const bus = docte.data();
  
const ligne = document.createElement("tr");

const cellule1 = document.createElement("td");
cellule1.textContent = bus.categories;
const cellule2 = document.createElement("td");
cellule2.textContent = bus.chauffeur;
const cellule3 = document.createElement("td");
cellule3.textContent = bus.date_voyage;
const cellule4 = document.createElement("td");
cellule4.textContent = bus.heure_depart;
const cellule5 = document.createElement("td");
cellule5.textContent = bus.immatriculation;
const cellule6 = document.createElement("td");
cellule6.textContent = bus.motpassebus;
const cellule7 = document.createElement("td");
cellule7.textContent = bus.prix_ticket;
const cellule8 = document.createElement("td");
cellule8.textContent = bus.quartier_depart;
const cellule9 = document.createElement("td");
cellule9.textContent = bus.quartier_arriver;
const cellule10 = document.createElement("td");
cellule10.textContent = bus.trajet;
const cellule11 = document.createElement("td");
cellule11.textContent = bus.ville_depart;
const cellule12 = document.createElement("td");
cellule12.textContent = bus.ville_arriver;
const cellule13 = document.createElement("td");

const bouton_voir = document.createElement("button");
bouton_voir.textContent = "Voir";
const bouton_reduire = document.createElement("button");
bouton_reduire.style.fontWeight="bold";
bouton_reduire.textContent = "Reduire";
bouton_reduire.style.display = "none";
bouton_voir.style.width= "80px";
bouton_voir.style.borderRadius= "10px";
bouton_voir.style.fontWeight="bold";
bouton_voir.style.backgroundColor= "#F96A24";
bouton_voir.style.boxShadow="3px 3px 3px#efdcd2";
bouton_voir.style.margin= "0 auto";

cellule13.appendChild(bouton_voir);
cellule13.appendChild(bouton_reduire);

ligne.append(cellule1);
ligne.append(cellule2);
ligne.append(cellule3);
ligne.append(cellule4);
ligne.append(cellule5);
ligne.append(cellule6);
ligne.append(cellule7);
ligne.append(cellule8);
ligne.append(cellule9);
ligne.append(cellule10);
ligne.append(cellule11);
ligne.append(cellule12);
ligne.append(cellule13);

tableau_bus.appendChild(ligne);     


bouton_voir.addEventListener("click" , ()=>{
  const tableau_user = document.getElementById("tableau_6");

  const ligneEnteteUser = document.createElement("tr");

  const celluleEnteteUser1 = document.createElement("th");
  celluleEnteteUser1.textContent = "Nom";
  const celluleEnteteUser2 = document.createElement("th");
  celluleEnteteUser2.textContent = "Code ticket";
  const celluleEnteteUser3 = document.createElement("th");
  celluleEnteteUser3.textContent = "Code bus";
  const celluleEnteteUser4 = document.createElement("th");
  celluleEnteteUser4.textContent = "Commentaire";


  ligneEnteteUser.appendChild(celluleEnteteUser1);
  ligneEnteteUser.appendChild(celluleEnteteUser2);
  ligneEnteteUser.appendChild(celluleEnteteUser3);
  ligneEnteteUser.appendChild(celluleEnteteUser4);

  tableau_user.appendChild(ligneEnteteUser);

  const userRef = collection(db,"AGENCES");
  const userfirst = doc(userRef,uid);
  const usersecond = collection(userfirst,info.agence);
  const userfirstcom = doc(usersecond,"COMMENTAIRE_UTILISATEUR");
  const usersecondcom = collection(userfirstcom,"DETAILS");

  const q = query(usersecondcom,where("motpassebus", "==",bus.motpassebus));

  getDocs(q).then((querySnapshotuser) =>{
    querySnapshotuser.forEach((docuser) =>{


      const user = docuser.data();
    
      const ligneuser = document.createElement("tr");

      const celluleuser1 = document.createElement("td");
      celluleuser1.textContent = user.nom;
      const celluleuser2 = document.createElement("td");
      celluleuser2.textContent = user.codeticket;
      const celluleuser3 = document.createElement("td");
      celluleuser3.textContent = user.motpassebus;
      const celluleuser4 = document.createElement("td");
      celluleuser4.style.width = "100%";
      celluleuser4.textContent = user.commentaire;



      ligneuser.append(celluleuser1);
      ligneuser.append(celluleuser2);
      ligneuser.append(celluleuser3);
      ligneuser.append(celluleuser4);

      tableau_user.appendChild(ligneuser);
      

    });

  });
  tableau_user.style.display="block";
  bouton_voir.style.display ="none";
  bouton_reduire.style.display ="block";
  bouton_voir.style.width= "80px";
  bouton_reduire.style.borderRadius= "10px";
  bouton_reduire.style.backgroundColor= "#F96A24";
  bouton_reduire.style.boxShadow="3px 3px 3px#efdcd2";
  });

  bouton_reduire.addEventListener("click",()=>{
  const tableau_user = document.getElementById("tableau_6");
  tableau_user.style.display="none";
  bouton_voir.style.display ="block";
  bouton_reduire.style.display ="none";

})

});
});

  }else if(info.status == "invalider"){
    document.getElementById("nom").innerHTML = "";
  }


});
}).catch(error =>{
console.log('Aucune utilisateur connecte ',error);
});
}else{
console.log('Aucun utilisateur connecte');
}
});


document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du DOM
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Fonction pour basculer le menu mobile
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Empêcher le défilement du corps lorsque le menu est ouvert
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Gestion du clic sur le bouton du menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Désactiver le défilement fluide pour les liens externes
            if (link.getAttribute('href').startsWith('http') || 
                link.getAttribute('href').startsWith('#')) {
                return;
            }
        });
    });
    
    // Fermer le menu lors d'un clic en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || 
                              mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Fermer le menu lors du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
            
            // Fermer le menu si on passe en mode desktop
            if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 400);
    });
    
    // Gestion du défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mise en surbrillance de l'onglet actif basée sur l'URL
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Si on est sur la page d'accueil, on active le lien Accueil
        if (currentPage === 'Page_couverture.html' || currentPage === '') {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === './') {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        // Pour les autres pages, on cherche le lien correspondant
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const isActive = linkHref.includes(currentPage) || 
                           (currentPage.includes(linkHref.replace('./', '').replace('/', '')) && linkHref !== './' && linkHref !== '/');
            
            link.classList.toggle('active', isActive);
        });
    }
    
    // Appeler la fonction au chargement
    setActiveLink();
    
    // Mettre à jour l'élément actif lors du défilement
    window.addEventListener('popstate', setActiveLink);
});


