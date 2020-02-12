const team_ctrl = require('../controllers/team_ctrl');

/**
 * @swagger
 * tags:
 *   name: Team
 */
module.exports = [
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
     *                    $ref: '#/components/schemas/Team'
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
     *                 $ref: '#/components/schemas/Team'
     *         "406":
     *           description: Paramètres invalides
     */
    {
        url: '/configs/:config_id/teams',
        method: 'post',
        func: team_ctrl.create
    }
]