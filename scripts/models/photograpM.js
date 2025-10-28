/**
 * Représente un photographe et ses informations principales.
 */
class PhotographerInfo {
    /**
     * Crée une instance de PhotographerInfo.
     *
     * @param {object} photographers - Objet contenant les informations du photographe.
     * @param {string} photographers.name - Nom complet du photographe.
     * @param {number} photographers.id - Identifiant unique du photographe.
     * @param {string} photographers.city - Ville d'origine du photographe.
     * @param {string} photographers.country - Pays d'origine du photographe.
     * @param {string} photographers.tagline - Slogan du photographe.
     * @param {number} photographers.price - Tarif journalier du photographe.
     * @param {string} photographers.portrait - Nom de fichier du portrait
     */
    constructor(photographers){
        this._name = photographers.name;
        this._id = photographers.id;
        this._city = photographers.city;
        this._country = photographers.country;
        this._tagline = photographers.tagline;
        this._price = photographers.price;
        this._portrait = photographers.portrait;
    }
    /**
     * Nom complet du photographe.
     * @returns {string}
     */
    get name () {
        return this._name
    }
    /**
     * Identifiant unique du photographe.
     * @returns {number}
     */
    get id () {
        return this._id
    }
    /**
     * Ville du photographe.
     * @returns {string}
     */
    get city () {
        return this._city
    }
    /**
     * paysdu photographe.
     * @returns {string}
     */
    get country () {
        return this._country
    }
    /**
     * Tarif journalier du photographe.
     * @returns {number}
     */
    get price () {
        return this._price
    }
    /**
     * Slogan du photographe.
     * @returns {string}
     */
    get tagline () {
        return this._tagline
    }
    /**
     * Retourne l’URL complète de l’image portrait du photographe.
     * @returns {string}
     */
    get portrait () {
        return `assets/photographers/${this._portrait}`
    }
}
