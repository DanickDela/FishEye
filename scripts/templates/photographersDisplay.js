
/**
 * *
 * @param {Photographer} data - Données du photographe.
 * @returns {{name:string, picture:string, city:string, country:string, tagline:string, price:number, getUserCardDOM: ()=>HTMLElement}}
 * Objet avec infos du photographe et la méthoe  getUserCardD pour construire le template pour  insérer dans le dom
 * 
 * @description
 * La fonction prépare les données et utilise la méthoede `getUserCardDOM` qui,
 * une fois appelé, génère un `<article>` complet représentant un photographe.
 */
export const photographersTemplate = (data) => {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    /**
     **
     * @returns {HTMLElement} L’élément `<article>` complet prêt à être inséré dans le DOM.
     *
     * @description
     *   * Construit et retourne l’élément DOM représentant la liste des photographes
     */
    const getUserCardDOM = () => {
        
        const article = document.createElement( 'article' );
        article.classList.add('photographer-card');

        // Intégration de la partie cliquable
        const linkPhotographer = document.createElement( 'a' );
        linkPhotographer.href = `photographer.html?id=${id}`
        linkPhotographer.classList.add("photographer-card-link");
        article.appendChild(linkPhotographer);


        const img = document.createElement( 'img' );
        img.classList.add("photographer-card__image");
        img.src=picture;
        img.alt ='Photo de ' + name;

        linkPhotographer.appendChild(img);

        const h2 = document.createElement( 'h2' );
        h2.classList.add("photographer-card__name");
        h2.textContent = name;
        //h2.setAttribute('aria-label', `Nom du photographe : ${name}`);
        linkPhotographer.appendChild(h2);
      

        // Création d'une balise div pour insérer les information sur le photographe
        const PhotographerInfo = document.createElement( 'div' );
        PhotographerInfo.classList.add("photographer-card__info");
        article.appendChild(PhotographerInfo);


        const cityCountry= document.createElement( 'h3' );
        cityCountry.classList.add("photographer-card__location");
        cityCountry.textContent = `${city}, ${country}`;
        cityCountry.setAttribute('aria-label', `Localisation du photographe : ${city}, ${country}`);
        PhotographerInfo.appendChild(cityCountry);
       
        const TagLine= document.createElement( 'p' );
        TagLine.classList.add("photographer-card__tagline");
        TagLine.textContent = tagline;
        TagLine.setAttribute('aria-label', `Slogan du photographe `);
        PhotographerInfo.appendChild(TagLine);

        const  PricePerDay= document.createElement( 'p' );
        PricePerDay.classList.add("photographer-card__price");
        PricePerDay.textContent = `${price}€/jour`;
        PricePerDay.setAttribute('aria-label', `Tarif du photographe `);
        PhotographerInfo.appendChild(PricePerDay);


        return (article);
    }
    return {name, picture, city, country, tagline, price, getUserCardDOM }

}