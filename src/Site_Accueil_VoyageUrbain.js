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


        //pour l'etat des tickets
        // Référence à la collection produits
        const etatticketRef = collection(db,"CONTROLE");
        const etatticketfirst = doc(etatticketRef,"ETAT_TICKET");
        const etatticketsecond = collection(etatticketfirst,"NG_TICKET");

        // Éléments du DOM
        const productInput = document.getElementById('etat_value');
        const dropdown = document.getElementById('dropdown');

        // Charger les produits au clic sur le champ
        productInput.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown() {
            if (dropdown.style.display === 'block') {
                hideDropdown();
            } else {
                loadProducts();
                showDropdown();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts() {
            // Ne recharger que si la liste est vide
            if (dropdown.children.length === 0) {
                showLoading();
                
                try {
                    const snapshot = await getDocs(etatticketsecond);
                    const products = [];
                    
                    snapshot.forEach(doc => {
                        products.push({...doc.data() });
                    });

                    displayProducts(products);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts(products) {
            dropdown.innerHTML = '';
            
            if (products.length === 0) {
                dropdown.innerHTML = '<div class="loading">Aucun etat de ticket trouvé</div>';
                return;
            }

            products.forEach(product => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText = product.etat_ticket ;
                item.textContent = displayText;
                
                item.addEventListener('click', () => {
                    selectProduct(product, displayText);
                });
                
                dropdown.appendChild(item);
            });
        }

        // Sélectionner un produit
        function selectProduct(product, displayText) {
            productInput.value = displayText;
            hideDropdown();
                        
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput.dataset.productId = product.id;
        }

        // Fonctions utilitaires
        function showLoading() {
            dropdown.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown();
        }

        function showDropdown() {
            dropdown.style.display = 'block';
        }

        function hideDropdown() {
            dropdown.style.display = 'none';
        }



        //pour les trajet
    
         // Référence à la collection produits
        const trajetRef = collection(db,"CONTROLE");
        const trajetfirst = doc(trajetRef,"TRAJET");
        const trajetsecond = collection(trajetfirst,"NG_TICKET");

        // Éléments du DOM
        const productInput1 = document.getElementById('value_trajet');
        const dropdown1 = document.getElementById('dropdown1');

        // Charger les produits au clic sur le champ
        productInput1.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown1();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown1();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown1.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown1() {
            if (dropdown1.style.display === 'block') {
                hideDropdown1();
            } else {
                loadProducts1();
                showDropdown1();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts1() {
            // Ne recharger que si la liste est vide
            if (dropdown1.children.length === 0) {
                showLoading1();
                
                try {
                    const snapshot = await getDocs(trajetsecond);
                    const products1 = [];
                    
                    snapshot.forEach(doc => {
                        products1.push({...doc.data() });
                    });

                    displayProducts1(products1);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts1(products1) {
            dropdown1.innerHTML = '';
            
            if (products1.length === 0) {
                dropdown1.innerHTML = '<div class="loading">Aucun trajet trouvé</div>';
                return;
            }

            products1.forEach(product1 => {
                const item1 = document.createElement('div');
                item1.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText1 = product1.trajet ;
                item1.textContent = displayText1;
                
                item1.addEventListener('click', () => {
                    selectProduct1(product1, displayText1);
                });
                
                dropdown1.appendChild(item1);
            });
        }

        // Sélectionner un produit
        function selectProduct1(product1, displayText1) {
            productInput1.value = displayText1;
            hideDropdown1();
                        
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput1.dataset.productId = product1.id;
        }

        // Fonctions utilitaires
        function showLoading1() {
            dropdown1.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown1();
        }

        function showDropdown1() {
            dropdown1.style.display = 'block';
        }

        function hideDropdown1() {
            dropdown1.style.display = 'none';
        }

        

                //pour les categories
         // Référence à la collection produits

        const categoriefirst = collection(db,"AGENCES");
        const categorieseconf = doc(categoriefirst,uid);
        const categoriethird = collection(categorieseconf,info.agence);
        const categoriefouth = doc(categoriethird,"CATEGORIES");
        const categoriefifth = collection(categoriefouth,"DETAILS");       

        // Éléments du DOM
        const productInput2 = document.getElementById('value_categorie');
        const dropdown2 = document.getElementById('dropdown2');

        // Charger les produits au clic sur le champ
        productInput2.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown2();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown2();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown2.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown2() {
            if (dropdown2.style.display === 'block') {
                hideDropdown2();
            } else {
                loadProducts2();
                showDropdown2();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts2() {
            // Ne recharger que si la liste est vide
            if (dropdown2.children.length === 0) {
                showLoading2();
                
                try {
                    const snapshot = await getDocs(categoriefifth);
                    const products2 = [];
                    
                    snapshot.forEach(doc => {
                        products2.push({...doc.data() });
                    });

                    displayProducts2(products2);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown2.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts2(products2) {
            dropdown2.innerHTML = '';
            
            if (products2.length === 0) {
                dropdown2.innerHTML = '<div class="loading">Aucun categorie trouvé</div>';
                return;
            }

            products2.forEach(product2 => {
                const item2 = document.createElement('div');
                item2.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText2 = product2.nomcategorie ;
                item2.textContent = displayText2;
                
                item2.addEventListener('click', () => {
                    selectProduct2(product2, displayText2);
                });
                
                dropdown2.appendChild(item2);
            });
        }

        // Sélectionner un produit
        function selectProduct2(product2, displayText2) {
            productInput2.value = displayText2;
            hideDropdown2();            
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput2.dataset.productId = product2.id;
        }

        // Fonctions utilitaires
        function showLoading2() {
            dropdown2.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown2();
        }

        function showDropdown2() {
            dropdown2.style.display = 'block';
        }

        function hideDropdown2() {
            dropdown2.style.display = 'none';
        }


                        //pour la villedepart
         // Référence à la collection produits

        const villedepartfirst = collection(db,"AGENCES");
        const villedepartseconf = doc(villedepartfirst,uid);
        const villedepartthird = collection(villedepartseconf,info.agence);
        const villedepartfouth = doc(villedepartthird,"DESTINATION");
        const villedepartfifth = collection(villedepartfouth,"INFORMATION");       

        // Éléments du DOM
        const productInput3 = document.getElementById('select_1');
        const dropdown3 = document.getElementById('dropdown3');

        // Charger les produits au clic sur le champ
        productInput3.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown3();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown3();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown3.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown3() {
            if (dropdown3.style.display === 'block') {
                hideDropdown3();
            } else {
                loadProducts3();
                showDropdown3();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts3() {
            // Ne recharger que si la liste est vide
            if (dropdown3.children.length === 0) {
                showLoading3();
                
                try {
                    const snapshot = await getDocs(villedepartfifth);
                    const products3 = [];
                    
                    snapshot.forEach(doc => {
                        products3.push({...doc.data() });
                    });

                    displayProducts3(products3);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown3.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts3(products3) {
            dropdown3.innerHTML = '';
            
            if (products3.length === 0) {
                dropdown3.innerHTML = '<div class="loading">Aucun categorie trouvé</div>';
                return;
            }

            products3.forEach(product3 => {
                const item3 = document.createElement('div');
                item3.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText3 = product3.ville1 ;
                item3.textContent = displayText3;
                
                item3.addEventListener('click', () => {
                    selectProduct3(product3, displayText3);
                });
                
                dropdown3.appendChild(item3);
            });
        }

        // Sélectionner un produit
        function selectProduct3(product3, displayText3) {
            productInput3.value = displayText3;
            hideDropdown3();            
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput3.dataset.productId = product3.id;
        }

        // Fonctions utilitaires
        function showLoading3() {
            dropdown3.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown3();
        }

        function showDropdown3() {
            dropdown3.style.display = 'block';
        }

        function hideDropdown3() {
            dropdown3.style.display = 'none';
        }


                                //pour la quartierdepart
         // Référence à la collection produits

        const quartierdepartfirst = collection(db,"AGENCES");
        const quartierdepartseconf = doc(quartierdepartfirst,uid);
        const quartierdepartthird = collection(quartierdepartseconf,info.agence);
        const quartierdepartfouth = doc(quartierdepartthird,"DESTINATION");
        const quartierdepartfifth = collection(quartierdepartfouth,"INFORMATION");       

        // Éléments du DOM
        const productInput4 = document.getElementById('select_2');
        const dropdown4 = document.getElementById('dropdown4');

        // Charger les produits au clic sur le champ
        productInput4.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown4();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown4();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown4.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown4() {
            if (dropdown4.style.display === 'block') {
                hideDropdown4();
            } else {
                loadProducts4();
                showDropdown4();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts4() {
            // Ne recharger que si la liste est vide
            if (dropdown4.children.length === 0) {
                showLoading4();
                
                try {
                    const snapshot = await getDocs(quartierdepartfifth);
                    const products4 = [];
                    
                    snapshot.forEach(doc => {
                        products4.push({...doc.data() });
                    });

                    displayProducts4(products4);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown4.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts4(products4) {
            dropdown4.innerHTML = '';
            
            if (products4.length === 0) {
                dropdown4.innerHTML = '<div class="loading">Aucun categorie trouvé</div>';
                return;
            }

            products4.forEach(product4 => {
                const item4 = document.createElement('div');
                item4.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText4 = product4.quartier1 ;
                item4.textContent = displayText4;
                
                item4.addEventListener('click', () => {
                    selectProduct4(product4, displayText4);
                });
                
                dropdown4.appendChild(item4);
            });
        }

        // Sélectionner un produit
        function selectProduct4(product4, displayText4) {
            productInput4.value = displayText4;
            hideDropdown4();            
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput4.dataset.productId = product4.id;
        }

        // Fonctions utilitaires
        function showLoading4() {
            dropdown4.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown4();
        }

        function showDropdown4() {
            dropdown4.style.display = 'block';
        }

        function hideDropdown4() {
            dropdown4.style.display = 'none';
        }


                                //pour la villearrive
         // Référence à la collection produits

        const villearrivefirst = collection(db,"AGENCES");
        const villearriveseconf = doc(villearrivefirst,uid);
        const villearrivethird = collection(villearriveseconf,info.agence);
        const villearrivefouth = doc(villearrivethird,"DESTINATION");
        const villearrivefifth = collection(villearrivefouth,"INFORMATION");       

        // Éléments du DOM
        const productInput5 = document.getElementById('select_3');
        const dropdown5 = document.getElementById('dropdown5');

        // Charger les produits au clic sur le champ
        productInput5.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown5();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown5();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown5.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown5() {
            if (dropdown5.style.display === 'block') {
                hideDropdown5();
            } else {
                loadProducts5();
                showDropdown5();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts5() {
            // Ne recharger que si la liste est vide
            if (dropdown5.children.length === 0) {
                showLoading5();
                
                try {
                    const snapshot = await getDocs(villearrivefifth);
                    const products5 = [];
                    
                    snapshot.forEach(doc => {
                        products5.push({...doc.data() });
                    });

                    displayProducts5(products5);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown5.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts5(products5) {
            dropdown5.innerHTML = '';
            
            if (products5.length === 0) {
                dropdown5.innerHTML = '<div class="loading">Aucun categorie trouvé</div>';
                return;
            }

            products5.forEach(product5 => {
                const item5 = document.createElement('div');
                item5.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText5 = product5.ville2 ;
                item5.textContent = displayText5;
                
                item5.addEventListener('click', () => {
                    selectProduct5(product5, displayText5);
                });
                
                dropdown5.appendChild(item5);
            });
        }

        // Sélectionner un produit
        function selectProduct5(product5, displayText5) {
            productInput5.value = displayText5;
            hideDropdown5();            
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput5.dataset.productId = product5.id;
        }

        // Fonctions utilitaires
        function showLoading5() {
            dropdown5.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown5();
        }

        function showDropdown5() {
            dropdown5.style.display = 'block';
        }

        function hideDropdown5() {
            dropdown5.style.display = 'none';
        }





                //pour la quartierarrive
         // Référence à la collection produits

        const quartierarrivefirst = collection(db,"AGENCES");
        const quartierarriveseconf = doc(quartierarrivefirst,uid);
        const quartierarrivethird = collection(quartierarriveseconf,info.agence);
        const quartierarrivefouth = doc(quartierarrivethird,"DESTINATION");
        const quartierarrivefifth = collection(quartierarrivefouth,"INFORMATION");       

        // Éléments du DOM
        const productInput6 = document.getElementById('select_4');
        const dropdown6 = document.getElementById('dropdown6');

        // Charger les produits au clic sur le champ
        productInput6.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown6();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown6();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown6.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown6() {
            if (dropdown6.style.display === 'block') {
                hideDropdown6();
            } else {
                loadProducts6();
                showDropdown6();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts6() {
            // Ne recharger que si la liste est vide
            if (dropdown6.children.length === 0) {
                showLoading6();
                
                try {
                    const snapshot = await getDocs(quartierarrivefifth);
                    const products6 = [];
                    
                    snapshot.forEach(doc => {
                        products6.push({...doc.data() });
                    });

                    displayProducts6(products6);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown6.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts6(products6) {
            dropdown6.innerHTML = '';
            
            if (products6.length === 0) {
                dropdown6.innerHTML = '<div class="loading">Aucun categorie trouvé</div>';
                return;
            }

            products6.forEach(product6 => {
                const item6 = document.createElement('div');
                item6.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText6 = product6.quartier2 ;
                item6.textContent = displayText6;
                
                item6.addEventListener('click', () => {
                    selectProduct6(product6, displayText6);
                });
                
                dropdown6.appendChild(item6);
            });
        }

        // Sélectionner un produit
        function selectProduct6(product6, displayText6) {
            productInput6.value = displayText6;
            hideDropdown6();            
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput6.dataset.productId = product6.id;
        }

        // Fonctions utilitaires
        function showLoading6() {
            dropdown6.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown6();
        }

        function showDropdown6() {
            dropdown6.style.display = 'block';
        }

        function hideDropdown6() {
            dropdown6.style.display = 'none';
        }



                //pour la quartierarrive
         // Référence à la collection produits

        const tarificationsfirst = collection(db,"CONTROLE");
        const tarificationsseconf = doc(tarificationsfirst,"TARIFICATIONS");
        const tarificationsthird = collection(tarificationsseconf,"NG_TICKET");    

        // Éléments du DOM
        const productInput7 = document.getElementById('prix_ticket');
        const dropdown7 = document.getElementById('dropdown7');

        // Charger les produits au clic sur le champ
        productInput7.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown7();
        });

        // Fermer le dropdown en cliquant à l'extérieur
        document.addEventListener('click', function() {
            hideDropdown7();
        });

        // Empêcher la fermeture quand on clique dans le dropdown
        dropdown7.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Fonction pour afficher/masquer le dropdown
        function toggleDropdown7() {
            if (dropdown7.style.display === 'block') {
                hideDropdown7();
            } else {
                loadProducts7();
                showDropdown7();
            }
        }

        // Fonction pour charger les produits
        async function loadProducts7() {
            // Ne recharger que si la liste est vide
            if (dropdown7.children.length === 0) {
                showLoading7();
                
                try {
                    const snapshot = await getDocs(tarificationsthird);
                    const products7 = [];
                    
                    snapshot.forEach(doc => {
                        products7.push({...doc.data() });
                    });

                    displayProducts7(products7);
                } catch (error) {
                    console.error("Erreur:", error);
                    dropdown7.innerHTML = '<div class="loading">Erreur de chargement</div>';
                }
            }
        }

        // Afficher les produits dans le dropdown
        function displayProducts7(products7) {
            dropdown7.innerHTML = '';
            
            if (products7.length === 0) {
                dropdown7.innerHTML = '<div class="loading">Aucun prix trouvé</div>';
                return;
            }

            products7.forEach(product7 => {
                const item7 = document.createElement('div');
                item7.className = 'dropdown-item';
                
                // Afficher le nom du produit (ajustez selon votre structure)
                const displayText7 = product7.prixticket ;
                item7.textContent = displayText7;
                
                item7.addEventListener('click', () => {
                    selectProduct7(product7, displayText7);
                });
                
                dropdown7.appendChild(item7);
            });
        }

        // Sélectionner un produit
        function selectProduct7(product7, displayText7) {
            productInput7.value = displayText7;
            hideDropdown7();            
            // Stocker l'ID du produit sélectionné (utile pour les formulaires)
            productInput7.dataset.productId = product7.id;
        }

        // Fonctions utilitaires
        function showLoading7() {
            dropdown7.innerHTML = '<div class="loading">Chargement...</div>';
            showDropdown7();
        }

        function showDropdown7() {
            dropdown7.style.display = 'block';
        }

        function hideDropdown7() {
            dropdown7.style.display = 'none';
        }









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
                            numerobus: document.getElementById('numerobus').value,
                        };




                        const docRef = collection(db,"AGENCES");
                        const sousRef = doc(docRef,uid);
                        const finalRef = collection(sousRef,info.agence);
                        const ref = doc(finalRef,"BUS");
                        const refdetails = collection(ref,"DETAILS");

                        const docRefcontrole = collection(db,"CONTROLE");
                        const sousRefcontrole = doc(docRefcontrole,"BUS");
                        const finalRefcontrole = collection(sousRefcontrole,"NG_TICKET");

                        addDoc(finalRefcontrole,{
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
                            numerobus:formData.numerobus,
                            })
        
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
                            numerobus:formData.numerobus,
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


    








