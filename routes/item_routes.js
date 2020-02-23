const item_ctrl = require('../controllers/item_ctrl');

/**
 * @swagger
 * tags:
 *   name: Item
 */
module.exports = [
    /**
     * @swagger
     * path:
     *   /configs/{config_id}/items:
     *     delete:
     *       summary: Supprimer tous les items d'une configuration
     *       tags: [Item]
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
     *           description: Items supprimés
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Items supprimés
     */
    {
        url: '/configs/:config_id/items',
        method: 'delete',
        func: item_ctrl.deleteAll
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models/{item_model_id}/items:
     *     get:
     *       summary: Lister tous les items d'un modèle
     *       tags: [Item]
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
     *            description: Items récupérés
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/Item'
     */
    {
        url: '/configs/:config_id/item-models/:item_model_id/items',
        method: 'get',
        func: item_ctrl.getAll
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models/{item_model_id}/items:
     *     post:
     *       summary: Créer un item
     *       tags: [Item]
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
     *              type: object
     *              properties:
     *                quantity:
     *                  type: integer
     *                  example: 5
     *                coordinates:
     *                  type: array
     *                  items:
     *                    type: number
     *                    format: decimal
     *                  example: [39.807222,-76.984722]
     *       responses:
     *         "200":
     *            description: Item créé
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/Item'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs/:config_id/item-models/:item_model_id/items',
        method: 'post',
        func: item_ctrl.create
    },

    {
        url: '/configs/:config_id/item-models/:item_model_id/items/:item_id',
        method: 'use',
        func: item_ctrl.loadById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models/{item_model_id}/items/{item_id}:
     *     put:
     *       summary: Modifier un item
     *       tags: [Item]
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
     *         - in: path
     *           name: item_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'item
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                quantity:
     *                  type: integer
     *                  example: 5
     *                coordinates:
     *                  type: array
     *                  items:
     *                    type: number
     *                    format: decimal
     *                  example: [39.807222,-76.984722]
     *       responses:
     *         "200":
     *           description: Item modifié
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/Item'
     *         "404":
     *           description: Item inexistant
     */
    {
        url: '/configs/:config_id/item-models/:item_model_id/items/:item_id',
        method: 'put',
        func: item_ctrl.updateById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/item-models/{item_model_id}/items/{item_id}:
     *     delete:
     *       summary: Supprimer un item
     *       tags: [Item]
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
     *         - in: path
     *           name: item_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'item
     *       responses:
     *         "200":
     *           description: Item supprimé
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Item supprimé
     *         "404":
     *           description: Item inexistant
     */
    {
        url: '/configs/:config_id/item-models/:item_model_id/items/:item_id',
        method: 'delete',
        func: item_ctrl.deleteById
    }
]