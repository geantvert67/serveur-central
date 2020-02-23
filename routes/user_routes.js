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
     *                 password:
     *                   type: string
     *                   example: 123azerty
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
    }
];