require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

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
