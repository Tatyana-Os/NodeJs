var http = require('http');
var fs = require('fs');
var urlutils = require('url');
var request = require('request');

var PORT = 8000;

http.createServer(function(request, response) {

    var parse = urlutils.parse(request.url, true);
    var page = parse.pathname;
    var text = parse.query.text;

    if (page === '/') {
        rend(fs.readFileSync('index.html'));
    }

    if (page === '/trans') {
        translate(text, rend);
    }

    function rend(render) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(render);
        response.end();
    }

}).listen(PORT, function() {
    console.log("Let's get started: http://localhost:" + PORT);
});

function translate(text, callback) {
    request.get('https://translate.api.cloud.yandex.net/translate/v2/translate/' +
        'key=t1.9euelZrOy5vLz4vGysjNlozJnpOWy-3rnpWaiczIlo2QzM6cjY7JmcyVxs3l8_cRd0EB-u8PdmJW_N3z91ElPwH67w92Ylb8.LJyNBxfR45Ks3XclkYbBCeDczTIs6kgoTv2MGO4SJl-pOoLRh6LWNBFPkgNxi_1BAUWzvTTW1A57W5TK5AZjDg' +
        'lang=en-ru&text=' + text,
        function(err, res, body) {
            if (err) {
                callback(JSON.stringify({ 'status': 'error' }));
            } else {
                if (res.statusCode === 200) {
                    var data = JSON.parse(body);
                    callback(JSON.stringify({ 'status': 'success', 'msg': data.text[0] }));
                } else {
                    callback(JSON.stringify({ 'status': 'error' }));
                }
            }
        })
}