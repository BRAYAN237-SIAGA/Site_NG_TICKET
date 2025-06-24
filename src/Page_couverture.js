// Gestion du menu mobile et de la navigation
import emailjs from 'emailjs-com';
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des variables
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn-primary):not(.btn-secondary)');
    
    // Fonction pour basculer le menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Empêcher le défilement du corps lorsque le menu est ouvert
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Événement de clic sur le bouton menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Fermer le menu lorsqu'on clique en dehors
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            toggleMenu();
        }
    });
    
    // Fermer le menu lorsqu'un lien est cliqué (pour la navigation)
    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    toggleMenu();
                }
            });
        });
    }
    
    // Fonction pour mettre à jour l'élément actif dans la navigation
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = '';
        
        // Trouver la section actuellement visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Mettre à jour les liens de navigation
        navItems.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Appeler la fonction au chargement de la page
    setActiveNavItem();
    
    // Mettre à jour l'élément actif lors du défilement
    window.addEventListener('scroll', setActiveNavItem);
    
    // Gestion du clic sur les liens de navigation
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Vérifier si c'est un lien d'ancrage
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Défilement fluide vers la section cible
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuster selon la hauteur du header
                        behavior: 'smooth'
                    });
                }
            }
            
            // Mettre à jour la classe active
            navItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Fermer le menu lors du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
        
        // Si on passe en mode desktop, on s'assure que le menu est fermé
        if (window.innerWidth > 992 && navLinks) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Sélection des éléments du carrousel
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    
    // Variables pour le contrôle du carrousel
    let counter = 0;
    let isAnimating = false;
    let imagesPerSlide = window.innerWidth < 768 ? 1 : 2; // 1 image sur mobile, 2 sur desktop
    let size = carouselImages[0] ? carouselImages[0].clientWidth * imagesPerSlide : 0;
    
    // Mise à jour de la taille et du nombre d'images par slide au redimensionnement
    function updateCarouselSize() {
        imagesPerSlide = window.innerWidth < 768 ? 1 : 2;
        size = carouselImages[0] ? carouselImages[0].clientWidth * imagesPerSlide : 0;
        updateCarousel();
    }
    
    // Écouteur de redimensionnement
    window.addEventListener('resize', updateCarouselSize);
    
    // Initialisation
    updateCarouselSize();
    
    // Gestion du clic sur le bouton suivant
    function goToNextSlide() {
        if (isAnimating) return;
        
        if (counter >= carouselImages.length - imagesPerSlide) {
            // Si on est à la fin, on revient au début
            counter = 0;
            if (window.innerWidth >= 768) {
                carouselSlide.style.transition = 'none';
                updateCarousel();
                void carouselSlide.offsetWidth; // Force un recalcul de style
            }
        } else {
            // Sinon on avance
            counter += imagesPerSlide;
        }
        updateCarousel();
    }
    
    // Gestion du clic sur le bouton précédent
    function goToPrevSlide() {
        if (isAnimating) return;
        
        if (counter <= 0) {
            // Si on est au début, on va à la fin
            counter = carouselImages.length - (carouselImages.length % imagesPerSlide || imagesPerSlide);
            if (counter >= carouselImages.length) counter -= imagesPerSlide;
            if (window.innerWidth >= 768) {
                carouselSlide.style.transition = 'none';
                updateCarousel();
                void carouselSlide.offsetWidth; // Force un recalcul de style
            }
        } else {
            // Sinon on recule
            counter -= imagesPerSlide;
        }
        updateCarousel();
    }
    
    // Écouteurs d'événements pour les boutons
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToNextSlide();
        if (e.key === 'ArrowLeft') goToPrevSlide();
    });
    
    // Mise à jour des indicateurs
    function updateIndicators() {
        if (!indicators.length) return;
        
        // Calculer l'index de la diapositive actuelle pour les indicateurs
        let activeIndex = Math.floor(counter / imagesPerSlide);
        
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Mise à jour du carrousel
    function updateCarousel() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Sur mobile, on utilise le défilement natif
        if (window.innerWidth < 768) {
            carouselSlide.scrollTo({
                left: counter * window.innerWidth,
                behavior: 'smooth'
            });
            isAnimating = false;
            updateIndicators();
            return;
        }
        
        // Sur desktop, on utilise la transformation CSS
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-counter * (size / imagesPerSlide)}px)`;
        
        // Réinitialisation après l'animation
        setTimeout(() => {
            isAnimating = false;
        }, 500);
        
        updateIndicators();
    }
    
    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        const newSize = carouselImages[0].clientWidth;
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = 'translateX(' + (-newSize * counter) + 'px)';
        // Forcer un recalcul de style
        void carouselSlide.offsetWidth;
    });
    
    // Gestion du clic sur les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            counter = index;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            updateCarousel();
        });
    });
    
    // Défilement automatique
    let autoScroll = setInterval(goToNextSlide, 5000); // Change de slide toutes les 5 secondes
    
    // Arrêter le défilement automatique au survol
    const carouselContainer = document.querySelector('.carousel-container');
    let autoScrollPaused = false;
    
    function pauseAutoScroll() {
        if (!autoScrollPaused) {
            clearInterval(autoScroll);
            autoScrollPaused = true;
        }
    }
    
    function resumeAutoScroll() {
        if (autoScrollPaused) {
            autoScroll = setInterval(goToNextSlide, 5000);
            autoScrollPaused = false;
        }
    }
    
    carouselContainer.addEventListener('mouseenter', pauseAutoScroll);
    carouselContainer.addEventListener('mouseleave', resumeAutoScroll);
    
    // Reprendre le défilement automatique quand la fenêtre redevient active
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            resumeAutoScroll();
        } else {
            pauseAutoScroll();
        }
    });
    
    // Mise à jour initiale des indicateurs
    updateIndicators();
});

                   
 document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const nom = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;


      emailjs.init("cKk2lRbauj7dEMLoK");
      
      emailjs.send("service_qz2j1kb", "template_6xuw9el",{
        name : nom,
        email : email,
        subject : subject,
        message : message,
      })
        .then(function() {
          document.getElementById("statusMessage").innerText = "Message envoyé avec succès !";
          document.getElementById("contactForm").reset();
        }, function(error) {
          document.getElementById("statusMessage").innerText = "Erreur lors de l'envoi : " + error.text;
        });
    });