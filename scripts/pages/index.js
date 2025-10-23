import {photographersTemplate} from '../templates/photographersDisplay.js'  
import {getPhotographers} from '../utils/getData.js'

      
/**
 * Affiche la liste des photographes sur la page.
 *
 * @async
 * @function displayData
 * @param {Array<Object>} photographers - Tableau des objets photographes récupérés depuis les données JSON.
 * @param {string} photographers[].name - Nom du photographe.
 * @param {number} photographers[].id - Identifiant unique du photographe.
 * @param {string} photographers[].portrait - Nom du fichier image du photographe.
 * @param {string} photographers[].city - Ville du photographe.
 * @param {string} photographers[].country - Pays du photographe.
 * @param {string} photographers[].tagline - Phrase d’accroche du photographe.
 * @param {number} photographers[].price - Tarif journalier du photographe.
 * 
 * @returns {void}
 *
 * @description
 * Pour chaque photographe :
 * - Crée une carte (DOM) à partir du template `photographerTemplate()`
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
/**
 * Initialise la page d'accueil :
 * - Récupère et affiche les données des photographes
 * @async
 * @function init
 * @returns {<void>} - Promesse résolue une fois l’affichage terminé.
 */

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    // Affiche tous les photographes sur la page
    displayData(photographers);

    };

// Exécution principale
init();
    
