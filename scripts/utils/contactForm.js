
// ============================================================
// Gestion de la fenêtre modale de contact
// ============================================================
const Header=document.getElementById('header');
const mainContainer =  document.getElementById("main-wrapper");
const modal = document.getElementById("contact_modal");
const form = document.querySelector(".contactdata");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const Email = document.getElementById("email");
const message = document.getElementById("message");
const closecontactBtn = document.querySelector(".modalheader__close");
const contactBtn = document.querySelector(".contact_button");

let lastFocus=null;

/**
 * Supprime tous les messages d’erreur affichés dans le formulaire de contact.
 *
 * Réinitialise sur chaque .formData :
 * - l’attribut `data-error` (message d’erreur)
 * - l’attribut `data-error-visible` à "false" (masque l’affichage de l’erreur)
 *
 * @returns {void}
 */
function clearAllErrors() {
    form.querySelectorAll('.formData').forEach((err) => {
        err.removeAttribute('data-error');
        err.setAttribute('data-error-visible', 'false');
     });
}


/**
 * Cette fonction affiche les erreurs de saisie
 * @param {string} inputId : Id du champ input
 * @param {string} message : messessage d'erreur à afficher
 * @returns {void}
 */
function displayError(inputId, message) {

    const input = document.getElementById(inputId);

    let divInput = input.closest(".formData");
    divInput.setAttribute("data-error", message);          // Définit le texte d'erreur
    divInput.setAttribute("data-error-visible", "true");   // Rend visible l'erreur

}

/**
 * Cette fonction supprime l'affiche des erreurs lors de la saisie
 *  @param {boolean} inputId : true un balide, false balise textarea 
 *  @returns {void}
 */
function hideError(inputId) {

    const input = document.getElementById(inputId);
    const divInput = input.closest(".formData");

    divInput.removeAttribute("data-error");                // Supprime le message
    divInput.setAttribute("data-error-visible", "false");  // Cache l'erreur
}


/**
 * Valide un prénom/nom : au moins 2 caractères non vides.
 * @param {HTMLInputElement} balise - Champ à valider.
 * @returns {boolean} true si valide, sinon false.
 */
function firstlastNameValidate (balise) {

   if ((balise.value.trim() === "") || (balise.value.trim().length < 2)) { 
        displayError(balise.id, "Veuillez entrer 2 caractères ou plus pour le champ");
        return false;
    }
    else
    {
        hideError(balise.id);
        return true;
    }
}

/**
 * Valide un prénom/nom : au moins 2 caractères non vides.
 * @param {HTMLInputElement} balise - Champ à valider.
 * @returns {boolean} true si valide, sinon false.
 */
function EmailValidate(balise) {

    let emailRegExp= new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z]+");

    if (emailRegExp.test(balise.value)) {
         hideError(balise.id)
         return true; 
    } else {
        displayError(balise.id, "L'adresse email n'est pas valide" );
        return false;
    }
}

/**
 * Valide le message : 1 à 255 caractères non vides.
 * @param {HTMLTextAreaElement} balise - Zone de texte à valider.
 * @returns {boolean} true si valide, sinon false.
 */
const messageValidate = (balise) =>{

   if ((balise.value.trim() === "") || (balise.value.trim().length >255)) { 
        displayError(balise.id, "Veuillez entrer 255 caractères au maximum");
        return false;
    }
    else
    {
        hideError(balise.id);
        return true;
    }
}

/**
 * Affiche la fenêtre modale du formulaire de contact.
 * Met automatiquement le focus sur le premier champ (prénom).
 */
export const displayModal = () => {

     // mémorise l’élément qui avait le focus au moment de l’ouverture
    lastFocus = document.activeElement;
    window.modalOpen = true;

    // Nettoyer les erreurs précédentes
    clearAllErrors()
    Header.inert=true;
    mainContainer.inert=true;
    modal.style.display = 'block';
    modal.inert=false;
    document.body.classList.add('no-scroll');
    closecontactBtn.focus();
};

/**
 * Ferme la fenêtre modale de contact.
 */
const closeModal = () => {
    window.modalOpen = false;
    form.reset(); //vide le formulaire
    modal.style.display = "none";
    Header.inert=false;
    mainContainer.inert=false;
    modal.inert=true;
    document.body.classList.remove('no-scroll');
    lastFocus.focus();
};

// ============================================================
// Écouteurs d'événements et validation en temps réel
// ============================================================

if (firstName) {
    firstName.addEventListener("blur", () => {
        firstlastNameValidate(firstName);
    });
}

//Validation du nom
if (lastName) {
lastName.addEventListener("blur", ()=>{
    firstlastNameValidate (lastName);
});
}

if (Email) {
//Vérifier la validité de l'adresse email
Email.addEventListener("blur", ()=>{
    EmailValidate(Email);
})
}

if (message) {
//Vérifier la validité du message
message.addEventListener("blur", ()=>{
    const textarea = document.getElementById("message");
    textarea.setSelectionRange(0, 0);       
    messageValidate(message);
})
}

if (closecontactBtn) {
// Fermeture de la fenêtre modale contenant le formulaire ou les remerciements
closecontactBtn.addEventListener("click", () => { 
    closeModal();
});
}

/**
 * Validation complète du formulaire avant envoi.
 * Empêche l’envoi si des champs sont invalides, sinon affiche les données dans la console.
 */

form.addEventListener("submit", (event) => {
    // on empêche le comportement par défaut
    event.preventDefault();

    let FormValid = false;

    // Validation de tous les champs
    let okFirst = firstlastNameValidate(firstName);
    let okLast  = firstlastNameValidate(lastName);
    let okMail  = EmailValidate(Email);
    let okMessage = messageValidate(message)

    FormValid = okFirst && okLast && okMail && okMessage

    

    if (FormValid) {
        console.log('Donnéee du formulaire de contact ')
        console.log('Prénom :', firstName.value )
        console.log('Nom :', lastName.value )
        console.log('Email :', Email.value)
        console.log('Message :' , message.value )
  
        closeModal();
 
    }
    else {
      contactBtn.style.backgroundColor = "#901C1C";
    }
});


// Close modal when espace key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.inert && !window.lightboxOpen && mainContainer.inert) {
        closeModal();
  }
});

