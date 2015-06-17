var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var fs = require('fs');
var uuid = require('node-uuid');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/stl_threads', function(request, response) {
    var file = "/tmp/" + uuid.v4() + ".stl";

    var f = request.query.f ? "-f" : "";
    var D = request.query.D ? request.query.D : "6.35";
    var P = request.query.P ? request.query.P : "1.27";
    var h = request.query.h ? request.query.h : "25.4";
    var a = request.query.a ? request.query.a : "60";
    var s = request.query.s ? request.query.s : "72";
    var o = request.query.o ? request.query.o : "12";

    var stl_threads = spawn("stl_threads", [f, "-D", D, "-P", P, "-h", h, "-a", a, "-s", s, "-o", o, file]);
    stl_threads.on('close', function(code) {
        response.download(file, 'stl_threads.stl');
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
