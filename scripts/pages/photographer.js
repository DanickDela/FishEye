
import {PhotographTemplate} from '../templates/photographDisplay.js'  
import {getPhotographers, getPhotographIdfromURL}  from '../utils/getData.js'
import pageMediaTemplate from '../templates/factoryMedia.js'
import {lightBox} from '../utils/lightbox.js'
import {sortBy} from '../utils/SortBy.js'
import {displayLike} from '../utils/displayLikes.js'


export const getPhotographer = async () => {

    //permet d'utiliser l'ID récupéré dans l'URL dans la function en dynamique
    const photographerId = getPhotographIdfromURL();

    const data = await getPhotographers();
    const photographers = data.photographers
    const mediasPhotographers = data.media

    // Rechercher le photographe dont l'ID correspond à celui de l'URL
    const photographerCard = photographers.find(p => Number(p.id)=== Number(photographerId))

    if (photographerCard !== null) {
        // Création du template pour le header du photographe
        const photographerModel = PhotographTemplate(photographerCard);
        const userCardDOM = photographerModel.getUserCardDOM();


        // Insertion du header pour le photographe dans main
        const photographersSection = document.querySelector('.photograph-display')
        photographersSection.appendChild(userCardDOM);


        const mediaPhotographerSection = document.querySelector('.media-photographer');

        // Filtrer les médias du photographe actuel 
        const mediasPhotographer = mediasPhotographers.filter(me => me.photographerId == photographerId);

        for (let i = 0; i < mediasPhotographer.length; i++) {
            const media = mediasPhotographer[i];
            const mediaModel = await pageMediaTemplate(media);
            const mediaCardDOM = mediaModel.getModelCardDOM();
            mediaPhotographerSection.appendChild(mediaCardDOM);   
       }

        // Ajout du nom du photographe
         const namePhotograph = photographerCard.name; 
         const photographName = document.querySelector(".modal__photographname");
         photographName.textContent =namePhotograph;
         photographName.setAttribute ('aria-label', 'Nom du photographe: ${name}');

        //affichage des likes

        displayLike();

        // Menu trier
        sortBy ();

        // attendre que les images des cartes soient chargées (optionnel mais sûr)
        window.requestAnimationFrame(() => {
            lightBox.init();
        });
    }
   
}

getPhotographer()