import {photographersTemplate} from '../templates/photographersDisplay.js'  
import {getPhotographers} from '../utils/getData.js'

/**********************************************************************************
 * Type représentant un photographe.
 * @typedef {object} Photographer
 * @property {string} name - Nom du photographe.
 * @property {number} id - Identifiant unique.
 * @property {string} portrait - Nom du fichier image.
 * @property {string} city - Ville.
 * @property {string} country - Pays.
 * @property {string} tagline - Phrase d’accroche.
 * @property {number} price - Tarif journalier.
 */

/**********************************************************************************
 * Affiche la liste des photographes sur la page d'accueil.
 *
 * @async
 * @function displayData
 * @param {Photographer[]} photographers - Tableau des photographes récupérés depuis les données JSON.
 * @returns {Promise<void>} Promesse résolue une fois l’affichage terminé
 * 
 * @description
 * Pour chaque photographe :
 * - Crée une carte DOM à partir de `photographersTemplate()`
 * - Ajoute cette carte dans la section `.photographer`
 */
async function displayData(photographers) {
    // sélection de la balise section
    const photographersSection = document.querySelector(".photographer");

    photographers.forEach((photographer) => {

        const photographerModel = photographersTemplate(photographer);
        
        // Création du modèle de photographe à partir du template 
        const userCardDOM = photographerModel.getUserCardDOM();

        // Ajout du modèle au DOM
        photographersSection.appendChild(userCardDOM);
        
    });
}


/**********************************************************************************
 * Initialise la page d'accueil :
 * - Récupère et affiche les données des photographes
 * @async
 * @function init 
 * @returns {Promise<void>} Promesse faite après rendu des cartes.
 *
 * @description
 *  Récupère et affiche les données des photographes.
 *  Affiche tous les photographes sur la page
 */
 async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();

    // Affiche tous les photographes sur la page
    displayData(photographers);

    };

// Exécution principale
init();
    
