var express=require('express');
var app=express();
var faustCplus=require('../index.js');
var path=require('path');

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});
app.get('/upload',function(req,res){
    res.sendfile('upload.html');
});

//保存图片
app.post('/upload',function(req,res){
	faustCplus.saveImages(req).done(function(images){
		console.log('文件保存路径为：'+images.paths);
		res.json({
			flag:true,
			content:images.names
		});
	});
});
app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.listen(3000,function(){
	console.log('测试服务创建成功，请在浏览器访问 :3000/upload进行测试');
});
