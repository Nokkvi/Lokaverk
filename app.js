var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname+'/public');


app.get('/', function(request, response) {
    response.render('about');
    console.log('Express er vesen')
});

app.get('/vidburdir', function(request, response) {
    response.render('index');
    console.log('Svo mikið vesen')
});


app.listen(app.get('port'), function() {
    console.log('Node is running on port: ', app.get('port'));
});

