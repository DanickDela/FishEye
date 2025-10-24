export const displayLike= () => {

    // Element nombre de likes
    const likeTotal= document.querySelector('.display__like-total');

    // Tous les compteurs de like dans les cartes
    const slidesLike= Array.from(document.querySelectorAll('.mediascardcontent__like-nblike'));
    let sum= 0;


    slidesLike.forEach((slide) => {
        sum+= parseInt(slide.textContent,10);
    });

    likeTotal.textContent = String(sum)
    likeTotal.setAttribute('aria-label',`${sum} de like `);

    const updateTotal = (update) => {
        const n = parseInt(likeTotal.textContent || '0', 10) + update;
        likeTotal.textContent = String(n);
        likeTotal.setAttribute('aria-label', `Nombre total de likes ${n}`);
    };

    // écoute des clics sur chaque bloc like
    const likesPhoto = Array.from(document.querySelectorAll('.mediascardcontent__like'));

    likesPhoto.forEach((likep)=> {
        const counter = likep.querySelector('.mediascardcontent__like-nblike');
        const solidHeart = likep.querySelector('.fa-solid.fa-heart')
        const regularHeart = likep.querySelector('.fa-regular.fa-heart')
  
        // état initial : on affiche le regular, on cache le solid
        solidHeart?.classList.add('is-hidden');

        const toggleLike = () => {
            const current = parseInt(counter.textContent || '0', 10);
            const liked = !solidHeart?.classList.contains('is-hidden');

            // toggle affichage icônes
            solidHeart?.classList.toggle('is-hidden');
            regularHeart?.classList.toggle('is-hidden');

            // maj compteur carte + total
             if (liked) {
                counter.textContent = String(current - 1);
                updateTotal(-1);
            } else {
                counter.textContent = String(current + 1);
                updateTotal(1);
            }
        };
        //on écoute le clic sur tout le bloc like (ou cible l’icône si tu préfères)
        likep.addEventListener('click', e => {
            if (!e.target.closest('.fa-heart')) return;
                console.log("clicksolid")
                toggleLike();

         }); 
    });     
}
       
        
    
