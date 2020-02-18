const item_model_ctrl = require('../controllers/item_model_ctrl'),
    config_ctrl = require('../controllers/config_ctrl');

/**
 * @swagger
 * tags:
 *   name: ItemModel
 */
module.exports = [
    {
        url: '/configs/:config_id/item-models',
        method: 'use',
        func: config_ctrl.isConfigOwner
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models:
     *     get:
     *       summary: Lister tous les modèles d'item d'une configuration
     *       tags: [ItemModel]
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
     *            description: Modèles d'item récupérés
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/ItemModel'
     */
    {
        url: '/configs/:config_id/item-models',
        method: 'get',
        func: item_model_ctrl.getAll
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models:
     *     post:
     *       summary: Créer un modèle d'item
     *       tags: [ItemModel]
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
     *              $ref: '#/components/schemas/ItemModel'
     *       responses:
     *         "200":
     *            description: Modèle d'item créé
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/ItemModel'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs/:config_id/item-models',
        method: 'post',
        func: item_model_ctrl.create
    }
]