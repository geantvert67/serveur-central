const config_ctrl = require('../controllers/config_ctrl'),
    clone_ctrl = require('../controllers/clone_ctrl');

/**
 * @swagger
 * tags:
 *   name: Config
 */
module.exports = [
    /**
     * @swagger
     * path:
     *   /configs:
     *     get:
     *       summary: Lister toutes les configurations publiques
     *       tags: [Config]
     *       security:
     *         - JWTAuth : []
     *       responses:
     *         "200":
     *           description: Configurations récupérées
     *           content:
     *             application/json:
     *               schema:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/serializers/BasicConfig'
     */
    {
        url: '/configs',
        method: 'get',
        func: config_ctrl.getAll
    },

    /**
     * @swagger
     * path:
     *   /configs:
     *     post:
     *       summary: Créer une configuration
     *       tags: [Config]
     *       security:
     *         - JWTAuth : []
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Config'
     *       responses:
     *         "200":
     *           description: Configuration créée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/CreatedConfig'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs',
        method: 'post',
        func: config_ctrl.create
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}:
     *     get:
     *       summary: Récupérer une configuration à partir de son identifiant
     *       tags: [Config]
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
     *           description: Configuration récupérée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/DetailedConfig'
     *         "404":
     *           description: Configuration inexistante
     */
    {
        url: '/configs/:config_id',
        method: 'get',
        func: [config_ctrl.configIsPublicOrIsConfigOwner, config_ctrl.getById]
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}:
     *     put:
     *       summary: Modifier une configuration à partir de son identifiant
     *       tags: [Config]
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
     *              $ref: '#/components/schemas/Config'
     *       responses:
     *         "200":
     *           description: Configuration modifiée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/DetailedConfig'
     *         "404":
     *           description: Configuration inexistante
     */
    {
        url: '/configs/:config_id',
        method: 'put',
        func: [config_ctrl.isConfigOwner, config_ctrl.updateById]
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}:
     *     delete:
     *       summary: Supprimer une configuration à partir de son identifiant
     *       tags: [Config]
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
     *           description: Configuration supprimée
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Configuration supprimée
     *         "404":
     *           description: Configuration inexistante
     */
    {
        url: '/configs/:config_id',
        method: 'delete',
        func: [config_ctrl.isConfigOwner, config_ctrl.deleteById]
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/clone:
     *     post:
     *       summary: Cloner une configuration à partir de son identifiant
     *       tags: [Config]
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
     *           description: Configuration clonée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/DetailedConfig'
     *         "404":
     *           description: Configuration inexistante
     */
    {
        url: '/configs/:config_id/clone',
        method: 'post',
        func: [
            config_ctrl.configIsPublicOrIsConfigOwner,
            clone_ctrl.cloneConfigById
        ]
    },

    /**
     * @swagger
     * path:
     *   /user/configs:
     *     get:
     *       summary: Lister toutes les colocations de l'utilisateur connecté
     *       tags: [Config]
     *       security:
     *         - JWTAuth : []
     *       responses:
     *         "200":
     *           description: Configurations récupérées
     *           content:
     *             application/json:
     *               schema:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/serializers/BasicConfig'
     */
    {
        url: '/user/configs',
        method: 'get',
        func: config_ctrl.getByOwner
    }
];
