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
     *                type: object
     *                properties:
     *                  token:
     *                    type: string
     *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTU4MTEwNzc4MiwiZXhwIjoxNjEyNjQzNzgyfQ.uomff3RZX_SpjMWi74_J9Ib4bOjY3lO8i_MrNMnno8Q
     *                  user:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: integer
     *                        example: 1
     *                      username:
     *                        type: string
     *                        example: clement284
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
     *                type: object
     *                properties:
     *                  token:
     *                    type: string
     *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTU4MTEwNzc4MiwiZXhwIjoxNjEyNjQzNzgyfQ.uomff3RZX_SpjMWi74_J9Ib4bOjY3lO8i_MrNMnno8Q
     *                  user:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: integer
     *                        example: 1
     *                      username:
     *                        type: string
     *                        example: clement284
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
