https = require('https');

const IAM_TOKEN = 't1.9euelZrOy5vLz4vGysjNlozJnpOWy-3rnpWaiczIlo2QzM6cjY7JmcyVxs3l8_cRd0EB-u8PdmJW_N3z91ElPwH67w92Ylb8.LJyNBxfR45Ks3XclkYbBCeDczTIs6kgoTv2MGO4SJl-pOoLRh6LWNBFPkgNxi_1BAUWzvTTW1A57W5TK5AZjDg';
const FOLDER = 'AgAAAAAox4HrAATuwWgDrnxFAUMaoCBZS7wjyXQ'

var options = {
    hostname: 'translate.api.cloud.yandex.net',
    path: '/translate/v2/translate/',
    method: 'POST',
    headers: {
        'Content-Type': 'aaplication/json',
        'Authorization': 'Bearer ' + IAM_TOKEN
    }
}

var req = https.request(options, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });
})

req.write(`{
    "folder_id": "${FOLDER}",
    "texts": ["В этом примере показано, как перевести на русский язык две строки с текстом", "World is very big"],
    "targetLanguageCode": "en"
}`);
req.end();

var request = require('request');

request.post(
    'https://translate.api.cloud.yandex.net/translate/v2/translate/', {
        json: {
            "folder_id": FOLDER,
            "texts": ["Hello", "World"],
            "targetLanguageCode": "ru"
        },
        headers: {
            'Content-Type': 'aaplication/json',
            'Authorization': 'Bearer ' + IAM_TOKEN
        }
    },
    function(error, response, body) {
        console.log('respcode:', response.statusCode);
        console.log(body);
        if (!error && response.statusCode == 200) {
            console.log('response:', body);
        } else {
            console.log(error)
        }
    }
);











const axios = require('axios');

axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
        "folder_id": FOLDER,
        "texts": ["Hello", "World"],
        "targetLanguageCode": "ru"
    }, {
        headers: {
            'Content-Type': 'aaplication/json',
            'Authorization': 'Bearer ' + IAM_TOKEN
        }
    })
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })