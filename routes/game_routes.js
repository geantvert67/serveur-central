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
     *              type: object
     *              properties:
     *                ip:
     *                  type: string
     *                  example: 127.0.0.1
     *                port:
     *                  type: integer
     *                  example: 8081
     *                configId:
     *                  type: integer
     *                  example: 1
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
