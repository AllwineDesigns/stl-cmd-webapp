var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var fs = require('fs');
var uuid = require('node-uuid');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/stl_threads', function(request, response) {
    var file = "/tmp/" + uuid.v4() + ".stl";

    var D = request.query.D ? request.query.D : "6.35";
    var P = request.query.P ? request.query.P : "1.27";
    var h = request.query.h ? request.query.h : "25.4";
    var a = request.query.a ? request.query.a : "60";
    var s = request.query.s ? request.query.s : "72";
    var o = request.query.o ? request.query.o : "12";
    var f = request.query.f;

    var filename = request.query.filename ? request.query.filename : (f ? "female" : "male") + "M" + D + "x" + P;

    var args = ["-D", D, "-P", P, "-h", h, "-a", a, "-s", s, "-o", o];
    if(f) {
        args.push("-f");
    }
    args.push(file);

    var stl_threads = spawn("stl_threads", args);
    stl_threads.on('close', function(code) {
        response.download(file, filename+'.stl');
    });
});

app.get('/stl_threads_english', function(request, response) {
    var file = "/tmp/" + uuid.v4() + ".stl";

    var Din = request.query.D ? request.query.D : ".25";
    var TPI = request.query.tpi ? request.query.tpi : "20";

    var D = parseFloat(request.query.Din)*25.4;
    var P = 25.4/parseFloat(TPI);
    var h = request.query.h ? parseFloat(request.query.h)*25.4 : "25.4";
    var a = request.query.a ? request.query.a : "60";
    var s = request.query.s ? request.query.s : "72";
    var o = request.query.o ? parseFloat(request.query.o)*25.4 : "12";
    var f = request.query.f;

    var filename = request.query.filename ? request.query.filename : (f ? "female" : "male") + Din + "x" + TPI;

    var args = ["-D", D, "-P", P, "-h", h, "-a", a, "-s", s, "-o", o];
    if(f) {
        args.push("-f");
    }
    args.push(file);

    var stl_threads = spawn("stl_threads", args);
    stl_threads.on('close', function(code) {
        response.download(file, filename+'.stl');
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
