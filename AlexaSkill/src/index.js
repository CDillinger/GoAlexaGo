'use strict';
const Alexa = require('alexa-sdk');
const http = require('http');

var direction;
var urlBase = 'http://cchackers.azurewebsites.net/direction';
var directionString;
var emitter;
var httpContent = '';

function getData(path, eventCallback) {
    http.get(urlBase + path, function(res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var stringResult = body;
            eventCallback(stringResult);
        });
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}

const languageStrings = {
    'en-US': {
        translation: {
            GET_FACT_MESSAGE: "Here's your fact: ",
            PROMPT_MESSAGE: 'Which direction?',
            REPROMPT_MESSAGE: 'What direction was that?',
            HELP_MESSAGE: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', this.t('PROMPT_MESSAGE'), this.t('REPROMPT_MESSAGE'));
    },
    'TaxiIntent': function () {
        this.emit('Turn');
    },
    'Turn': function () {
        emitter = this;
        // Create speech output
        if (direction === undefined)
        {
            this.emit(':ask', '', '');
        }
        else if (direction == "left")
        {
            directionString = "/left";
        }
        else if (direction == "right")
        {
            directionString = "/right";
        }
        else if (direction == "straight" || direction == "go" || direction == "forward")
        {
            directionString = "/straight";
        }
        else if (direction == "backwards" || direction == "around" || direction == "you turn")
        {
            directionString = "/backwards";
        }
        else if (direction == "stop")
        {
            directionString = "/stop";
        }
        else
        {
            emitter.emit(':ask', '', '');
        }
        
        if (directionString !== undefined)
        {
            getData(directionString, function(dir) {
                if (dir !== undefined)
                {
                    switch (dir)
                    {
                        case "Left":
                        case "Right":
                            emitter.emit(':ask', "Turning " + dir, "");
                            break;
                        case "Straight":
                            emitter.emit(':ask', "Keeping " + dir, "");
                            break;
                        case "Backwards":
                            emitter.emit(':ask', "Turning around", "");
                            break;
                        case "Stop":
                            emitter.emit(':ask', "Stopping", "");
                            break;
                    }
                }
                else
                    emitter.emit(':ask', '');
            });
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        emitter = this;
        getData("/stop", function(dir) {
            emitter.emit(':tell', emitter.t('STOP_MESSAGE'));
          
        });
    },
    'SessionEndedRequest': function () {
        emitter = this;
        getData("/stop", function(dir) {
            emitter.emit(':tell', emitter.t('STOP_MESSAGE'));
          
        });
    },
      'Unhandled': function () {
        this.emit(':ask', "unhandled error");
    }
};

exports.handler = (event, context) => {
    if (event.request !== undefined && event.request.intent !== undefined && event.request.intent.slots !== undefined && event.request.intent.slots.Direction !== undefined)
        direction = event.request.intent.slots.Direction.value;
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
