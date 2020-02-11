const auth_ctrl = require('../controllers/auth_ctrl');

/**
 * @swagger
 * tags:
 *  name: Authentification
 */
module.exports = [
    /**
     * @swagger
     * path:
     *  /signup:
     *    post:
     *      summary: Inscription
     *      tags: [Authentification]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      responses:
     *        "200":
     *          description: Utilisateur créé
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/serializers/UserAndToken'
     *        "406":
     *          description: Paramètres invalides
     *        "409":
     *          description: Nom d'utilisateur déjà utilisé
     */
    {
        url: '/signup',
        method: 'post',
        func: auth_ctrl.signup
    },

    /**
     * @swagger
     * path:
     *  /signin:
     *    post:
     *      summary: Connexion
     *      tags: [Authentification]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      responses:
     *        "200":
     *          description: Connexion réusssie
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/serializers/UserAndToken'
     *        "401":
     *          description: Identifiants invalides
     *        "406":
     *          description: Paramètres invalides
     */
    {
        url: '/signin',
        method: 'post',
        func: auth_ctrl.signin
    }
];
