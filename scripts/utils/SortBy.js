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
    arrowUpdown.addEventListener('click', () => {
        const open = !menu.classList.contains('is-open');
        menu.classList.toggle('is-open', open);

        if (open){
        //   ouvrir : montrer toutes les options
            sortPopularity.style.display = "block";
            sortTitle.style.display = "block";
            sortDate.style.display = "block";
            menu.focus();
            arrowUpdown.setAttribute('aria-expanded', 'true');
        }
        else
        {
            // fermer : ne montrer que l’option active
            arrowUpdown.setAttribute('aria-expanded', 'false');
            sortOptions.forEach((opt) => {
                opt.style.display = opt.classList.contains("active") ? "block" : "none";
            });
        }
    });

    /**
     * Gère l’affichage visuel du bouton sélectionné
     */
    sortOptions.forEach((select) => {
        select.addEventListener("click", () => {
            const selection = select.textContent.trim().toLowerCase();

            // Réinitialiser les états avant de définir le bon
            sortOptions.forEach((opt) => {
                    opt.classList.remove("active");
                    opt.setAttribute('aria-checked','false');

            });

            sortTitle.style.display = "none";
            sortPopularity.style.display = "none";
            sortDate.style.display = "none";
            menu.classList.toggle("is-open", false);
            arrowUpdown.setAttribute('aria-expanded', 'false');

            switch (selection) {
                case "titre":
                    sortTitle.style.display = "block";
                    sortTitle.classList.add("active");
                    sortTitle.setAttribute('aria-checked','true');
                    sortTitle.focus();
                break;

                case "date":
                    sortDate.style.display = "block";
                    sortDate.classList.add("active");
                    sortDate.setAttribute('aria-checked','true');
                    sortDate.focus();
                break;

                case "popularité":
                    sortPopularity.style.display = "block";
                    sortPopularity.classList.add("active");
                    sortPopularity.setAttribute('aria-checked','true');
                    sortPopularity.focus();
                break;

                default:
                    console.warn("Option de tri inconnue :", selection);
            }
        });
    });

    /**
     * Enter sur le bouton ouvre/ferme le menu de tri
     */
    arrowUpdown.addEventListener("keydown", (e) => {
        if (e.key ==="Enter" || e.keyCode === 13) {
            e.preventDefault()
            arrowUpdown.click();
        }
    });


    let listOptions = Array.from(sortOptions);
    // --- clavier dans la listbox
    listOptions.forEach((opt) => {
        opt.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); }
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