const watsonApiKey = require('../../credentials/watson-nlu.json').apikey

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: watsonApiKey,
    version: '2018-04-05',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

async function watsonKeywords(sentence){
    return new Promise((resolve, reject) => {
        nlu.analyze(
                {
                    text: sentence,
                    features: {
                        keywords: {}
                    } 
                },
                function (error, response) {
                    if (error) {
                        throw error
                    }
                    const keywords = response.keywords.map((keyword)=> {
                        return keyword.text
                    })
                    resolve(keywords)
            }
        );
    })
}


module.exports = watsonKeywords