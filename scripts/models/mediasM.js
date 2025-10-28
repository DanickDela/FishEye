/**
 * Représente un média (image ou vidéo)
 */
class MediaInfo {
  /**
   * Crée une instance de MediaInfo.
   * 
   * @param {object} media - Données brutes provenant du JSON.
   * @param {number} media.id - Identifiant unique du média.
   * @param {number} media.photographerId - Identifiant du photographe à partir de photographers.
   * @param {string} media.title - Titre du média.
   * @param {string} [media.image] - Nom de l'image du média (optionnelle si vidéo).
   * @param {string} [media.video] - Nom de la vidéo du média (optionnelle si image).
   * @param {number} media.likes - Nombre de likes.
   * @param {string} media.date - Date au format string
   * @param {number} media.price - Prix 
   * @param {boolean} media.liked -  ’utilisateur a t'il liké cette carte ?
   */
    constructor(media) {
        this._id = media.id;
        this._photographerId = media.photographerId;
        this._photographername= null;
        this._title = media.title;
        this._image = media.image || null; 
        this._video = media.video || null;
        this._likes = media.likes;
        this._date = media.date; 
        this._price = media.price;
        this._liked = false;
    }
    /**
     * Identifiant du média.
     * @returns {number}
     */
    get idPhoto () { 
        return this._id; 
    }

    /**
     * Identifiant du photographe
     * @returns {number}
     */
    get photographerId() { 
        return this._photographerId; 
    }

    /**
     * Définit le nom du photographe associé.
     * @param {string} name - Nom complet du photographe.
     */
    set photographername(name) {
        this._photographername = name;
    }

    /**
     * Nom du photographe
     * @returns {string}
     */
    get photographername() {
        return this._photographername; 
    }

    /**
     * Titre du média.
     * @returns {string}
     */
    get title() { 
        return this._title; 
    }

    /**
     * Nombre de likes courant.
     * @returns {number}
     */
    get likes() { 
        return this._likes; 
    }
    /**
     * Metre à jour le nombre de likes.
     * @param {number} v - Nouveau nombre de likes.
     */
    set likes(v) {
        this._likes = v; 
    }
    /**
     * Indique si l’utilisateur a déjà liké ce média.
     * @returns {boolean}
     */
    get liked() { 
        return this._liked; 
    }

    /**
     * Applique un like une seule fois (1 clic = +1) si pas déjà liké.
     * @returns {{likes: number, liked: boolean}} État après action.
     */
    likeOnce() {
    if (!this._liked) this._likes++, this._liked = true;
        return { likes: this._likes, liked: this._liked };
    }
    /**
     * Prix du média.
     * @returns {number}
     */
    get price() { 
        return this._price; 
    }
    /**
     * Vrai si le média est une image.
     * @returns {boolean}
     */
    get isImage() { 
        return Boolean(this._image); 
    }
    /**
     * Vrai si le média est une video.
     * @returns {boolean}
     */
    get isVideo() { 
        return Boolean(this._video); 
    }

    /**
     * URL relative du média (image ou vidéo), sinon chaîne vide.
     * @returns {string}
     */
    get urlMedia() {
        if (this.isImage) return `${this._image}`;
        if (this.isVideo) return `${this._video}`;
        return '';
    }

    /**
     * Retourne une date valide ou null.
     * @returns {Date|null} Date valide ou null si non valide.
     */
    get formatDate() {

        //vérifie si la date est valide
        let FormatDate = new Date(this._date);
        let DateValid = isNaN(FormatDate.getTime()) ? null : FormatDate ;

        return DateValid;
    } 
    /**
     * Date brute (string) telle que fournie par la source.
     * @returns {string}
     */
    get date () {
        return this._date; 
    }

}
