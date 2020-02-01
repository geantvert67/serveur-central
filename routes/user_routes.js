const user_ctrl = require('../controllers/user_ctrl');

module.exports = [
    {
        url: '/user',
        method: 'put',
        func: user_ctrl.update
    },

    {
        url: '/user/password',
        method: 'put',
        func: user_ctrl.updatePassword
    }
];
