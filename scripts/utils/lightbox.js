export const lightBox= {

    init () {


        const modalLightbox = document.querySelector(".lightbox");
        const lightContent = document.querySelector(".light-content");
        const photolinks = Array.from(document.querySelectorAll(".mediascard__link"));
        const previousSlide=document.querySelector(".light-content-previous");
        const nextSlide=document.querySelector(".light-content-next");
        const closeBtn=document.querySelector(".lightbox__close");

        const buildSlides = () => {
        
            lightContent.querySelectorAll(".light-content__slide").forEach(n => n.remove());
            

            photolinks.forEach(link => {
                const href  = link.getAttribute("href");
                const title = link.getAttribute("title")
                            || link.querySelector("img,video")?.getAttribute("alt")
                            || "";

        
                const divSlide = document.createElement('div');
                divSlide.className = 'light-content__slide';

                  const firstChild = link.firstElementChild;

                if (firstChild.tagName.toLowerCase() === 'img') {
                    const photoSlide = document.createElement('img');
                    photoSlide.className = 'light-content__slide__photo';
                    photoSlide.alt = `Photo réprésentant : ${title}`;
                    photoSlide.setAttribute('aria-label', `Agrandissement de la photo : ${title}`);
                    photoSlide.src = href;
                    divSlide.appendChild(photoSlide);
                } else if (firstChild.tagName.toLowerCase() === 'video') {
                    const videoSlide = document.createElement('video');
                    videoSlide.controls = true;          // pour pouvoir lire
                    videoSlide.preload = 'metadata';   
                    videoSlide.className = 'light-content__slide__video';
                    videoSlide.alt = `Vidéo représentant : ${title}`;
                    videoSlide.setAttribute('aria-label', `Agrandissement de la vidéo : ${title}`);
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

     // Ouvrir depuis une vignette
    photolinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        buildSlides();            // créer toutes les slides
        modalLightbox.style.display = "flex";
        previousSlide.focus()
        show(index);              // montre le slide cliquée

      });
    });

    // Fermer 
    closeBtn.addEventListener("click", (e) => {
        modalLightbox.style.display = "none";
        modalLightbox.setAttribute('aria-labbel', 'fermer');
    });


    // Navigation (si tu as .prev / .next dans le HTML)
    previousSlide.addEventListener("click", (e) => {
      e.preventDefault();
      show(current - 1);
    });

    nextSlide.addEventListener("click", (e) => {
      e.preventDefault();
      show((current + 1));
    });

}

}


