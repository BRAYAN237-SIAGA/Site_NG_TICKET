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

    const envoyer_message = document.getElementById("div_message");
    const envoyer_commentaire = document.getElementById("div_commentaire");
    const auth = getAuth(app);
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

                    document.getElementById("nom").innerHTML = info.agence;

                    document.querySelectorAll('.send-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                    const container = this.closest('.textarea-container');
                    const title = container.querySelector('label').textContent;
                    const message = container.querySelector('textarea').value;
        
                    if(message) {
                        document.getElementById('messageTitle').textContent = title;
                        document.getElementById('messageContent').textContent = message;
                        document.getElementById('messagePopup').style.display = 'flex';

                    document.querySelector('#messagePopup .close-btn').addEventListener('click', () => {
                    document.getElementById('messagePopup').style.display = 'none';
                    });
                    document.getElementById('confirmMessage').addEventListener('click', () => {
                        const docRef = collection(db,"AGENCES") ;
                        const sousRef = doc(docRef,uid);
                        const finalRef = collection(sousRef,"MESSAGE");
                        const ref = doc(finalRef,"DETAILS");
                        const reffinal = collection(ref,"INFORMATION");
            
                        addDoc(reffinal,{
                            message : message,
                        }).then(() => 
                        document.querySelectorAll('textarea').forEach(textarea => {
                                textarea.value = '';
                            }) );
                    document.getElementById('messagePopup').style.display = 'none';
                    });
                    }
                    });
                    });


                    document.querySelectorAll('.send-btn2').forEach(btn => {
                    btn.addEventListener('click', function() {
                    const container = this.closest('.textarea-container');
                    const title = container.querySelector('label').textContent;
                    const message = container.querySelector('textarea').value;
        
                    if(message) {
                        document.getElementById('messageTitle2').textContent = title;
                        document.getElementById('messageContent2').textContent = message;
                        document.getElementById('messagePopup2').style.display = 'flex';

                        document.querySelector('#messagePopup2 .close-btn2').addEventListener('click', () => {
                    document.getElementById('messagePopup2').style.display = 'none';
                    });
                    document.getElementById('confirmMessage2').addEventListener('click', () => {
                        const docRef = collection(db,"AGENCES") ;
                        const sousRef = doc(docRef,uid);
                        const finalRef = collection(sousRef,"COMMENTAIRE");
                        const ref = doc(finalRef,"DETAILS");
                        const reffinal = collection(ref,"INFORMATION");
        
                        addDoc(reffinal,{
                            commentaire : message,
                        }).then(() => 
                        document.querySelectorAll('textarea').forEach(textarea => {
                                textarea.value = '';
                            }) );
                    document.getElementById('messagePopup2').style.display = 'none';
                    });

                    }
                    });
                    });

                        // Gestion des boutons d'envoi de message
document.querySelectorAll('.send-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const container = this.closest('.textarea-container');
        const title = container.querySelector('label').textContent;
        const message = container.querySelector('textarea').value;
        
        if(message) {
            document.getElementById('messageTitle').textContent = title;
            document.getElementById('messageContent').textContent = message;
            document.getElementById('messagePopup').style.display = 'flex';
        }
    });
});
document.querySelectorAll('.send-btn2').forEach(btn => {
    btn.addEventListener('click', function() {
        const container = this.closest('.textarea-container');
        const title = container.querySelector('label').textContent;
        const message = container.querySelector('textarea').value;
        
        if(message) {
            document.getElementById('messageTitle2').textContent = title;
            document.getElementById('messageContent2').textContent = message;
            document.getElementById('messagePopup2').style.display = 'flex';
        }
    });
});

                    }else if(info.status == "invalider"){
                        document.getElementById("nom").innerHTML = "";
                    }
                });
            }).catch(error =>{
                console.log('Aucune message/commentaire ajoute',error)
            });
        }else{
            console.log('Aucun message ajoute');
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


