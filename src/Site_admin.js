import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";

import { getFirestore,addDoc,doc,collection,getDocs } from "firebase/firestore";

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
    const ajouteragences = document.querySelector(".ajouteragences");

    const auth = getAuth(app);
    auth.onAuthStateChanged(user =>{

        if(user){
            const uid = user.uid;
            const infoRef =collection(db,"AGENCES");
            const final = doc(infoRef,uid);
            const but = collection(final,"INFORMATION");

            //fonction pour la generation de code bus
            function generateRandomSum(){
                const min = 100000;
                const max = 999999;
                return Math.floor(Math.random()*(max - min + 1)) + min;
            }

            getDocs(but).then(querySnapshot =>{
                querySnapshot.forEach(doct =>{
                    const info = doct.data();

                    if(info.status == "valider"){

                    document.getElementById("nom").innerHTML = info.agence;

                    document.querySelector('.close-btn').addEventListener('click', () => {
                    document.getElementById('resultPopup').style.display = 'none';
                    });
                    document.getElementById('confirmSubmit').addEventListener('click', () => {

                    const formData = {
                            device: document.getElementById('device').value,
                            ville_depart: document.getElementById('ville1').value,
                            ville_arriver: document.getElementById('ville2').value,
                            quartier_depart: document.getElementById('quartier1').value,
                            quartier_arriver: document.getElementById('quartier2').value,
                        };
                        const docRef = collection(db,"CONTROLE") ;
                        const sousRef = doc(docRef,"DESTINATION");
                        const finalRef = collection(sousRef,"NG_TRAVEL");

                        const docRef1 = collection(db,"AGENCES") ;
                        const sousRef2 = doc(docRef1,uid);
                        const finalRef3 = collection(sousRef2,info.agence);
                        const sousRef4 = doc(finalRef3,"DESTINATION");
                        const finalRef4 = collection(sousRef4,"INFORMATION");

                        const randomSum = generateRandomSum();


                        addDoc(finalRef,{
                            nomagence : info.agence,
                            device : formData.device,
                            ville1 :formData.ville_depart,
                            ville2 :formData.ville_arriver,
                            uid: uid, 
                            codesup : randomSum,
                            quartier1 :formData.quartier_depart,
                            quartier2 : formData.quartier_arriver,
                        }).then(() => 
                            document.querySelectorAll('input').forEach(input => {
                                input.value = '';
                            })
                        );

                        addDoc(finalRef4,{
                            nomagence : info.agence,
                            device : device.value,
                            ville1 :ville1.value,
                            ville2 :ville2.value,
                            uid: uid, 
                            codesup:randomSum,
                            quartier1 :quartier1.value,
                            quartier2 : quartier2.value,
                        }).then(() => 
                            document.querySelectorAll('input').forEach(input => {
                                input.value = '';
                            }) 
                        );

                    document.getElementById('resultPopup').style.display = 'none';
                    }); 

                        function displayResults(results) {
        const resultContent = document.getElementById('resultContent');
        resultContent.innerHTML = '';

                            const device= document.getElementById('device').value;
                            const ville1= document.getElementById('ville1').value;
                            const ville2= document.getElementById('ville2').value;
                            const quartier1= document.getElementById('quartier2').value;
                            const quartier2= document.getElementById('quartier2').value;
        if(results.length === 0) {

            resultContent.innerHTML = '<p>Aucune information à afficher</p>';
            document.getElementById('confirmSubmit').style.display="none";
           document.getElementById('confirmSubmit').style.display="none";
        } else if(
        device == "" || ville1 == "" || ville2 == "" || quartier1 == "" ||
        quartier2 == "" 
    ){
        resultContent.innerHTML = '<p>Veuillez entre tout les informations de la destination</p>';
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
    
    document.querySelectorAll('.input-container').forEach(container => {
        const title = container.querySelector('label').textContent;
        const details = {
            title,
            values: []
        };
        
        container.querySelectorAll('.input-group').forEach(group => {
            const label = group.querySelector('label').textContent;
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


                    }else if(info.status == "invalider"){
                        document.getElementById("nom").innerHTML = "";
                    }
                  
                });
            }).catch(error =>{
                console.log('Aucune utilisateur connecte',error)
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
        if (currentPage === 'index.html' || currentPage === '') {
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
