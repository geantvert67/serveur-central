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
     *            description: Zone créée
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/Area'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs/:config_id/areas',
        method: 'post',
        func: area_ctrl.create
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/areas:
     *     delete:
     *       summary: Supprimer toutes les zones d'une configuration
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
     *           description: Zones supprimées
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Zones supprimées
     */
    {
        url: '/configs/:config_id/areas',
        method: 'delete',
        func: area_ctrl.deleteAll
    },

    {
        url: '/configs/:config_id/areas/:area_id',
        method: 'use',
        func: area_ctrl.loadById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/areas/{area_id}:
     *     put:
     *       summary: Modifier les coordonnées d'une zone
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
     *         - in: path
     *           name: area_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la zone
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                coordinates:
     *                  type: array
     *                  example: [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
     *       responses:
     *         "200":
     *           description: Zone modifiée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/Area'
     *         "404":
     *           description: Zone inexistante
     */
    {
        url: '/configs/:config_id/areas/:area_id',
        method: 'put',
        func: area_ctrl.updateById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/areas/{area_id}:
     *     delete:
     *       summary: Supprimer une zone
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
     *         - in: path
     *           name: area_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la zone
     *       responses:
     *         "200":
     *           description: Zone supprimée
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Zone supprimée
     *         "404":
     *           description: Zone inexistante
     */
    {
        url: '/configs/:config_id/areas/:area_id',
        method: 'delete',
        func: area_ctrl.deleteById
    }
];
