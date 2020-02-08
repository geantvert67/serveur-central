require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    swaggerJsdoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express'),
    docSetup = require('./doc-setup.json'),
    auth_ctrl = require('./controllers/auth_ctrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.set('json replacer', (k, v) => (v === null ? undefined : v));

app.use(/^(?!\/(signin|signup|docs)).*$/, auth_ctrl.isAuthenticated);

require('./routes')(app);

app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerJsdoc(docSetup), { explorer: true }));

const errorHandler = (err, req, res, next) => {
    if (err.status == null) {
        res.status(500).send(err.message);
    } else {
        res.status(err.status).send(err.message);
    }
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`API lancée sur le port ${PORT}`));

module.exports = app;
