const user_ctrl = require('../controllers/user_ctrl');

/**
 * @swagger
 * tags:
 *  name: User
 */
module.exports = [
    /**
     * @swagger
     * path:
     *   /user:
     *     get:
     *       summary: Récupérer l'utilisateur connecté
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       responses:
     *         "200":
     *           description: Utilisateur récupéré
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/UserWithoutPassword'
     */
    {
        url: '/user',
        method: 'get',
        func: user_ctrl.getCurrent
    },

    /**
     * @swagger
     * path:
     *   /user:
     *     put:
     *       summary: Modifier son nom d'utilisateur
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 username:
     *                   type: string
     *                   example: clement285
     *       responses:
     *         "200":
     *           description: Nom d'utilisateur modifié
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                    id:
     *                      type: integer
     *                      example: 1
     *                    username:
     *                      type: string
     *                      example: clement285
     *         "406":
     *           description: Paramètres invalides
     *         "409":
     *           description: Nom d'utilisateur déjà utilisé
     */
    {
        url: '/user',
        method: 'put',
        func: user_ctrl.update
    },

    /**
     * @swagger
     * path:
     *   /user/password:
     *     put:
     *       summary: Modifier son mot de passe
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 currentPassword:
     *                   type: string
     *                   example: 123azerty
     *                 newPassword:
     *                   type: string
     *                   example: azerty123
     *       responses:
     *         "200":
     *           description: Mot de passe modifié
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                    message:
     *                      type: string
     *                      example: Mot de passe modifié
     *         "401":
     *           description: Mot de passe invalide
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/user/password',
        method: 'put',
        func: user_ctrl.updatePassword
    },

    /**
     * @swagger
     * path:
     *   /user/invitations:
     *     get:
     *       summary: Lister ses demandes à rejoindre une partie
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       responses:
     *         "200":
     *            description: Demandes récupérées
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/InvitationWithGame'
     */
    {
        url: '/user/invitations',
        method: 'get',
        func: user_ctrl.getInvitations
    },

    /**
     * @swagger
     * path:
     *   /user/invitations/{invitation_id}:
     *     delete:
     *       summary: Supprimer une de ses demande à rejoindre une partie
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       parameters:
     *         - in: path
     *           name: invitation_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la demande
     *       responses:
     *         "200":
     *            description: Demande supprimée
     *            content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     example: Demande supprimée
     *         "404":
     *           description: Demande inexistante
     */
    {
        url: '/user/invitations/:invitation_id',
        method: 'delete',
        func: user_ctrl.deleteInvitationById
    },

    /**
     * @swagger
     * path:
     *   /user/history:
     *     get:
     *       summary: Lister tous ses historiques de partie
     *       tags: [User]
     *       responses:
     *         "200":
     *            description: Historiques récupérés
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/History'
     */
    {
        url: '/user/history',
        method: 'get',
        func: user_ctrl.getHistory
    },

    /**
     * @swagger
     * path:
     *   /users:
     *     get:
     *       summary: Lister 5 utilisateurs correspondant à un nom d'utilisateur
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       parameters:
     *         - in: query
     *           name: username
     *           schema:
     *             type: string
     *           description:
     *             Le nom d'utilisateur recherché
     *       responses:
     *         "200":
     *           description: Utilisateurs récupérés
     *           content:
     *             application/json:
     *               schema:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/serializers/UserWithoutPassword'
     */
    {
        url: '/users',
        method: 'get',
        func: user_ctrl.getAll
    },

    /**
     * @swagger
     * path:
     *   /users/{user_id}/statistics:
     *     get:
     *       summary: Récupérer les statistiques d'un utilisateur
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       parameters:
     *         - in: path
     *           name: user_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de l'utilisateur
     *       responses:
     *         "200":
     *           description: Statistiques récupérées
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/serializers/UserWithStats'
     */
    {
        url: '/users/:user_id/statistics',
        method: 'get',
        func: user_ctrl.getByIdWithStats
    },

    /**
     * @swagger
     * path:
     *   /leaderboard:
     *     get:
     *       summary: Récupérer les 25 meilleurs joueurs
     *       tags: [User]
     *       security:
     *         - JWTAuth: []
     *       parameters:
     *         - in: query
     *           name: filter
     *           schema:
     *             type: string
     *           description:
     *             Le filtre pour classer les joueurs
     *       responses:
     *         "200":
     *           description: Joueurs récupérés
     *           content:
     *             application/json:
     *               schema:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/serializers/UserWithStats'
     */
    {
        url: '/leaderboard',
        method: 'get',
        func: user_ctrl.getLeaderboard
    }
];
