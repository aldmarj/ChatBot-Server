require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet');
const cors = require('cors');
var compression = require('compression');
const processMessage = require('./process-message');

const app = express();

var corsOptions = {
    origin: 'https://brave-galileo-6773b0.netlify.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chat', (req, res) => {
    const { message } = req.body;
    processMessage(message);
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log('Express running -> PORT ' + server.address().port);
});