
class MediaInfo {

  /**
   * Crée une instance de MediaInfo.
   * 
   * @param {Object} media - Données brutes provenant du JSON.
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

    get idPhoto () { 
        return this._id; 
    }

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

    get photographername() {
        return this._photographername; 
    }

    get title() { 
        return this._title; 
    }
    get likes() { 
        return this._likes; 
    }
    set likes(v) {
        this._likes = v; 
    }
    get liked() { 
        return this._liked; 
    }

      /** Bascule like/unlike en respectant la règle “1 click = +1, re-click = -1” */
    likeOnce() {
    if (!this._liked) this._likes++, this._liked = true;
        return { likes: this._likes, liked: this._liked };
    }

    get price() { 
        return this._price; 
    }

    get isImage() { 
        return Boolean(this._image); 
    }
    get isVideo() { 
        return Boolean(this._video); 
    }

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
    get date () {
          return this._date; 
    }

}
