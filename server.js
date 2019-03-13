require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet');
const cors = require('cors');
var compression = require('compression');
const processMessage = require('./process-message');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/chat', (req, res) => {
    const { message } = req.body;
    processMessage(message);
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log('Express running -> PORT ' + server.address().port);
});