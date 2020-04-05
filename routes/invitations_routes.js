const invitations_ctrl = require('../controllers/invitations_ctrl');

module.exports = [
    {
        url: '/games/:game_id/invitations',
        method: 'get',
        func: invitations_ctrl.getPending
    },

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

    {
        url: '/games/:game_id/invitations/:invitation_id',
        method: 'put',
        func: invitations_ctrl.updateById
    }
];
