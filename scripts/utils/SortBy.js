/**
 * Active le menu de tri des médias et met à jour l’affichage en fonction du tri choisi.
 * 
 * Le tri s’effectue à partir du **modèle `MediaInfo`** passé en paramètre,
 * puis le DOM est réordonné en suivant l’ordre du tableau trié.
 *
 * @param {MediaInfo[]} medias - Tableau d’instances MediaInfo
 */
export const sortBy = (medias) => {
 
    const menu = document.getElementById("sortMenu");
    const sortOptions = menu.querySelectorAll(".sort__option");
    const mediaPhotographer = document.querySelector(".media-photographer");
    const sortPopularity = menu.querySelector(".sort__popularity");
    const sortDate = menu.querySelector(".sort__date");
    const sortTitle = menu.querySelector(".sort__title");
    const mediaSort= document.querySelector('.mediasort');
    const arrowUpdown = document.querySelector('.mediasort__btn');

    // État initial : Popularité active et visible seule
    sortPopularity.classList.add('active');
    sortPopularity.style.display = "block";
    sortDate.style.display = "none";
    sortTitle.style.display = "none";
  
    /**
     * Ouvre/ferme l'affichage des choix de tri
     */
    mediaSort.addEventListener('click', () => {
        const open = !mediaSort.classList.contains('is-open');
        mediaSort.classList.toggle('is-open', open);

        if (open){
        //   ouvrir : montrer toutes les options
            sortPopularity.style.display = "block";
            sortTitle.style.display = "block";
            sortDate.style.display = "block";
        }
        else
        {
            // fermer : ne montrer que l’option active
            sortOptions.forEach((opt) => {
                opt.style.display = opt.classList.contains("active") ? "block" : "none";
            });
        }
      mediaSort.classList.toggle("is-open", open);
    });

    /**
     * Gère l’affichage visuel du bouton sélectionné
     */
    sortOptions.forEach((select) => {
        select.addEventListener("click", () => {
            const selection = select.textContent.trim().toLowerCase();

            // Réinitialiser les états avant de définir le bon
            sortOptions.forEach((opt) => opt.classList.remove("active"));
            sortTitle.style.display = "none";
            sortPopularity.style.display = "none";
            sortDate.style.display = "none";
            arrowUpdown.classList.toggle("is-open", false);

            switch (selection) {
                case "titre":
                    sortTitle.style.display = "block";
                    sortTitle.classList.add("active");
                break;

                case "date":
                    sortDate.style.display = "block";
                    sortDate.classList.add("active");
                break;

                case "popularité":
                    sortPopularity.style.display = "block";
                    sortPopularity.classList.add("active");
                break;

                default:
                    console.warn("Option de tri inconnue :", selection);
            }
        });
    });

    /**
     * Accessibilité : activation au clavier
     */
    sortOptions.forEach((option) => {
        option.addEventListener("keydown", (e) => {
            if (e.key ==="Enter" || e.keyCode === 13) {
            option.click()
            } 
        });
    });


    /**
     * TRI → à partir du modèle `medias` et non du DOM
     */
    sortOptions.forEach((op) => {
    op.addEventListener("click", () => {
        const selection = op.textContent.trim().toLowerCase();

            // copie pour ne pas modifier l'original
            let sortedMedias = Array.from(medias); 

            switch (selection) {
                case "popularité":
                    sortedMedias.sort((a, b) => b.likes - a.likes);
                break;

                case "date":
                    sortedMedias.sort((a, b) => b.formatDate - a.formatDate);
                break;

                case "titre":
                    sortedMedias.sort((a, b) =>
                    //     FR :Parce qu’en français, É / É doivent être triés comme E
                    //     Ne pas faire la différence entre : é / e / è / ê (accents ignorés)
                        a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
                    );
                break;
            }

            // On réordonne le DOM en suivant l’ordre des modèles triés
            // Construire toutes les cartes hors écran
            const tempDom = document.createDocumentFragment();
                sortedMedias.forEach((media) => {
                    const card = document.querySelector(`.mediascard[data-id="${media.idPhoto}"]`);
                    if (card) tempDom.appendChild(card);
            });

            mediaPhotographer.appendChild(tempDom);
        });
    });
}