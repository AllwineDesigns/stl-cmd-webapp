var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var fs = require('fs');
var uuid = require('node-uuid');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/stl_threads', function(request, response) {
    var file = "/tmp/" + uuid.v4() + ".stl";
    var stl_threads = spawn("stl_threads", ["-D", "10", "-P", "2", "-h", "20", file]);
    stl_threads.on('close', function(code) {
        response.download(file, 'stl_threads.stl');
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
