const config_ctrl = require('../controllers/config_ctrl');

module.exports = [
    {
        url: '/configs',
        method: 'get',
        func: config_ctrl.getAll
    },

    {
        url: '/user/configs',
        method: 'get',
        func: config_ctrl.getByOwner
    }
];
