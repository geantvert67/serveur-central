const auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/auth/signup',
        method: 'post',
        func: auth_ctrl.signup
    },

    {
        url: '/auth/signin',
        method: 'post',
        func: auth_ctrl.signin
    },

    {
        url: '/whoami',
        method: 'get',
        func: auth_ctrl.whoami
    }
];
