const area_ctrl = require('../controllers/area_ctrl'),
    config_ctrl = require('../controllers/config_ctrl');

/**
 * @swagger
 * tags:
 *   name: Area
 */
module.exports = [
    {
        url: '/configs/:config_id/areas',
        method: 'use',
        func: config_ctrl.isConfigOwner
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/areas:
     *     get:
     *       summary: Lister toutes les zones d'une configuration
     *       tags: [Area]
     *       security:
     *         - JWTAuth : []
     *       parameters:
     *         - in: path
     *           name: config_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la configuration
     *       responses:
     *         "200":
     *            description: Zones récupérées
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/Area'
     */
    {
        url: '/configs/:config_id/areas',
        method: 'get',
        func: area_ctrl.getAll
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/areas:
     *     post:
     *       summary: Créer une zone
     *       tags: [Area]
     *       security:
     *         - JWTAuth : []
     *       parameters:
     *         - in: path
     *           name: config_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la configuration
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                coordinates:
     *                  type: array
     *                  example: [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
     *                forbidden:
     *                  type: boolean
     *                  example: false
     *       responses:
     *         "200":
     *            description: Zones créée
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/Area'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs/:config_id/areas',
        method: 'post',
        func: area_ctrl.create
    }
];
