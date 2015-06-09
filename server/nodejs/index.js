var express=require('express');
var app=express();

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});
app.get('/upload',function(req,res){
    res.send('helloword')
});
app.post('/upload',function(req,res){
    req.on('readable', function() {
        var chunk;
        while (null !== (chunk = req.read())) {
            console.log('got %d bytes of data', chunk.length);
        }
    });
});
app.use('/static', express.static(__dirname + '/static'));

app.listen(3000);