export const lightBox= {

    init () {


        const modalLightbox = document.querySelector(".lightbox");
        const lightContent = document.querySelector(".light-content");
        const photolinks = Array.from(document.querySelectorAll(".mediascard__link"));
        const previousSlide=document.querySelector(".light-content-previous");
        const nextSlide=document.querySelector(".light-content-next");
        const closeBtn=document.querySelector(".lightbox__close");

        let slidesBuilt = false;

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
                        photoSlide.src = href;
                        divSlide.appendChild(photoSlide);
                    } else if (firstChild.tagName.toLowerCase() === 'video') {
                        const videoSlide = document.createElement('video');
                        videoSlide.controls = true;          // pour pouvoir lire
                        videoSlide.preload = 'metadata';   
                        videoSlide.className = 'light-content__slide__video';
                        videoSlide.src = href;
                        divSlide.appendChild(videoSlide);

                    } else {
                        console.log("Type inconnu :", firstChild);
                    }

                    const titleSlide = document.createElement('h2');
                    titleSlide.className = 'light-content__slide__title';
                    titleSlide.textContent = title;
                    divSlide.appendChild(titleSlide);

                    // ✅ insérer avant le bouton "next" si présent, sinon à la fin
                    if (nextSlide) {
                         lightContent.insertBefore(divSlide, nextSlide);
                    } else {
                         lightContent.appendChild(divSlide);
                    }
                   
                });
    
            slidesBuilt = true;
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
        console.log(slidesBuilt)
        buildSlides();            // ✅ crée toutes les slides
         console.log(slidesBuilt)
        modalLightbox.style.display = "flex";
        show(index);              // ✅ montre celle cliquée
        console.log("slide cliqué",index)
      });
    });

    // Fermer 
    closeBtn.addEventListener("click", (e) => {
      // fermer si clic sur fond (et pas sur le contenu/boutons)
        modalLightbox.style.display = "none";
        modalLightbox.setAttribute("aria-hidden", "true");
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

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("demo");
//   var captionText = document.getElementById("caption");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
//   captionText.innerHTML = dots[slideIndex-1].alt;
// }


// // Open the Modal
// function openModal() {
//   document.getElementById("myModal").style.display = "block";
// }

// // Close the Modal
// function closeModal() {
//   document.getElementById("myModal").style.display = "none";
// }

// var slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }



