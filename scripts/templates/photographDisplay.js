import {displayModal} from '../utils/contactForm.js'  

/**
 * Crée un template pour l’en-tête de la page détaillée d’un photographe.
 * Retourne les métadonnées utiles + un constructeur DOM.
 *
 * @param {Photographer} data - Données du photographe.
 * @returns {{name:string, picture:string, city:string, country:string, tagline:string, price:number, getUserCardDOM: ()=>HTMLElement}}
 * Objet avec infos du photographe et une fonction pour construire le DOM de l’en-tête.
 */

export const PhotographTemplate = (data) => {
    const { name, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    /**
    * Construit l’élément DOM représentant l’en-tête de la page photographe.
    * @returns {HTMLElement} L’élément `<article>` complet (header du photographe).
    */
    const getUserCardDOM = () => {
        const photographHeader = document.createElement( 'article' );
        photographHeader.classList.add('photograph-header');
        
        const photographInfo = document.createElement( 'div' );
        photographInfo.classList.add('photograph-info')
        photographHeader.appendChild(photographInfo);

        const photograpName = document.createElement( 'h1' );
        photograpName.textContent = name;
        photograpName.classList.add('photograph-info__name');
        photograpName.setAttribute('aria-label', `nom du photographe : ${name}`);
        photographInfo.appendChild(photograpName);

    
        const cityCountry = document.createElement( 'h2' );
        cityCountry.textContent = `${city}, ${country}`;
        cityCountry.classList.add('photograph-info__location');
        cityCountry.setAttribute('aria-label', `Position du photographe : ${city}, ${country}`);
        photographInfo.appendChild(cityCountry);

        const Tagline = document.createElement( 'p' );
        Tagline.textContent = tagline;
        Tagline.classList.add('photograph-info__tagline');
        Tagline.setAttribute('aria-label', `Slogan du photographe : ${tagline}`);
        photographInfo.appendChild(Tagline);

        const contactBtn = document.createElement('button');
        contactBtn.textContent = 'Contactez-moi';
        contactBtn.classList.add('photograph-info__contactbtn');
        contactBtn.addEventListener('click', displayModal);
        photographHeader.appendChild(contactBtn);

        const image = document.createElement( 'img' );
        image.src = picture;
        image.alt = name;
        image.classList.add('photograph-info__picture')
        image.setAttribute('aria-label', `Photo du photographe : ${name}`);
        photographHeader.appendChild(image)

        // Affichage du nombre de like 
        
        const display =  document.createElement ('div')  
        display.classList.add('display')
        document.body.appendChild(display);
        
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
        PricePerDay.textContent = `${price}€ / jour`;
        PricePerDay.setAttribute('aria-label', `Tarif du photographe à la journée : ${price}€`);
        display.appendChild(PricePerDay);
        
        
        return (photographHeader);
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM }
}