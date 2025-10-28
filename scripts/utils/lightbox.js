export const lightBox = {

    init () {

        const mainContainer=document.getElementById('main-wrapper')
        const modalLightbox = document.querySelector(".lightbox");
        const lightContent = document.querySelector(".light-content");
        const photolinks = Array.from(document.querySelectorAll(".mediascard__link"));
        const previousSlide=document.querySelector(".light-content-previous");
        const nextSlide=document.querySelector(".light-content-next");
        const closeBtn=document.querySelector(".lightbox__close");

        // Variable pour mémoriser le focus avant ouverture
        let lastFocus=null;

        const buildSlides = () => {
        
            lightContent.querySelectorAll(".light-content__slide").forEach(n => n.remove());
          

            photolinks.forEach(link => {
                const href  = link.getAttribute("href");
                const title = link.getAttribute("title")
                            || link.querySelector("img,video")?.getAttribute("alt")
                            || "";       

                const divSlide = document.createElement('div');
                divSlide.className = 'light-content__slide';
                divSlide.setAttribute("aria-label",`${title}`);


                  const firstChild = link.firstElementChild;

                if (firstChild.tagName.toLowerCase() === 'img') {
                    const photoSlide = document.createElement('img');
                    photoSlide.className = 'light-content__slide__photo';
                    photoSlide.alt = `Photo réprésentant : ${title}`;
                    photoSlide.src = href;
                    divSlide.appendChild(photoSlide);
                } else if (firstChild.tagName.toLowerCase() === 'video') {
                    const videoSlide = document.createElement('video');
                    videoSlide.controls = true;          // pour pouvoir lire
                    videoSlide.preload = 'metadata';   
                    videoSlide.className = 'light-content__slide__video';
                    videoSlide.alt = `Vidéo représentant : ${title}`;
                    videoSlide.src = href;
                    divSlide.appendChild(videoSlide);

                } else {
                    console.log("Type inconnu :", firstChild);
                }

                const titleSlide = document.createElement('h2');
                titleSlide.className = 'light-content__slide__title';
                titleSlide.textContent = title;
                divSlide.appendChild(titleSlide);

                // insérer avant le bouton "next" si présent, sinon à la fin
                if (nextSlide) {
                      lightContent.insertBefore(divSlide, nextSlide);
                } else {
                      lightContent.appendChild(divSlide);
                }
                
            });
        };

    
    // Affiche seulement l'index demandé
    let current = 0;
    const show = (i) => {
        const slides = lightContent.querySelectorAll(".light-content__slide");
        const max = slides.length;
        const idx = ((i % max) + max) % max;
        slides.forEach((s, j) => s.style.display = (idx === j ? "block" : "none"));
      current = i;
    };

    const displayModal = () => {
        mainContainer.inert=true;
        modalLightbox.style.display = 'block';
        modalLightbox.inert=false;
        document.body.classList.add('no-scroll');
        closeBtn.focus();
    };
    

    const closeModal = () => {
        lastFocus.focus();
        mainContainer.inert=false;
        modalLightbox.inert=true;
        document.body.classList.remove('no-scroll');
        modalLightbox.style.display = "none";;
    };
    

     // Ouvrir depuis une vignette
    photolinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        lastFocus=e.currentTarget;
        buildSlides();            // créer toutes les slides
        displayModal();
        closeBtn.focus();
        show(index);              // montre le slide cliquée

      });
    });

    // Fermer 
    closeBtn.addEventListener("click", () => {
        closeModal();
    });


    // Navigation (si tu as .prev / .next dans le HTML)
    previousSlide.addEventListener("click", () => {
        show(current - 1);
    });

    nextSlide.addEventListener("click", () => {
        show((current + 1));
    });

    document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            show((current + 1));
        break;
        case 'ArrowLeft':
            show((current - 1));
        break;
        case 'Escape':
            if (!modalLightbox.inert) closeModal();
        break;

      default:
        break;
    }
  });

}

}




