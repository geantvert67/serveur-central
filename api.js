require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    auth_ctrl = require('./controllers/auth_ctrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(/^(?!\/auth\/).*$/, auth_ctrl.is_authenticated);

require('./routes')(app);

const errorHandler = (err, req, res, next) => {
    if (err.status == null) {
        res.status(500).send(err.message);
    } else {
        res.status(err.status).send(err.message);
    }
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`API lancée sur le port ${PORT}`));
