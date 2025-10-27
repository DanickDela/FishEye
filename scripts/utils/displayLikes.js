/**
 * Met en place la gestion des likes pour chaque média,
 * et met à jour le total en temps réel à partir du modèle `MediaInfo`.
 *
 * @param {Array<MediaInfo>} medias - Tableau des modèles médias contenant au moins
 *                                    `idPhoto`, `likes`, `liked`, et une méthode `likeOnce()`.
 */
export const displayLike = (medias) => {

    // Element nombre de likes
    const likeTotal= document.querySelector('.display__like-total');

    const computeTotal = () => medias.reduce((acc, m) => acc + m.likes, 0);
    const setTotal = (n) => {
    likeTotal.textContent = String(n);
    likeTotal.setAttribute('aria-label', `Nombre total de likes ${n}`);
    };
     // Initialisation de l'affichage du total
     setTotal(computeTotal());

    // index par photo
    const byIdPhoto = new Map(medias.map(m => [String(m.idPhoto), m]));

    // écoute des clics sur chaque bloc like
    const likesPhoto = Array.from(document.querySelectorAll('.mediascardcontent__like'));

     // Liste des blocs de like à interagir (vue)
    likesPhoto.forEach((like) => {
        const id = like.dataset.id;    
        const model = byIdPhoto.get(String(id));          
        if (!model) return;

        const counter = like.querySelector('.mediascardcontent__like-nblike');
        const likeBtn = like.querySelector('.mediascardcontent__like-btn');
        const solid   = like.querySelector('.fa-solid.fa-heart');
        const regular = like.querySelector('.fa-regular.fa-heart');

        // état visuel initial selon model.liked (par défaut false)
        if (model.liked) {
            solid?.classList.remove('is-hidden');
            regular?.classList.add('is-hidden');
        } 
        else 
        {
            solid?.classList.add('is-hidden');
            regular?.classList.remove('is-hidden');
        }

        // bouton accessible : on utilise le bloc comme bouton 
        likeBtn.setAttribute('role', 'button');
        likeBtn.setAttribute('tabindex', '0');
        likeBtn.setAttribute('aria-pressed', String(model.liked));
        likeBtn.setAttribute('aria-label', `Aimer ${model.liked ? '(déjà aimé)' : ''}`);

         /**
         * Met à jour la vue (coeur + compteur local + compteur total)
         * selon l'état actuel du modèle.
         */
        const  applyView =() =>  {
            // met à jour l’affichage à partir du modèle
            counter.textContent = String(model.likes);
            like.setAttribute('aria-pressed', String(model.liked));
            if (model.liked) {
                solid?.classList.remove('is-hidden');
                regular?.classList.add('is-hidden');
            }
            else
            {
                solid?.classList.add('is-hidden');
                regular?.classList.remove('is-hidden');
            }
            setTotal(computeTotal());
        };
       
         /**
     * Action de like (définitif, via model.likeOnce()) puis mise à jour de la vue.
     */
        const toggle = () => {
            model.likeOnce(); // ← logique centralisée
            applyView();
        };

        // Click sur le cœur ou le bloc
        like.addEventListener('click', (e) => {
            const isHeart = e.target.closest?.('.fa-heart');
            if (!isHeart) return;
            toggle();
        });

        // Clavier (Espace/Entrée)
        like.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
              toggle();
        }
    });

    });
       
};      
    
