export const lightBox = {
    init () {

        const Header=document.getElementById('header')
        const mainContainerLightBox=document.getElementById('main-wrapper')
        const modalLightbox = document.querySelector(".lightbox");
        const lightContent = document.querySelector(".light-content");
        const photolinks = Array.from(document.querySelectorAll(".mediascard__link"));
        const previousSlide=document.querySelector(".light-content-previous");
        const nextSlide=document.querySelector(".light-content-next");
        const closeBtnlightBox=document.querySelector(".lightbox__close");
        const displayLikeLight=document.querySelector(".display");
        

        // Variable pour mémoriser le focus avant ouverture
        let lastFocuslight=null;
        //Comtepeur de slide
        let iSlide=1

        const buildSlides = () => {
        
            lightContent.querySelectorAll(".light-content__slide").forEach(n => n.remove());
          

            photolinks.forEach(link => {
                const href  = link.getAttribute("href");
                const title = link.getAttribute("title");
                               

                const divSlide = document.createElement('figure');
                divSlide.className = 'light-content__slide';

                  const firstChild = link.firstElementChild;

                if (firstChild.tagName.toLowerCase() === 'img') {
                    const photoSlide = document.createElement('img');
                    photoSlide.className = 'light-content__slide__photo';
                    photoSlide.alt = title
                    photoSlide.src = href;
                    divSlide.appendChild(photoSlide);

                } else if (firstChild.tagName.toLowerCase() === 'video') {
                    const videoSlide = document.createElement('video');
                    videoSlide.controls = true;          // pour pouvoir lire
                    videoSlide.preload = 'metadata';   
                    videoSlide.className = 'light-content__slide__video';
                    videoSlide.src = href;
                    videoSlide.setAttribute("aria-describedby",`light-content_slide_title_${iSlide}`);
                    divSlide.appendChild(videoSlide);

                } else {
                    console.log("Type inconnu :", firstChild);
                }
               
                const titleSlide = document.createElement('figcaption');
                titleSlide.className = 'light-content__slide__title';
                titleSlide.id = `light-content_slide_title_${iSlide}`;
                titleSlide.textContent = title;
                divSlide.appendChild(titleSlide);

                iSlide++;

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

    const displayModalightBox = () => {
        window.lightboxOpen = true;
        lastFocuslight = document.activeElement;
        displayLikeLight.style.display="none";
        Header.inert=true;
        mainContainerLightBox.inert=true;
        modalLightbox.style.display = 'block';
        modalLightbox.inert=false;
        document.body.classList.add('no-scroll');
        closeBtnlightBox.focus();
    };
    

    const closeModallightBox = () => {
        window.lightboxOpen = false;
        mainContainerLightBox.inert=false;
        Header.inert=false;
        modalLightbox.inert=true;
        document.body.classList.remove('no-scroll');
        modalLightbox.style.display = "none";
        displayLikeLight.style.display="flex";
        lastFocuslight.focus();
    };
    

     // Ouvrir depuis une vignette
    photolinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        buildSlides();            // créer toutes les slides
        displayModalightBox();
        closeBtnlightBox.focus();
        show(index);              // montre le slide cliquée

      });
    });

    // Fermer 
    closeBtnlightBox.addEventListener("click", () => {
        closeModallightBox();
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
            nextSlide.focus();
            show((current + 1));
        break;
        case 'ArrowLeft':
            previousSlide.focus();
            show((current - 1));
        break;
        case 'Escape':
            if (!modalLightbox.inert &&  !modalOpen && mainContainerLightBox.inert)  closeModallightBox();
        break;

      default:
        break;
    }
  });

}

}




