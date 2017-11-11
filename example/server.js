var backendClient = require('./backendClient');

var express = require('express');
var app = express();

app.use(express.static('assets'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {'root': './html/'});
});

app.get('/api/*', function (req, res) {
    backendClient(req.url, function (body, res, err) {
        if (err) {
            res.send('Error while sending request to backend server: ', err.message);
        } else {
            res.send(body);
        }
    });
});
console.log("Starting server at port 3000");
app.listen(3000);