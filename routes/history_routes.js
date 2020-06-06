const history_ctrl = require('../controllers/history_ctrl');

/**
 * @swagger
 * tags:
 *   name: History
 */
module.exports = [
    /**
     * @swagger
     * path:
     *   /games/{game_id}/history:
     *     get:
     *       summary: Lister tous les historiques d'une partie
     *       tags: [History]
     *       parameters:
     *         - in: path
     *           name: game_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la partie
     *       responses:
     *         "200":
     *            description: Historiques récupérés
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/History'
     */
    {
        url: '/games/:game_id/history',
        method: 'get',
        func: history_ctrl.getByGameId
    },

    /**
     * @swagger
     * path:
     *   /games/{game_id}/history:
     *     post:
     *       summary: Créer un historique d'une partie
     *       tags: [History]
     *       parameters:
     *         - in: path
     *           name: game_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la partie
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/serializers/History'
     *       responses:
     *         "200":
     *            description: Historique créé
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/History'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/games/:game_id/history',
        method: 'post',
        func: history_ctrl.create
    }
];
