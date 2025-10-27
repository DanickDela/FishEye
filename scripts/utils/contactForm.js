
// ============================================================
// Gestion de la fenêtre modale de contact
// ============================================================
const mainContainer =  document.getElementById("main-wrapper");
const modal = document.getElementById("contact_modal");
const form = document.querySelector(".contactdata");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const Email = document.getElementById("email");
const message = document.getElementById("message");
const closeBtn = document.querySelector(".modalheader__close");
const contactBtn = document.querySelector(".contact_button");

/*************************************************************
 * Cette fonction affiche les erreurs de saisie
 * @param {string} inputId : Id du champ input
 * @param {string} message : messessage d'erreur à afficher
 */
function displayError(inputId, message) {

    const input = document.getElementById(inputId);

    let divInput = input.closest(".formData");
    divInput.setAttribute("data-error", message);          // Définit le texte d'erreur
    divInput.setAttribute("data-error-visible", "true");   // Rend visible l'erreur

}

/*************************************************************
 * Cette fonction supprime l'affiche des erreurs lors de la saisie
 *  @param {boolean} notInput : true un balide, false balise textarea 
 */
function hideError(inputId) {

    const input = document.getElementById(inputId);
    const divInput = input.closest(".formData");

    divInput.removeAttribute("data-error");                // Supprime le message
    divInput.setAttribute("data-error-visible", "false");  // Cache l'erreur
}


/*************************************************************
* Cette fonction valide le nom ou le prénom
* @param {objet} balise : objet DOM
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

/*************************************************************
 * Cette fonction vérifie la validité de l'émail
 *  @param {objet} balise : objet DOM
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

/*************************************************************
 * Cette fonction vérifie la logueur max de caractères
 *  @param {objet} balise : objet DOM
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

/*
 * Affiche la fenêtre modale du formulaire de contact.
 * Met automatiquement le focus sur le premier champ (prénom).
 */
export const displayModal = () => {
    mainContainer.inert=true;
    modal.style.display = 'block';
    modal.inert=false;
    document.body.classList.add('no-scroll');
    closeBtn.focus();
};

/**
 * Ferme la fenêtre modale de contact.
 */
export const closeModal = () => {

    contactBtn.focus();
    mainContainer.inert=false;
    modal.inert=true;
    document.body.classList.remove('no-scroll');
    modal.style.display = "none";;
    form.reset(); //vide le formulaire
};

// ============================================================
// Écouteurs d'événements et validation en temps réel
// ============================================================


//Validation du prénom
// firstName.addEventListener("blur", ()=>{
//     firstlastNameValidate (firstName);
// })

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

if (closeBtn) {
// Fermeture de la fenêtre modale contenant le formulaire ou les remerciements
closeBtn.addEventListener("click", () => { 
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
    if (e.key === 'Escape' && !modal.inert) {
        closeModal();
  }
});

