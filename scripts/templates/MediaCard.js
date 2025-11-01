/**
 * Crée et retourne une carte HTML avec les images ou les vidéos du photographe,
 * incluant son titre, son nombre de likes et un lien vers l'aperçu.
 *
 * @function DefineMediaTemplate
 * @param {MediaInfo} media - Instance du modèle MediaInfo contenant les informations du média.
 * @returns {HTMLElement} Élément `<article>` contenant toute la structure DOM du média.
 *
 * @example
 * const mediaModel = new MediaInfo(mediaData);
 * const mediaCard = DefineMediaTemplate(mediaModel);
 * container.appendChild(mediaCard);
 */
export function DefineMediaTemplate (media) {
    

    const mediaCard = document.createElement('figure');
    mediaCard.classList.add('mediascard');
    mediaCard.setAttribute('data-date', media.date);
    mediaCard.dataset.id = String(media.idPhoto);
    
    const linkMediaCard = document.createElement('a');
    linkMediaCard.classList.add('mediascard__link');
    mediaCard.appendChild(linkMediaCard)
    
    let visual
    // Construction du chemin complet du fichier média
    let url=`Sample-Photos/${media.photographername}/${media.urlMedia}`;
    if (media.isImage) {
        visual = document.createElement('img');
        visual.src = url;
        visual.alt = media.title
        visual.classList.add('mediascard__link__image');
        visual.setAttribute("aria-describedby",`mediascardcontent__description_${media.idPhoto}`);

       
    } else  {
        visual= document.createElement('video');
        visual.src = url;
        visual.alt = `Extrait de la vidéo : ${media.title}`; 
        visual.classList.add('mediascard__link__video');
        visual.setAttribute("aria-describedby",`mediascardcontent__description_${media.idPhoto}`);
    }
    
    linkMediaCard.appendChild(visual);
    linkMediaCard.href = url;
    linkMediaCard.title= media.title; 
  
    const contentMediaCard = document.createElement ('div');
    contentMediaCard.classList.add('mediascardcontent');
    mediaCard.appendChild(contentMediaCard);

    const descriptionMediaCard= document.createElement ('figcaption');
    descriptionMediaCard.classList.add('mediascardcontent__description'); 
    descriptionMediaCard.id=`mediascardcontent__description_${media.idPhoto}`; 
    descriptionMediaCard.textContent = media.title;
    contentMediaCard.appendChild(descriptionMediaCard);

    const like= document.createElement ('div');
    like.classList.add('mediascardcontent__like');
    like.dataset.id = String(media.idPhoto);

    contentMediaCard.appendChild(like);

    const nbLikeCard= document.createElement ('span');
    nbLikeCard.textContent = `${media.likes}`;
    nbLikeCard.classList.add('mediascardcontent__like-nblike');
    nbLikeCard.setAttribute('aria-label', `Nombre de like` );    
    like.appendChild(nbLikeCard);

    const likeHeart= document.createElement ('div');
    likeHeart.classList.add('mediascardcontent__like-btn');
    like.appendChild(likeHeart);

    // Créer les deux icônes
    const heartRegular = document.createElement('i');
    heartRegular.classList.add('fa-regular', 'fa-heart');
    likeHeart.appendChild(heartRegular);

    const heartSolid = document.createElement('i');
    heartSolid.classList.add('fa-solid', 'fa-heart');
    likeHeart.appendChild(heartSolid);


    return mediaCard;
}

