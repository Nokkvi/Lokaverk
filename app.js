var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname+'/public');


app.get('/', function(request, response) {
    response.render(__dirname + '/public/'+'index.html');
});

app.get('/vidburdir', function(request, response) {
    response.sendFile(__dirname + '/public/'+'vidburdir.html');
});

app.get('/tonleikar', function(request, response) {
    response.sendFile(__dirname + '/public/'+'tonleikar.html');
});


app.listen(app.get('port'), function() {
    console.log('Node is running on port: ', app.get('port'));
});

