const config_ctrl = require('../controllers/config_ctrl');

module.exports = [
    {
        url: '/configs',
        method: 'get',
        func: config_ctrl.getAll
    },

    {
        url: '/configs',
        method: 'post',
        func: config_ctrl.create
    },

    {
        url: '/configs/:config_id',
        method: 'use',
        func: config_ctrl.loadById
    },

    {
        url: '/configs/:config_id',
        method: 'get',
        func: config_ctrl.getById
    },

    {
        url: '/configs/:config_id',
        method: 'put',
        func: config_ctrl.updateById
    },

    {
        url: '/user/configs',
        method: 'get',
        func: config_ctrl.getByOwner
    }
];
