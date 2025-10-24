
export const sortBy = () => {
 
  const menu = document.getElementById("sortMenu");
  const sortOptions = menu.querySelectorAll(".sort__option");
  const mediascard = document.querySelectorAll(".mediascard");
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
 

  mediaSort.addEventListener('click', () => {
      const open = !mediaSort.classList.contains('is-open');
      mediaSort.classList.toggle('is-open', open);

      if (open){
         // ouvrir : montrer toutes les options
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

  // Sélection d'une option
  sortOptions.forEach((select) => {
    select.addEventListener("click", () => {
        const selection = select.textContent.trim().toLowerCase();

        /// Réinitialiser les états avant de définir le bon
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

 
// Prise en compte du clavier
  sortOptions.forEach((option) => {
    option.addEventListener("keydown", (e) => {
      if (e.key ==="Enter" || e.keyCode === 13) {
        option.click()
      } 
    });
  });

  

// gestion du tri
  sortOptions.forEach((op) => {
    op.addEventListener("click", () => {
      const selection= op.textContent.toLowerCase();

     const resultSort = Array.from(mediascard).sort((a, b) => {
        switch (selection) {

          case "popularité": {
            // tri décroissant
            const popA = parseInt(
              a.querySelector(".mediascardcontent__like-nblike").textContent
            );
            const popB = parseInt(
              b.querySelector(".mediascardcontent__like-nblike").textContent
            );
            return popB - popA;
          }

          case "date": {
            // tri décroissant
            const dateA = a.getAttribute("date");
            const dateB = b.getAttribute("date");
            return new Date(dateB) - new Date(dateA);
          }

          case "titre": {
            // tri décroissant
            const titleA = a
              .querySelector(".mediascardcontent__description")
              .textContent.toLowerCase();
            const titleB = b
              .querySelector(".mediascardcontent__description")
              .textContent.toLowerCase();
            return titleA.localeCompare(titleB); // tri alphabétique
          }
          default:
             return 0;
        } 
      
     });

      // Remplacez le contenu existant par le contenu trié
      mediascard.forEach((element) => element.remove());
      resultSort.forEach((element) => mediaPhotographer.appendChild(element));
    });
  });
};