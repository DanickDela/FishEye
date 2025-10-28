import {displayModal} from '../utils/contactForm.js'  


/**
 * Construit l'en-tête (header) d'un photographe : infos, bouton contact,
 * photo de profil et encart likes/prix.
 *
 * @function DefinePhotographerHeader
 * @param {object} photographer - Données prêtes à l’affichage du photographe.
 * @param {string} photographer.name - Nom du photographe.
 * @param {string} photographer.city - Ville du photographe.
 * @param {string} photographer.country - Pays du photographe.
 * @param {string} photographer.tagline - Slogan du photographe.
 * @param {number} photographer.price - Tarif journalier.
 * @param {string} photographer.portrait - URL du portrait (chemin relatif).
 * @returns {HTMLElement} Élément `<article>` complet à insérer dans le DOM.
 *
 */
export function DefinePhotographerHeader (photographer) {

    const photographHeader = document.createElement( 'article' );
    photographHeader.classList.add('photograph-header');
    
    const photographInfo = document.createElement( 'div' );
    photographInfo.classList.add('photograph-info')
    photographHeader.appendChild(photographInfo);

    //nom
    const photograpName = document.createElement( 'h1' );
    photograpName.textContent = photographer.name;
    photograpName.classList.add('photograph-info__name');
    photograpName.setAttribute('aria-label', `Nom du photographe : ${photographer.name}`);
    photographInfo.appendChild(photograpName);


    const cityCountry = document.createElement( 'h2' );
    cityCountry.textContent = `${photographer.city}, ${photographer.country}`;
    cityCountry.classList.add('photograph-info__location');
    cityCountry.setAttribute('aria-label', `Localisation du photographe : ${photographer.city}, ${photographer.country}`);
    photographInfo.appendChild(cityCountry);

    const Tagline = document.createElement( 'p' );
    Tagline.textContent = photographer.tagline;
    Tagline.classList.add('photograph-info__tagline');
    Tagline.setAttribute('aria-label', `Slogan du photographe :`);
    photographInfo.appendChild(Tagline);

    const contactBtn = document.createElement('button');
    contactBtn.textContent = 'Contactez-moi';
    contactBtn.classList.add('photograph-info__contactbtn');
    contactBtn.type="button";
    contactBtn.addEventListener('click', displayModal);
    photographHeader.appendChild(contactBtn);

    const image = document.createElement( 'img' );
    image.src = photographer.portrait;
    image.alt = photographer.name;
    image.classList.add('photograph-info__picture')

    photographHeader.appendChild(image)

    // Affichage du nombre de like 
    
    const display =  document.createElement ('div')  
    display.classList.add('display')
    photographHeader.appendChild(display);
    
    const displayLike= document.createElement ('div');
    displayLike.classList.add('display__like');
    display.appendChild (displayLike)


    const displayTotal= document.createElement ('p');
    displayTotal.classList.add('display__like-total');
    displayLike.appendChild (displayTotal);

    const iconLike= document.createElement('i');
    iconLike.classList.add('fa-solid', 'fa-heart','display__like-icon');
    displayLike.appendChild(iconLike);
        
    const  PricePerDay= document.createElement( 'p' );
    PricePerDay.classList.add("display__priceday");
    PricePerDay.textContent = `${photographer.price}€ / jour`;
    //PricePerDay.setAttribute('aria-label', `Tarif du photographe à la journée : ${photographer.price}€`);
    display.appendChild(PricePerDay);

return photographHeader;
}