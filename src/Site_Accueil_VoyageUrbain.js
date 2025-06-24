import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";

import { getFirestore,addDoc,doc,collection,getDocs } from "firebase/firestore";

import { getMessaging} from "firebase/messaging";

//information de la base de donnee firestore
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
    const messaging = getMessaging(app);

    //appel de l'agence connecte
    const auth = getAuth(app);
    auth.onAuthStateChanged(user =>{
        if(user){
            const uid = user.uid;
            const infoRef =collection(db,"AGENCES");
            const final = doc(infoRef,uid);
            const but = collection(final,"INFORMATION");

            function generateRandomSum(){
                const min = 100000;
                const max = 999999;
                return Math.floor(Math.random()*(max - min + 1)) + min;
            }

            //envoie de donnee dans la base de donnee firestore
            getDocs(but).then(querySnapshot =>{
                querySnapshot.forEach(doct =>{
                    const info = doct.data();

                    if(info.status == "valider"){
                    document.getElementById("nom").innerHTML = info.agence;

                    
                    document.querySelector('.close-btn').addEventListener('click', () => {
                    document.getElementById('resultPopup').style.display = 'none';
                    });
                    document.getElementById('confirmSubmit').addEventListener('click', () => {
                    //fonction pour la generation de code bus
                    const randomSum = generateRandomSum();
                            
                        

                        const formData = {
                            immatriculation: document.getElementById('input_1').value,
                            categorie: document.getElementById('value_categorie').value,
                            chauffeur: document.getElementById('input_0').value,
                            trajet: document.getElementById('value_trajet').value,
                            ville_depart: document.getElementById('select_1').value,
                            ville_arriver: document.getElementById('select_3').value,
                            quartier_depart: document.getElementById('select_2').value,
                            quartier_arriver: document.getElementById('select_4').value,
                            prix_ticket: document.getElementById('prix_ticket').value,
                            heure_depart: document.getElementById('heure').value,
                            nombre_siege: document.getElementById('siege').value,
                            date_voyage: document.getElementById('date_voyage').value,
                            etat: document.getElementById('etat_value').value,
                        };




                        const docRef = collection(db,"AGENCES");
                        const sousRef = doc(docRef,uid);
                        const finalRef = collection(sousRef,info.agence);
                        const ref = doc(finalRef,"BUS");
                        const refdetails = collection(ref,"DETAILS");
        
                        addDoc(refdetails,{
                            immatriculation : formData.immatriculation,
                            nomagence : info.agence,
                            chauffeur : formData.chauffeur,
                            categories :formData.categorie,
                            trajet :formData.trajet,
                            ville_depart :formData.ville_depart,
                            quartier_depart : formData.quartier_depart,
                            ville_arriver : formData.ville_arriver,
                            quartier_arriver :formData.quartier_arriver,
                            prix_ticket : parseInt(formData.prix_ticket),
                            heure_depart : formData.heure_depart,
                            nombre_siege :parseInt(formData.nombre_siege),
                            date_voyage: formData.date_voyage,
                            uidagence: uid,
                            motpassebus: randomSum,
                            etat:formData.etat,
                            place_prise:0,
                            status:"ouvert",
                        },{merge : true}).then(() =>
                            document.querySelectorAll('input').forEach(input => {
                                input.value = '';
                            })
                        ); 
    
                        document.getElementById('resultPopup').style.display = 'none';
                        });

                           function displayResults(results) {
                           const resultContent = document.getElementById('resultContent');
                            resultContent.innerHTML = '';
                            const immatriculation= document.getElementById('input_1').value;
                            const categorie= document.getElementById('value_categorie').value;
                            const chauffeur= document.getElementById('input_0').value;
                            const trajet= document.getElementById('value_trajet').value;
                            const ville_depart= document.getElementById('select_1').value;
                            const ville_arriver= document.getElementById('select_3').value;
                            const quartier_depart= document.getElementById('select_2').value;
                            const quartier_arriver= document.getElementById('select_4').value;
                            const prix_ticket= document.getElementById('prix_ticket').value;
                            const heure_depart= document.getElementById('heure').value;
                            const nombre_siege= document.getElementById('siege').value;
                            const date_voyage= document.getElementById('date_voyage').value;
                            const etat_value= document.getElementById('etat_value').value;
    
    if(results.length === 0) {
        resultContent.innerHTML = '<p>Aucune information à afficher</p>';
        document.getElementById('confirmSubmit').style.display="none";
    } else if(
        immatriculation == "" || categorie == "" || chauffeur == "" || trajet == "" ||
        ville_depart == "" || ville_arriver == "" || quartier_depart == "" || quartier_arriver == "" ||
        prix_ticket == "" || heure_depart == "" || nombre_siege == "" || date_voyage == "" || etat_value ==""
    ){
        resultContent.innerHTML = '<p>Veuillez entre tout les informations du bus</p>';
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
    
    // Collecter toutes les informations
    document.querySelectorAll('.input-container').forEach(container => {
        const title = container.querySelector('p').textContent;
        const inputs = container.querySelectorAll('input');
        const details = {
            title,
            values: []
        };
        
        container.querySelectorAll('.input-group').forEach(group => {
            const label = group.querySelector('p').textContent;
            const value = group.querySelector('input').value;
            if(value) details.values.push({label, value});
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
                console.log("Erreur lors de l'enregistrement du bus",error)
            });   
        }else{
            console.log('Aucun agence connecte');
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
        if (currentPage === 'Page_couverture' || currentPage === '') {
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


    








