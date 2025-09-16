// Configuration Firebase (à remplacer par votre configuration)
const firebaseConfig = {
    apiKey: "AIzaSyCFERME8CyH09LWGnb0tOo-WEZZaB3YgoI",
    authDomain: "voyage-essaie.firebaseapp.com",
    databaseURL: "https://voyage-essaie-default-rtdb.firebaseio.com",
    projectId: "voyage-essaie",
    storageBucket: "voyage-essaie.firebasestorage.app",
    messagingSenderId: "534600678204",
    appId: "1:534600678204:web:078b496fa178faf40bfc39"
};

// Initialisation de Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Fonction pour afficher/masquer les détails des voyageurs
async function toggleVoyageurs(busId, codebus) {
    // Vérifier si la ligne de détails existe déjà
    const existingDetails = document.getElementById(`details-${busId}`);
    if (existingDetails) {
        existingDetails.remove();
        return;
    }

    // Afficher le chargement
    const loadingRow = document.createElement('tr');
    loadingRow.id = `details-${busId}`;
    loadingRow.innerHTML = `<td colspan="15" class="loading-details"><i class="fas fa-spinner fa-spin"></i> Chargement des voyageurs...</td>`;
    
    // Insérer la ligne de chargement
    const busRow = document.getElementById(`bus-${busId}`);
    busRow.parentNode.insertBefore(loadingRow, busRow.nextSibling);

    try {
        // Récupérer les transactions pour ce bus
        const transactionsRef = db.collection('TRANSACTIONS');
        
        // Requête unique sur le champ codebus qui correspond à motpassebus
        const querySnapshot = await transactionsRef.where('codebus', '==', parseInt(codebus)).get();
        
        // Créer la ligne de détails
        const detailsRow = document.createElement('tr');
        detailsRow.id = `details-${busId}`;
        detailsRow.className = 'voyageurs-details';
        
        if (querySnapshot.empty) {
            detailsRow.innerHTML = `
                <td colspan="15" class="no-voyageurs">
                    <i class="fas fa-info-circle"></i> Aucun voyageur trouvé pour ce bus.
                </td>`;
        } else {
            // Créer le contenu du tableau des voyageurs
            let voyageursHTML = `
                <td colspan="15">
                    <div class="voyageurs-container">
                        <h4>Liste des voyageurs (${querySnapshot.size})</h4>
                        <table class="voyageurs-table">
                            <thead>
                                <tr>
                                    <th>Code Bus</th>
                                    <th>Code Ticket</th>
                                    <th>Agence</th>
                                    <th>Date d'achat</th>
                                </tr>
                            </thead>
                            <tbody>`;
            
            // Parcourir les transactions et ajouter chaque voyageur
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const dateAchat = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString() : 'N/A';
                
                voyageursHTML += `
                                <tr>
                                    <td>${data.codebus || 'N/A'}</td>
                                    <td>${data.ticketCode || 'N/A'}</td>
                                    <td>${data.nomagence || 'N/A'}</td>
                                    <td>${dateAchat}</td>
                                </tr>`;
            });
            
            voyageursHTML += `
                            </tbody>
                        </table>
                    </div>
                </td>`;
            
            detailsRow.innerHTML = voyageursHTML;
        }
        
        // Remplacer la ligne de chargement par les détails
        loadingRow.replaceWith(detailsRow);
        
    } catch (error) {
        console.error('Erreur lors de la récupération des voyageurs:', error);
        loadingRow.innerHTML = `
            <td colspan="15" class="error-details">
                <i class="fas fa-exclamation-triangle"></i> Erreur lors du chargement des voyageurs.
            </td>`;
    }
}


// Fonction pour supprimer un bus et ses transactions associées
async function supprimerBus(busId, motpassebus) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bus et tous les billets associés ?')) {
        return;
    }

    try {
        // Supprimer d'abord les transactions associées
        const transactionsRef = db.collection('CONTROLE').doc('TRANSACTIONS').collection('NG_TICKET');
        const querySnapshot = await transactionsRef.where('codebus', '==', parseInt(motpassebus)).get();
        
        // Supprimer tous les documents correspondants
        const batch = db.batch();
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        
        // Exécuter la suppression en lot
        await batch.commit();
        console.log(`${querySnapshot.size} transactions supprimées pour le bus ${motpassebus}`);
        
        // Ensuite, supprimer le bus
        await db.collection('CONTROLE').doc('BUS').collection('NG_TICKET').doc(busId).delete();
        console.log('Bus supprimé avec succès');
        alert('Le bus et tous les billets associés ont été supprimés avec succès');
         setTimeout(function() {
                        location.reload(true);
                      }, 4000);
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Une erreur est survenue lors de la suppression. Veuillez réessayer.');
    }
}
// Exposer les fonctions au scope global
if (typeof window !== 'undefined') {
    window.toggleVoyageurs = toggleVoyageurs;
    window.supprimerBus = supprimerBus;
}

// Exporter pour les modules ES6
export { toggleVoyageurs, supprimerBus };

// Style pour les détails des voyageurs
const style = document.createElement('style');
style.textContent = `
    /* Style pour les détails des voyageurs */
    .voyageurs-details {
        background-color: #f9f9f9;
    }
    
    .voyageurs-details td {
        padding: 0 !important;
        border-top: none;
    }
    
    .voyageurs-container {
        padding: 15px;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin: 5px 0;
    }
    
    .voyageurs-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        background-color: white;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .voyageurs-table th, 
    .voyageurs-table td {
        padding: 10px 15px;
        text-align: left;
        border: 1px solid #ddd;
    }
    
    .voyageurs-table th {
        background-color: #4CAF50;
        color: white;
        font-weight: 500;
    }
    
    .voyageurs-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    
    .voyageurs-table tr:hover {
        background-color: #e6e6e6;
    }
    
    .loading-details, 
    .no-voyageurs,
    .error-details {
        padding: 15px;
        text-align: center;
        color: #666;
    }
    
    .error-details {
        color: #d32f2f;
    }
    
    .voyageurs-container h4 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 14px;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const agencesList = document.getElementById('agences-list');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

        // La fonction supprimerBus est maintenant définie dans la portée globale

    // Fonction pour afficher la liste des bus pour une destination
    async function afficherBus(destinationId, container) {
        try {
            // Afficher le chargement
            container.innerHTML = '<div class="loading-bus"><i class="fas fa-spinner fa-spin"></i> Chargement des bus...</div>';
            
            // Récupérer d'abord les informations de la destination
            const destinationDoc = await db.collection('CONTROLE').doc('DESTINATION').collection('NG_TRAVEL').doc(destinationId).get();
            if (!destinationDoc.exists) {
                container.innerHTML = '<div class="no-bus">Destination non trouvée</div>';
                return;
            }
            const destination = destinationDoc.data();
            
            console.log('Recherche des bus pour:', destination.ville1, destination.quartier1);
            
            // Récupérer les bus correspondant à cette destination
            const busSnapshot = await db.collection('CONTROLE').doc('BUS').collection('NG_TICKET')
                .where('ville_depart', '==', destination.ville1)
                .where('quartier_depart', '==', destination.quartier1)
                .get();
                
            console.log('Nombre de bus trouvés:', busSnapshot.size);

            if (busSnapshot.empty) {
                container.innerHTML = `
                    <div class="no-bus">
                        Aucun bus programmé pour ${destination.ville1}, ${destination.quartier1}
                    </div>`;
                return;
            }

            // Fonction pour formater la date avec le jour de la semaine
            function formaterDateAvecJour(dateStr) {
                if (!dateStr) return 'Date non spécifiée';
                
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                try {
                    const date = new Date(dateStr);
                    // Vérifier si la date est valide
                    if (isNaN(date.getTime())) return dateStr;
                    
                    // Mettre en majuscule la première lettre du jour
                    const dateFormatee = date.toLocaleDateString('fr-FR', options);
                    return dateFormatee.charAt(0).toUpperCase() + dateFormatee.slice(1);
                } catch (e) {
                    return dateStr;
                }
            }

            // Grouper les bus par date de voyage
            const busesParDate = {};
            busSnapshot.forEach(doc => {
                const bus = doc.data();
                const dateVoyage = bus.date_voyage || 'Date non spécifiée';
                
                if (!busesParDate[dateVoyage]) {
                    busesParDate[dateVoyage] = [];
                }
                busesParDate[dateVoyage].push({ id: doc.id, ...bus });
            });

            let busHTML = '';
            
            // Trier les dates par ordre chronologique
            const datesTriees = Object.entries(busesParDate).sort((a, b) => {
                return new Date(a[0]) - new Date(b[0]);
            });

            // Fonction pour récupérer les statistiques des places prises
            async function getBusStatistics(busId, codeBus) {
                try {
                    const transactionsSnapshot = await db.collection('CONTROLE').doc("TRANSACTIONS").collection("NG_TICKET")
                        .where('codebus', '==', codeBus)
                        .get();
                    
                    // Retourne uniquement le nombre de places prises
                    return { placesPrises: transactionsSnapshot.size };
                } catch (error) {
                    console.error('Erreur lors de la récupération des statistiques:', error);
                    return { placesPrises: 0 };
                }
            }


            // Parcourir les dates triées et afficher les bus correspondants
            for (const [dateVoyage, buses] of datesTriees) {
                const dateFormatee = formaterDateAvecJour(dateVoyage);
                busHTML += `
                    <div class="date-section">
                        <span>${dateFormatee}</span>
                        <span class="badge">${buses.length} bus</span>
                    </div>
                    <div class="bus-list">
                        <div class="bus-list-content">
                            <table class="bus-table">
                                <thead>
                                    <tr>
                                        <th>Agences</th>
                                        <th>N° Bus</th>
                                        <th>Etat ticket</th>
                                        <th>Nom chauffeur</th>
                                        <th>Immatriculation</th>
                                        <th>Ville Départ</th>
                                        <th>Quartier Départ</th>
                                        <th>Ville arrivée</th>
                                        <th>Quartier arrivée</th>
                                        <th>Heure Départ</th>
                                        <th>Places disponibles</th>
                                        <th>Places prises</th>
                                        <th>Places restantes</th>
                                        <th>Prix du ticket</th>
                                        <th>Montant total</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>`;

                // Utiliser Promise.all pour attendre toutes les requêtes asynchrones
                const busesWithStats = await Promise.all(buses.map(async (bus) => {
                    const stats = await getBusStatistics(bus.id, bus.motpassebus || '');
                    return { ...bus, ...stats };
                }));

                busesWithStats.forEach(bus => {
                    const placesRestantes = Math.max(0, (bus.nombre_siege || 0) - (bus.placesPrises || 0));
                    
                    busHTML += `
                                    <tr id="bus-${bus.id}">
                                        <td>${bus.nomagence || 'N/A'}</td>
                                        <td>${bus.numerobus || 'N/A'}</td>
                                        <td>${bus.etat || 'N/A'}</td>
                                        <td>${bus.chauffeur || 'N/A'}</td>
                                        <td>${bus.immatriculation || 'N/A'}</td>
                                        <td>${bus.ville_depart || 'N/A'}</td>
                                        <td>${bus.quartier_depart || 'N/A'}</td>
                                        <td>${bus.ville_arriver || 'N/A'}</td>
                                        <td>${bus.quartier_arriver || 'N/A'}</td>
                                        <td>${bus.heure_depart || 'N/A'}</td>
                                        <td>${bus.nombre_siege || '0'}</td>
                                        <td>${bus.placesPrises || '0'}</td>
                                        <td>${placesRestantes || '0'}</td>
                                        <td>${bus.prix_ticket || '0'} FCFA</td>
                                        <td>${(bus.placesPrises * (parseFloat(bus.prix_ticket) || 0)).toFixed(2)} FCFA</td>
                                        <td class="actions-cell">
                                            <button class="btn-view" onclick="toggleVoyageurs('${bus.id}', '${bus.motpassebus}')">
                                                <i class="fas fa-users"></i> Voir voyageurs
                                            </button>
                                            <button class="btn-delete" onclick="supprimerBus('${bus.id}', '${parseInt(bus.motpassebus)}')">
                                                <i class="fas fa-trash"></i> Supprimer
                                            </button>
                                        </td>
                                    </tr>`;
                });

                busHTML += `
                                </tbody>
                            </table>
                        </div>
                    </div>`;
            }

            container.innerHTML = busHTML;
        } catch (error) {
            console.error('Erreur lors du chargement des bus:', error);
            container.innerHTML = '<div class="error">Erreur lors du chargement des bus</div>';
        }
    }

    // Fonction pour afficher les agences avec leurs destinations correspondantes
    async function displayAgences() {
        try {
            // Afficher le chargement
            agencesList.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner"></i> Chargement des agences...
                </div>`;

            // Récupérer toutes les agences
            const agencesSnapshot = await db.collection('CONTROLE').doc("AGENCES").collection("NG_TICKET").get();
            
            if (agencesSnapshot.empty) {
                agencesList.innerHTML = '<div class="error-message">Aucune agence trouvée</div>';
                return;
            }

            // Récupérer toutes les destinations
            const destinationsSnapshot = await db.collection('CONTROLE').doc("DESTINATION").collection("NG_TRAVEL").get();
            
            // Créer une map des destinations groupées par uid
            const destinationsMap = new Map();
            destinationsSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.uid) {
                    if (!destinationsMap.has(data.uid)) {
                        destinationsMap.set(data.uid, []);
                    }
                    destinationsMap.get(data.uid).push({
                        ville1: data.ville1 || 'Non spécifiée',
                        quartier1: data.quartier1 || 'Non spécifié',
                        id: doc.id
                    });
                }
            });

            // Vider la liste
            agencesList.innerHTML = '';
            let hasMatchingAgences = false;

            // Parcourir toutes les agences
            agencesSnapshot.forEach(doc => {
                const agenceData = doc.data();
                
                // Vérifier si l'agence a des destinations
                if (agenceData.uid && destinationsMap.has(agenceData.uid)) {
                    hasMatchingAgences = true;
                    const destinations = destinationsMap.get(agenceData.uid);
                    
                    // Créer la carte d'agence
                    const agenceCard = document.createElement('div');
                    agenceCard.className = 'agence-card';
                    
                    // Créer le contenu de la carte avec toutes les destinations
                    let destinationsHTML = '';
                    destinations.forEach(dest => {
                        const containerId = `bus-container-${dest.id.replace(/\s+/g, '-')}`;
                        console.log('Création du conteneur pour la destination:', dest.ville1, dest.quartier1, 'ID:', containerId);
                        
                        destinationsHTML += `
                            <div class="destination-item">
                                <div class="destination-header" data-destination-id="${dest.id}">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>${dest.ville1}, ${dest.quartier1}</span>
                                    <i class="fas fa-chevron-down arrow"></i>
                                </div>
                                <div id="${containerId}" class="bus-container">
                                    <div class="loading-bus">
                                        <i class="fas fa-spinner fa-spin"></i> Chargement des bus...
                                    </div>
                                </div>
                            </div>`;
                    });
                    
                    agenceCard.innerHTML = `
                        <div class="agence-header">
                            <div class="agence-name">
                                <i class="fas fa-building"></i>
                                ${agenceData.agence || 'Nom non disponible'}
                            </div>
                            <div class="destinations-list">
                                ${destinationsHTML}
                            </div>
                        </div>
                    `;
                    
                    agencesList.appendChild(agenceCard);
                    
                    // Ajouter les écouteurs d'événements après l'insertion dans le DOM
                    destinations.forEach(dest => {
                        const containerId = `bus-container-${dest.id.replace(/\s+/g, '-')}`;
                        const container = document.getElementById(containerId);
                        const header = container ? container.previousElementSibling : null;
                        
                        if (!container || !header) {
                            console.error('Élément non trouvé pour la destination:', dest.id);
                            return;
                        }
                        
                        // Supprimer d'abord les anciens écouteurs
                        const newHeader = header.cloneNode(true);
                        header.parentNode.replaceChild(newHeader, header);
                        
                        // Ajouter le nouvel écouteur d'événement
                        newHeader.addEventListener('click', async function(e) {
                            console.log('Clic sur la destination:', dest.id);
                            e.stopPropagation();
                            
                            // Basculer la classe show
                            container.classList.toggle('show');
                            
                            // Si le conteneur est visible et vide, charger les bus
                            if (container.classList.contains('show') && container.children.length === 1) {
                                console.log('Chargement des bus pour:', dest.ville1, dest.quartier1);
                                try {
                                    await afficherBus(dest.id, container);
                                } catch (error) {
                                    console.error('Erreur lors du chargement des bus:', error);
                                    container.innerHTML = '<div class="error">Erreur lors du chargement des bus</div>';
                                }
                            }
                        });
                    });
                }
            });

            // Afficher un message si aucune correspondance n'a été trouvée
            if (!hasMatchingAgences) {
                agencesList.innerHTML = '<div class="error-message">Aucune agence avec destination correspondante trouvée</div>';
            }

        } catch (error) {
            console.error("Erreur lors du chargement des agences:", error);
            agencesList.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    Une erreur est survenue lors du chargement des agences. Veuillez réessayer.
                </div>`;
        }
    }

    // Gestion du menu mobile
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Charger les agences au démarrage
    displayAgences();
});
