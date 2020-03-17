const team_ctrl = require('../controllers/team_ctrl'),
    config_ctrl = require('../controllers/config_ctrl');

/**
 * @swagger
 * tags:
 *   name: Team
 */
module.exports = [
    {
        url: '/configs/:config_id/teams',
        method: 'use',
        func: config_ctrl.isConfigOwner
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/teams:
     *     get:
     *       summary: Lister toutes les équipes d'une configuration
     *       tags: [Team]
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
     *            description: Équipes récupérées
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/CreatedTeam'
     */
    {
        url: '/configs/:config_id/teams',
        method: 'get',
        func: team_ctrl.getAll
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/teams:
     *     post:
     *       summary: Créer une équipe
     *       tags: [Team]
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
     *              $ref: '#/components/schemas/Team'
     *       responses:
     *         "200":
     *           description: Équipe créée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/CreatedTeam'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs/:config_id/teams',
        method: 'post',
        func: team_ctrl.create
    },

    {
        url: '/configs/:config_id/teams/:team_id',
        method: 'use',
        func: team_ctrl.loadById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/teams/{team_id}:
     *     put:
     *       summary: Modifier une équipe
     *       tags: [Team]
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
     *           name: team_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'équipe
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Team'
     *       responses:
     *         "200":
     *           description: Équipe modifiée
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/CreatedTeam'
     *         "404":
     *           description: Équipe inexistante
     */
    {
        url: '/configs/:config_id/teams/:team_id',
        method: 'put',
        func: team_ctrl.updateById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/teams/{team_id}:
     *     delete:
     *       summary: Supprimer une équipe
     *       tags: [Team]
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
     *           name: team_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'équipe
     *       responses:
     *         "200":
     *           description: Équipe supprimée
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Équipe supprimée
     *         "404":
     *           description: Équipe inexistante
     */
    {
        url: '/configs/:config_id/teams/:team_id',
        method: 'delete',
        func: team_ctrl.deleteById
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/teams/{team_id}/users:
     *     get:
     *       summary: Lister les membres d'une équipe
     *       tags: [Team]
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
     *           name: team_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'équipe
     *       responses:
     *         "200":
     *           description: Membres récupérés
     *           content:
     *             application/json:
     *               schema:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/serializers/UserWithoutPassword'
     *         "404":
     *           description: Équipe inexistante
     */
    {
        url: '/configs/:config_id/teams/:team_id/users',
        method: 'get',
        func: team_ctrl.getPlayers
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/teams/{team_id}/users:
     *     post:
     *       summary: Ajouter un membre dans une équipe
     *       tags: [Team]
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
     *           name: team_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'équipe
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                username:
     *                  type: string
     *                  example: clement284
     *       responses:
     *         "200":
     *           description: Membre ajouté
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/UserWithoutPassword'
     *         "400":
     *           description: Équipe pleine
     *         "404":
     *           description: Utilisateur inexistant
     *         "409":
     *           description: Utilisateur faisant déjà partie de l'équipe
     */
    {
        url: '/configs/:config_id/teams/:team_id/users',
        method: 'post',
        func: team_ctrl.addPlayer
    },

    /**
     * @swagger
     * path:
     *   /configs/{config_id}/teams/{team_id}/users/{user_id}:
     *     delete:
     *       summary: Retirer un membre d'une équipe
     *       tags: [Team]
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
     *           name: team_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'équipe
     *         - in: path
     *           name: user_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'utilisateur
     *       responses:
     *         "200":
     *           description: Membre retiré
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Membre retiré
     *         "404":
     *           description: Équipe inexistante
     */
    {
        url: '/configs/:config_id/teams/:team_id/users/:user_id',
        method: 'delete',
        func: team_ctrl.removePlayer
    }
];
