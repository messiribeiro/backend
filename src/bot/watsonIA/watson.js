const watsonApiKey = require('../../../credentials/watson-nlu.json').apikey

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: watsonApiKey,
    version: '2018-04-05',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

function getKeywords(msg) {
    nlu.analyze(
        {
            text: `${msg}`, // Buffer or String
            features: {
                concepts: {},
                keywords: {}
            }
        },
        function (err, response) {
            if (err) {
                console.log('error:', err);
            } else {
                console.log(JSON.stringify(response, null, 1));
            }
            process.exit(0)
        }
    );
}

exports.getKeywords = getKeywords