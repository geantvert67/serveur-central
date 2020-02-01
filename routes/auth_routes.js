const auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/signup',
        method: 'post',
        func: auth_ctrl.signup
    },

    {
        url: '/signin',
        method: 'post',
        func: auth_ctrl.signin
    }
];
