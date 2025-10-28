/**
 * Factory permettant de créer des instances de modèles
 * à partir de données brutes (JSON).
 *
 * @namespace ModelFactory
 */

const ModelFactory = {
  /**
   * Crée un modèle `PhotographerInfo` à partir de données brutes.
   *
   * @function
   * @name ModelFactory.DisplayPhotographer
   * @param {object} data - Objet contenant les données du photographe.
   * @returns {PhotographerInfo} Une instance de `PhotographerInfo`
   */
  DisplayPhotographer(data) {
    return new PhotographerInfo(data);
  },
  /**
   * Crée un modèle `MediaInfo` à partir de données brutes.
   *
   * @function
   * @name ModelFactory.DisplayMedia
   * @param {object} data - Objet contenant les données du média.
   * @returns {MediaInfo} Une instance de `MediaInfo`.
   */
  DisplayMedia(data) {
    return new MediaInfo(data);
  }
};
