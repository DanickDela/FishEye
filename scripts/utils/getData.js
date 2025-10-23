/**
 * @module utils/getData
 * @description
 * Contient les fonctions utilitaires pour récupérer les données des photographes
 * depuis le fichier `photographers.json` et manipuler les identifiants liés à l’URL.
 */

/**
 * Récupère les données des photographes depuis le fichier JSON local.
 *
 * @async
 * @function getPhotographers
 * @returns { photographers: Array<Object> }
 * Un objet contenant un tableau `photographers` avec la liste des photographes.
 */
export const getPhotographers= async() => {
    try {
         //récupération des données dans le fichier JSON
        const response = await fetch('./data/photographers.json'); 
        // Transformer la réponse de la requête en données JSON
        const photographersData = await response.json();

        return photographersData;

    } catch (error) {
        console.error('Pas de données disponibles :', error);
        return { photographers: [] };
    }
};

/**
 * Récupère un photographe spécifique à partir de son identifiant.
 *
 * @async
 * @function getPhotographerFromID
 * @param {number|string} id - L’identifiant du photographe à rechercher.
 * @returns {<Object>} 
 * Retourne l’objet du photographe   
 * ou `undefined` si aucun photographe ne correspond.
 */
export const getPhotographerFromID = async (id) => {
    // Récupérer toutes les données des photographes
    const data = await getPhotographers();
    const photographers = data.photographers;

    //Recherche le photographe pour l'id demandé
    const photographer = photographers.find(photographer => photographer.id == id);
    return photographer;
}

/**
 * Extrait l’identifiant du photographe à partir des paramètres de l’URL courante.
 *
 * @function getPhotographIdfromURL
 * @returns {string|null} L’ID du photographe trouvé dans les paramètres de l’URL, ou `null` s’il n’existe pas.
 */
export const getPhotographIdfromURL = () => {

    const urlPhotographer = new URL(window.location.href)
    const params = urlPhotographer.searchParams
    const id = params.get('id')
    return id
}
