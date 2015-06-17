var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/stl_threads', function(request, response) {
    var stl_threads = spawn("stl_threads", ["-D", "10", "-P", "2", "-h", "20", "/tmp/blah.stl"]);
    stl_threads.on('close') function(code) {
        fs.readFile('/tmp/blah.stl', function(err,data) {
            response.send(data);
        });
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
