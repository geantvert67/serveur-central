const invitations_ctrl = require('../controllers/invitations_ctrl');

/**
 * @swagger
 * tags:
 *  name: Invitation
 */
module.exports = [
    /**
     * @swagger
     * path:
     *   /games/{game_id}/invitations:
     *     get:
     *       summary: Lister tous les demandes à rejoindre une partie
     *       tags: [Invitation]
     *       parameters:
     *         - in: path
     *           name: game_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la partie
     *       responses:
     *         "200":
     *            description: Demandes récupérées
     *            content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/serializers/Invitation'
     */
    {
        url: '/games/:game_id/invitations',
        method: 'get',
        func: invitations_ctrl.getPending
    },

    /**
     * @swagger
     * path:
     *   /games/{game_id}/invitations:
     *     post:
     *       summary: Créer un demande à rejoindre une partie
     *       tags: [Invitation]
     *       parameters:
     *         - in: path
     *           name: game_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la partie
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/serializers/NewInvitation'
     *       responses:
     *         "200":
     *            description: Demande envoyée
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/Invitation'
     *         "406":
     *           description: Paramètres invalides
     *         "409":
     *           description: Demande déjà envoyée
     */
    {
        url: '/games/:game_id/invitations',
        method: 'post',
        func: invitations_ctrl.create
    },

    {
        url: '/games/:game_id/invitations/:invitation_id',
        method: 'use',
        func: invitations_ctrl.loadById
    },

    /**
     * @swagger
     * path:
     *   /games/{game_id}/invitations/{invitation_id}:
     *     post:
     *       summary: Modifier un demande à rejoindre une partie
     *       tags: [Invitation]
     *       parameters:
     *         - in: path
     *           name: game_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la partie
     *         - in: path
     *           name: invitation_id
     *           required: true
     *           schema:
     *             type: integer
     *             minimum: 1
     *           description: Identifiant de la demande
     *       requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/serializers/NewInvitation'
     *       responses:
     *         "200":
     *            description: Demande modifiée
     *            content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/serializers/Invitation'
     *         "404":
     *           description: Demande inexistante
     */
    {
        url: '/games/:game_id/invitations/:invitation_id',
        method: 'put',
        func: invitations_ctrl.updateById
    }
];
