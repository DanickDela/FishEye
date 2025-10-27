
import {getPhotographers, getPhotographIdfromURL}  from '../utils/getData.js';
import {DefinePhotographerHeader } from "../templates/PhotographerHeader.js";
import {DefineMediaTemplate} from '../templates/MediaCard.js'
import {lightBox} from '../utils/lightbox.js';
import {sortBy} from '../utils/SortBy.js';
import {displayLike} from '../utils/displayLikes.js';


export const getPhotographer = async () => {

    // Récupérer l'ID du photographe depuis l'URL
    const photographerId = getPhotographIdfromURL();

    //Charger toutes les données (photographes + médias)
    const data = await getPhotographers();
    const photographers = data.photographers;
    const mediasPhotographers = data.media;

    //Trouver le photographe correspondant à l'id
    const photographerCard = photographers.find(p => Number(p.id)=== Number(photographerId))


    if (photographerCard !== null) {
        //Création du modèle Photographe (via Factory)
        const photographer = ModelFactory.DisplayPhotographer(photographerCard);

        //construction du header Photographe
        const photographersSection = document.querySelector('.photograph-display')
        photographersSection.appendChild(DefinePhotographerHeader(photographer));
        
        /****************
         *  Médias du photographe
         */

        // Filtrer uniquement les médias de ce photographe
        const filteredMedias = mediasPhotographers
            .filter(m => Number(m.photographerId) === Number(photographerId)
        );

        // Convertir en modèles MediaInfo
        const medias = filteredMedias.map(m => ModelFactory.DisplayMedia(m))

        // Ajout du nom du photographe dans chaque média (ex: dossier nom)
        // Ici on ne garde que le prénom : "Mimi", "Ellie-Rose", etc.
        const photographerName = photographerCard.name.split(' ')[0].replace('-', ' ');

        medias.forEach(m => {
           m.photographername= photographerName;

        });

        //Affichage des cartes média
        const mediaPhotographerSection = document.querySelector('.media-photographer');
        medias.forEach(m => mediaPhotographerSection.appendChild(DefineMediaTemplate(m)))


        // Nom du photographe dans la modale de contact
         const namePhotograph = photographerCard.name; 
         const photographName = document.querySelector(".modal__photographname");
         photographName.textContent =namePhotograph;
         photographName.setAttribute ('aria-label', 'Nom du photographe: ${name}');

        //Affichage du total de likes
        displayLike(medias);

        //Activation du tri
        sortBy ();

        // attendre que les images des cartes soient chargées 
        //Initialisation lightbox 
        window.requestAnimationFrame(() => {
            lightBox.init();
        });
    }
   
}

getPhotographer()