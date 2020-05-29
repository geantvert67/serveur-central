const game_ctrl = require('../controllers/game_ctrl');

/**
 * @swagger
 * tags:
 *  name: Game
 */
module.exports = [
    /**
     * @swagger
     * path:
     *   /games:
     *     get:
     *       summary: Lister toutes les parties en attente de joueurs
     *       tags: [Game]
     *       responses:
     *         "200":
     *            description: Parties récupérées
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/Game'
     */
    {
        url: '/games',
        method: 'get',
        func: game_ctrl.getPending
    },

    /**
     * @swagger
     * path:
     *   /games:
     *     post:
     *       summary: Créer une partie
     *       tags: [Game]
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Game'
     *       responses:
     *         "200":
     *            description: Partie créée
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/CreatedGame'
     */
    {
        url: '/games',
        method: 'post',
        func: game_ctrl.create
    },

    {
        url: '/games/:game_id',
        method: 'use',
        func: game_ctrl.loadById
    },

    /**
     * @swagger
     * path:
     *   /games/{gameId}:
     *     put:
     *       summary: Modifier une partie à partir de son identifiant
     *       tags: [Game]
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
     *              $ref: '#/components/schemas/Game'
     *       responses:
     *         "200":
     *           description: Partie modifiée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/CreatedGame'
     *         "404":
     *           description: Partie inexistante
     */
    {
        url: '/games/:game_id',
        method: 'put',
        func: game_ctrl.updateById
    },

    /**
     * @swagger
     * path:
     *   /games/{gameId}:
     *     delete:
     *       summary: Supprimer une partie en attente de joueurs
     *       tags: [Game]
     *       responses:
     *         "200":
     *           description: Partie supprimée
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Partie supprimée
     *         "404":
     *           description: Partie inexistante
     */
    {
        url: '/games/:game_id',
        method: 'delete',
        func: game_ctrl.deleteById
    }
];
