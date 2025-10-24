
import { getPhotographerFromID, getPhotographIdfromURL } from "../utils/getData.js";

const pageMediaTemplate = async (data) => {
    const { photographerId, title, image, video, likes, id, date } = data;

   // Obtenir l'ID du photographe à partir de l'URL
    const idFromUrl = getPhotographIdfromURL ();
    // Récupérer les données du photographe en utilisant l'ID de l'URL
    const photographer = await getPhotographerFromID(idFromUrl);
     // Extraire le nom du photographe des données du photographe
    const photographerName = photographer.name.split(' ')[0].replace('-', ' ')

    let mediaType;
    let mediaFile;

    // Déterminer le type de média (image ou vidéo) et définir le chemin source
    if (image) {
        mediaType = "image";
        mediaFile = `Sample Photos/${photographerName}/${image}`;
    } else if (video) {
        mediaType = "video";
        mediaFile = `Sample Photos/${photographerName}/${video}`;
    }

    const getModelCardDOM = () => {

        const mediaCard = document.createElement('article');
        mediaCard.classList.add('mediascard');
        mediaCard.setAttribute('date', date);
        mediaCard.setAttribute('tabindex', '0');
       
        const linkMediaCard = document.createElement('a');
        linkMediaCard.classList.add('mediascard__link');
        linkMediaCard.setAttribute('tabindex', '0');
        mediaCard.appendChild(linkMediaCard)
       

        if (mediaType === "image") {
            const photo = document.createElement('img');
            photo.src = mediaFile;
            photo.alt = `Aperçu de la photo : ${title}`;
            photo.classList.add('mediascard__link__image');
            linkMediaCard.appendChild(photo);
            linkMediaCard.href = `Sample Photos/${photographerName}/${image}`;
            linkMediaCard.title= title; 
            photo.setAttribute('tabindex', '0');
            mediaCard.setAttribute('aria-label', `photo représentant : ${title}`);
        } else if (mediaType === "video") {
            const videoPreview = document.createElement('video');
            videoPreview.src = mediaFile; 
            videoPreview.alt = `Extrait de la vidéo : ${title}`; 
            videoPreview.classList.add('mediascard__link__video');
            linkMediaCard.appendChild(videoPreview);
            linkMediaCard.href = `Sample Photos/${photographerName}/${video}`;
            linkMediaCard.title= title; 
            videoPreview.setAttribute('tabindex', '0');
            mediaCard.setAttribute('aria-label', `vidéo de : ${title}`);
        }

        linkMediaCard.setAttribute('aria-label', `lien vers la ${mediaType}: ${title}` );

        const contentMediaCard = document.createElement ('div');
        contentMediaCard.classList.add('mediascardcontent');
        contentMediaCard.setAttribute('tabindex', '0');
        mediaCard.appendChild(contentMediaCard);

        const descriptionMediaCard= document.createElement ('h3');
        descriptionMediaCard.classList.add('mediascardcontent__description'); 
        descriptionMediaCard.textContent = title;
        contentMediaCard.appendChild(descriptionMediaCard);

        const like= document.createElement ('div');
        like.classList.add('mediascardcontent__like');

        contentMediaCard.appendChild(like);

        const nbLikeCard= document.createElement ('span');
        nbLikeCard.textContent = `${likes}`;
        nbLikeCard.classList.add('mediascardcontent__like-nblike');
        nbLikeCard.setAttribute('tabindex', '0');
        nbLikeCard.setAttribute('aria-label', `Nombre de likes : ${likes}`);
        like.appendChild(nbLikeCard);



        const likeHeart= document.createElement ('div');
        likeHeart.classList.add('mediascardcontent__like-Heart');
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

    return { photographerId, title, image, video, likes, id, getModelCardDOM }; 
}

export default pageMediaTemplate;