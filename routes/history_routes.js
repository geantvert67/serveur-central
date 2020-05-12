const history_ctrl = require('../controllers/history_ctrl');

module.exports = [
    {
        url: '/games/:game_id/history',
        method: 'get',
        func: history_ctrl.getByGameId
    },

    {
        url: '/games/:game_id/history',
        method: 'post',
        func: history_ctrl.create
    }
];
