import { initializeApp } from "firebase/app";

import { getFirestore,doc,collection,query,getDocs,where,deleteDoc,updateDoc,addDoc } from "firebase/firestore";

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
  const db = getFirestore(app);

  const controle = collection(db,"CONTROLE");
  const controle1 = doc(controle,"AGENCES");
  const controle2 = collection(controle1,"NG_TICKET");

  getDocs(controle2).then((querySnapshot) => {
            
            const tbody =document.getElementById("tbody");
            querySnapshot.forEach((docte) =>{
                
              const controledocte= docte.data();
              const doccontrole = docte.id;

                const tr = document.createElement("tr");
      
              const tdnomagence = document.createElement("td");
              const tdpromoteur = document.createElement("td");
              const tdemail = document.createElement("td");
              const tdville = document.createElement("td");
              const tdville_depart1 = document.createElement("td");
              const tdville_arriver1 = document.createElement("td");
              const tdville_depart2 = document.createElement("td");
              const tdville_arriver2 = document.createElement("td");
              const tdtelephone = document.createElement("td");
              const tdpays = document.createElement("td");
              const tddate_inscription = document.createElement("td");
              const tdmotpasse = document.createElement("td");
              const tdstatus = document.createElement("td");
              const tdaction = document.createElement("td");

              const bouton_acceder = document.createElement("button");
              bouton_acceder.textContent = "Acceder";
              bouton_acceder.style.width= "80px";
              bouton_acceder.style.borderRadius= "10px";
              bouton_acceder.style.fontWeight="bold";
              bouton_acceder.style.color="black";
              bouton_acceder.style.backgroundColor= "rgb(57, 243, 10)";
              bouton_acceder.style.boxShadow="3px 3px 3px rgb(168, 222, 154)";

              const bouton_bloquer = document.createElement("button");
              bouton_bloquer.textContent = "Bloquer";
              bouton_bloquer.style.width= "80px";
              bouton_bloquer.style.borderRadius= "10px";
              bouton_bloquer.style.fontWeight="bold";
              bouton_bloquer.style.color="black";
              bouton_bloquer.style.backgroundColor= "rgb(237, 17, 17)";
              bouton_bloquer.style.boxShadow="3px 3px 3px rgb(218, 158, 158)";

              tdnomagence.textContent = controledocte.agence;
              tdpromoteur.textContent = controledocte.promoteur;
              tdemail.textContent = controledocte.email;
              tdville.textContent = controledocte.ville;
              tdville_depart1.textContent = controledocte.ville_depart1;
              tdville_arriver1.textContent = controledocte.ville_arriver1;
              tdville_depart2.textContent = controledocte.ville_depart2;
              tdville_arriver2.textContent = controledocte.ville_arriver2;
              tdtelephone.textContent = controledocte.telephone;
              tdpays.textContent = controledocte.pays;
              tddate_inscription.textContent = controledocte.date_inscription;
              tdmotpasse.textContent = controledocte.motpasse;
              tdstatus.textContent = controledocte.status;

              tr.appendChild(tdnomagence);
              tr.appendChild(tdpromoteur);
              tr.appendChild(tdemail);
              tr.appendChild(tdville);
              tr.appendChild(tdville_depart1);
              tr.appendChild(tdville_arriver1);
              tr.appendChild(tdville_depart2);
              tr.appendChild(tdville_arriver2);
              tr.appendChild(tdtelephone);
              tr.appendChild(tdpays);
              tr.appendChild(tddate_inscription);
              tr.appendChild(tdmotpasse);
              tr.appendChild(tdstatus);
              
              tr.appendChild(bouton_acceder);
              tr.appendChild(bouton_bloquer);

              tbody.appendChild(tr);

               bouton_acceder.addEventListener("click", ()=>{
                  document.getElementById('dialog').style.display = 'block';
                                    
                  document.getElementById('annuler').addEventListener('click', ()=> {
                    document.getElementById('dialog').style.display = 'none';
                  });
                  
                  document.getElementById('acceder').addEventListener('click', ()=> {
                    
                    const docRef = collection(db,"AGENCES");
                    const sousRef = doc(docRef,controledocte.uid);
                    const finalRef = collection(sousRef,"INFORMATION");

                    getDocs(finalRef).then((querySnapshot) => {
                    querySnapshot.forEach((docte) =>{
                         const docupdateagences = doc(finalRef,docte.id);
                        updateDoc(docupdateagences,{
                        status : "valider"
                        });

                    });
                    });

                    const controleupdate = collection(db,"CONTROLE");
                    const controleupdate1 = doc(controleupdate,"AGENCES");
                    const controleupdate2 = collection(controleupdate1,"NG_TICKET");

                    const docupdate = doc(controleupdate2,doccontrole);
                    updateDoc(docupdate,{
                        status : "valider"
                    }).then(() =>{
                        alert("L'agence a ete accepter pour acceder a vos services");
                    })
                     emailjs.init("KpXE6Otgv0SmfP1IM");

                     emailjs.send("service_m0gn6jj","template_7exagqu", {
                     name :controledocte.agence,
                     email :controledocte.email,
                     });
                    document.getElementById('dialog').style.display = 'none';
                                          setTimeout(function() {
                        location.reload(true);
                      }, 1500);
                  });                 
                });

                bouton_bloquer.addEventListener("click", ()=>{
                  document.getElementById('dialog1').style.display = 'block';
                                    
                  document.getElementById('annuler1').addEventListener('click', ()=> {
                    document.getElementById('dialog1').style.display = 'none';
                  });
                  
                  document.getElementById('acceder1').addEventListener('click', ()=> {

                    const docRef1 = collection(db,"AGENCES");
                    const sousRef1 = doc(docRef1,controledocte.uid);
                    const finalRef1 = collection(sousRef1,"INFORMATION");

                    getDocs(finalRef1).then((querySnapshot1) => {
                    querySnapshot1.forEach((docte1) =>{
                        
                         const docupdateagences1 = doc(finalRef1,docte1.id);
                        updateDoc(docupdateagences1,{
                        status : "invalider"
                        });

                    });
                    });

                    const controleupdate4 = collection(db,"CONTROLE");
                    const controleupdate5 = doc(controleupdate4,"AGENCES");
                    const controleupdate6 = collection(controleupdate5,"NG_TICKET");
                    const docupdate1 = doc(controleupdate6,doccontrole);
                    updateDoc(docupdate1,{
                        status : "invalider"
                    }).then(() =>{
                        alert("L'agence a ete bloquer pour acceder a vos services");
                    })
                    emailjs.init("KpXE6Otgv0SmfP1IM");

                     emailjs.send("service_m0gn6jj","template_s6fobdn", {
                     name :controledocte.agence,
                     email :controledocte.email,
                     });
                    document.getElementById('dialog1').style.display = 'none';
                                          setTimeout(function() {
                        location.reload(true);
                      }, 1500);
                  });                 
                });
            });


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
                if (link.getAttribute('href') === 'age_couverture.html' || link.getAttribute('href') === './') {
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



    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('resultPopup').style.display = 'none';
    });
    document.getElementById('confirmSubmit').addEventListener('click', () => {
          const formData = {
            ville: document.getElementById('nomville').value,
        };
        
            const docRef = collection(db,"CONTROLE");
        const sousRef = doc(docRef,"VILLES_DESTINATIONS");
        const finalRef = collection(sousRef,"NG_TRAVEL");
        
        addDoc(finalRef,{
            ville : formData.ville,
        }).then(() => 
            document.querySelectorAll('input').forEach(input => {
                input.value = '';
            })); 
        document.getElementById('resultPopup').style.display = 'none';
        setTimeout(function() {
                        location.reload(true);
                      }, 1500);
    });







              const villeRef = collection(db,"CONTROLE");
              const villefirst = doc(villeRef,"VILLES_DESTINATIONS");
              const villesecond = collection(villefirst,"NG_TRAVEL");
          
              getDocs(villesecond).then((querySnapshot1) => {
                
                const tbody_3 =document.getElementById("tbody_3");
                querySnapshot1.forEach((docte1) =>{
                  const villesupdoc = docte1.id;
          
                  const tr = document.createElement("tr");
          
                  const tdng_ticket = document.createElement("td");
                  const tdnomville = document.createElement("td");
                  const tdactionville = document.createElement("td");
          
                  tdng_ticket.textContent = "NG_TICKET";
                  tdnomville.textContent = docte1.data().ville;
    
                  const bouton_supville = document.createElement("button");
                  bouton_supville.textContent = "Supprimer";
                  bouton_supville.style.width= "80px";
                  bouton_supville.style.borderRadius= "10px";
                  bouton_supville.style.fontWeight="bold";
                  bouton_supville.style.color="black";
                  bouton_supville.style.backgroundColor= " #E8E8E8";
                  bouton_supville.style.boxShadow="3px 3px 3px  #e4e2de";
    
                  
              
          
                  tr.appendChild(tdng_ticket);
                  tr.appendChild(tdnomville);
                  tr.appendChild(bouton_supville);
          
                  tbody_3.appendChild(tr);
    
                  
                  bouton_supville.addEventListener('click', function() {
                    document.getElementById('dialog2').style.display = 'block';
    
                      
                  document.getElementById('annuler2').addEventListener('click', function() {
                    document.getElementById('dialog2').style.display = 'none';
                  });
                  
                  document.getElementById('acceder2').addEventListener('click', function() {

                    const villesup = doc(villesecond,villesupdoc);
                    deleteDoc(villesup).then(()=>{
      
                    }); 
                    document.getElementById('dialog2').style.display = 'none';
                        setTimeout(function() {
                            location.reload(true);
                        }, 1500);
                  });
                  });
                     
                });
              });




                    const destinationRef = collection(db,"CONTROLE");
                    const destinationfirst = doc(destinationRef,"DESTINATION");
                    const destinationsecond = collection(destinationfirst,"NG_TRAVEL");
                
                    getDocs(destinationsecond).then((querySnapshot) => {
                      
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
                          document.getElementById('dialog3').style.display = 'block';
              
                          document.getElementById('annuler3').addEventListener('click', function() {
                            document.getElementById('dialog3').style.display = 'none';
                          });
                          
                          document.getElementById('acceder3').addEventListener('click', function() {
                            
                          const destinationsup = doc(destinationsecond,docdestination);
              
                          deleteDoc(destinationsup).then(()=>{ 
                          });  
                        
                            document.getElementById('dialog3').style.display = 'none';
                                                  setTimeout(function() {
                                      location.reload(true);
                                    }, 1500);
                            
                          });
              
                        });
                        
                      });
                    });

              


     function displayResults(results) {
        const resultContent = document.getElementById('resultContent');
        resultContent.innerHTML = '';
        if(results.length === 0) {

            resultContent.innerHTML = '<p>Aucune information à afficher</p>';
            document.getElementById('confirmSubmit').style.display="none";
           document.getElementById('confirmSubmit').style.display="none";
        }else{
            results.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'result-item';
                itemDiv.innerHTML = `<h4>${item.title}</h4>`;
                
                item.values.forEach(detail => {
                    itemDiv.innerHTML += `<p><strong>${detail.label}:</strong> ${detail.value}</p>`;
                });
                
                resultContent.appendChild(itemDiv);
            });
        }
        
        document.getElementById('resultPopup').style.display = 'flex';
    }
document.querySelectorAll('.category1 input').forEach(input => {
input.addEventListener('focus', function() {
this.style.borderColor = '#F96A24';
});

input.addEventListener('blur', function() {
this.style.borderColor = '#DCC9C2';
});
});



document.getElementById('submitBtn').addEventListener('click', () => {
    const results = [];
    
    document.querySelectorAll('.input-container2').forEach(container => {
        const title = container.querySelector('p').textContent;
        const details = {
            title,
            values: []
        };
        
        container.querySelectorAll('.input-group').forEach(group => {
            const label = group.querySelector('p').textContent;
            const field = group.querySelector('input, textarea, select'); // Prend tous les types de champs
            if(field?.value) {
                details.values.push({
                    label,
                    value: field.value
                });
            }
        });
        
        if(details.values.length > 0) results.push(details);
    });
    displayResults(results);
});