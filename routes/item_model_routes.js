const item_model_ctrl = require('../controllers/item_model_ctrl'),
    config_ctrl = require('../controllers/config_ctrl');

/**
 * @swagger
 * tags:
 *   name: ItemModel
 */
module.exports = [
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
     *         "409":
     *           description: Modèle d'item déjà existant
     */
    {
        url: '/configs/:config_id/item-models',
        method: 'post',
        func: [config_ctrl.isConfigOwner, item_model_ctrl.create]
    },

    {
        url: '/configs/:config_id/item-models/:item_model_id',
        method: 'use',
        func: [config_ctrl.isConfigOwner, item_model_ctrl.loadById]
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models/{item_model_id}:
     *     put:
     *       summary: Modifier un modèle d'item
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
     *         - in: path
     *           name: item_model_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant du modèle d'item
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ItemModel'
     *       responses:
     *         "200":
     *           description: Modèle d'item modifié
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/ItemModel'
     *         "404":
     *           description: Modèle d'item inexistant
     *         "409":
     *           description: Modèle d'item déjà existant
     */
    {
        url: '/configs/:config_id/item-models/:item_model_id',
        method: 'put',
        func: item_model_ctrl.updateById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models/{item_model_id}:
     *     delete:
     *       summary: Supprimer un modèle d'item
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
     *         - in: path
     *           name: item_model_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant du modèle d'item
     *       responses:
     *         "200":
     *           description: Modèle d'item supprimé
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Modèle d'item supprimé
     *         "404":
     *           description: Modèle d'item inexistant
     */
    {
        url: '/configs/:config_id/item-models/:item_model_id',
        method: 'delete',
        func: item_model_ctrl.deleteById
    }
];
