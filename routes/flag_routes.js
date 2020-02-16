const flag_ctrl = require('../controllers/flag_ctrl'),
    config_ctrl = require('../controllers/config_ctrl');

/**
 * @swagger
 * tags:
 *  name: Flag
 */
module.exports = [
    {
        url: '/configs/:config_id/flags',
        method: 'use',
        func: config_ctrl.isConfigOwner
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/flags:
     *     get:
     *       summary: Lister tous les drapeaux d'une configuration
     *       tags: [Flag]
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
     *            description: Drapeaux récupérés
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/Flag'
     */
    {
        url: '/configs/:config_id/flags',
        method: 'get',
        func: flag_ctrl.getAll
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/flags:
     *     post:
     *       summary: Créer un drapeau
     *       tags: [Flag]
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
     *              $ref: '#/components/schemas/Flag'
     *       responses:
     *         "200":
     *            description: Drapeau créé
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/Flag'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs/:config_id/flags',
        method: 'post',
        func: flag_ctrl.create
    },

    {
        url: '/configs/:config_id/flags/:flag_id',
        method: 'use',
        func: flag_ctrl.loadById
    },
    /**
     * @swagger
     * path:
     *   /configs/{config_id}/flags/{flag_id}:
     *     put:
     *       summary: Modifier un drapeau
     *       tags: [Flag]
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
     *           name: flag_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant du drapeau
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                captureDuration:
     *                  type: integer
     *                  example: 60
     *       responses:
     *         "200":
     *           description: Drapeau modifié
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/Flag'
     *         "404":
     *           description: Drapeau inexistant
     */
    {
        url: '/configs/:config_id/flags/:flag_id',
        method: 'put',
        func: flag_ctrl.updateById
    }
];
