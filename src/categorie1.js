document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du DOM
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
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
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Mettre à jour la classe active
            document.querySelectorAll('.nav-links a').forEach(item => {
                item.classList.remove('active');
            });
            link.classList.add('active');
        });
    });
    
    // Mise en surbrillance de l'onglet actif
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'categorie1.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Si on est sur la page d'accueil (sans nom de fichier)
        if (currentPage === '') {
            document.querySelector('.nav-links a[href="categorie1.html"]')?.classList.add('active');
            return;
        }
        
        navLinks.forEach(link => {
            // Si le lien a la classe 'active' (pour les liens avec #)
            if (link.classList.contains('active')) {
                return; // On garde cette classe
            }
            
            // Pour les autres liens, on vérifie s'ils correspondent à la page courante
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Appeler la fonction au chargement
    setActiveLink();
});
