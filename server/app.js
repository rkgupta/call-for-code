'use strict';

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_CONFIG_DIR = __dirname + '/config/';

var express = require('express');
var config = require('config');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./src/routes');

/**
 * MongoDB configurations
 */
var mongodbUrl = 'mongodb://' + config.DB_HOST + ':' + config.DB_PORT + '/' + config.DB_NAME;

// Database options
// Option auto_reconnect is defaulted to true
var dbOptions = {
    server: {
        reconnectTries: -1, // always attempt to reconnect
        socketOptions: {
            keepAlive: 120
        }
    }
};

// Events on db connection
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error. Please make sure MongoDB is running. -> ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.error('MongoDB connection disconnected.')
});

mongoose.connection.on('reconnected', function () {
    console.error('MongoDB connection reconnected.')
});

// Connect to db
var connectWithRetry = function () {
    return mongoose.connect(mongodbUrl, dbOptions, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec. -> ' + err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

connectWithRetry();

/**
 * Express app configurations
 */
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// Enable CORS
app.use(cors());

// Bootstrap routes
app.use(routes);

// Static files
app.use('/', express.static(__dirname + '/../public'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// Once database open, start server
mongoose.connection.once('open', function callback() {
    console.log('Connection with database succeeded.');
    app.listen(config.APP_PORT, function () {
        console.log('app listening on port %d in %s mode', this.address().port, app.settings.env);
    });
});

require('dotenv').config({
    silent: true
});

const fs = require('fs'); // file system for loading JSON
const WatsonDiscoverySetup = require('./lib/watson-discovery-setup');
const WatsonAssistantSetup = require('./lib/watson-assistant-setup');
const DEFAULT_NAME = 'disaster-rescue-chatbot';
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const assistant = new AssistantV1({version: '2018-02-16', url:"https://gateway-wdc.watsonplatform.net/assistant/api", iam_apikey:"SwZBC5saN4WywuOVcZS5It1KNMLOs9OZWVD5iazOYVlX"});
let setupError = '';
let workspaceID; // workspaceID will be set when the workspace is created or validated.
const assistantSetup = new WatsonAssistantSetup(assistant);
console.log(__dirname);
const workspaceJson = JSON.parse(fs.readFileSync(path.join(__dirname,"data/conversation/workspaces/disaster-bot.json")));
const assistantSetupParams = {default_name: DEFAULT_NAME, workspace_json: workspaceJson};

var Help = require('../server/src/help//help.model');
assistantSetup.setupAssistantWorkspace(assistantSetupParams, (err, data) => {
    if (err) {
        handleSetupError(err);
    } else {
        console.log('Watson Assistant is ready!');
        workspaceID = data;
    }
});

app.post('/api/message', function (req, res) {

    if (setupError) {
        return res.json({output: {text: 'The app failed to initialize properly. Setup and restart needed.' + setupError}});
    }

    if (!workspaceID) {
        return res.json({
            output: {
                text: 'Assistant initialization in progress. Please try again.'
            }
        });
    }
    let person = {"name": "Sufferer 1"};

    const payload = {
        workspace_id: workspaceID,
        context: {
            person: person
        },
        input: req.body
    };

    callAssistant(payload);


    /**
     * Send the input to the Assistant service.
     * @param payload
     */
    function callAssistant(payload) {

        payload.input.text = payload.input.text;
        payload.workspace_id = workspaceID;
        payload.context['Location'] = '';


        assistant.message(payload, function (err, data) {
            if (err) {
                return res.status(err.code || 500).json(err);
            } else {
                console.log('assistant.message :: ', JSON.stringify(data));
                // lookup actions
                checkForLookupRequests(data, function (err, data) {
                    if (err) {
                        return res.status(err.code || 500).json(err);
                    } else {



                        Help.find(function (err, helps) {
                            if (err) {
                                return next(err);
                            }

                            let result = {helps: helps, dataFromIBMAssistant:data};
                            return res.status(200).json(result);
                        });
                        //return res.json(data);
                    }
                });
            }
        });
    }



});

/**
 * Handle setup errors by logging and appending to the global error text.
 * @param {String} reason - The error message for the setup error.
 */
function handleSetupError(reason) {
    setupError += ' ' + reason;
    console.error('The app failed to initialize properly. Setup and restart needed.' + setupError);
    // We could allow our chatbot to run. It would just report the above error.
    // Or we can add the following 2 lines to abort on a setup error allowing Bluemix to restart it.
    console.error('\nAborting due to setup error!');
    process.exit(1);
}

/**
 * Looks for actions requested by Assistant service and provides the requested data.
 */
function checkForLookupRequests(data, callback) {
    console.log('checkForLookupRequests');
    let result = {};
    callback(null, data.output.text)
}

module.exports = app;
