var fs=require('fs');
var path=require('path');
var Promise=require('promise');


function saveImages(readStream,saveDirPath){
	var curFileName='upload_'+Date.now()+'_'+Math.random()*1000;
	var n=0;
	var wantSize=0;
	var image=null;
	var savedImages=[];
	var saveImagesPaths=[];
	var promiseResolve,promiseReject;
	var promise=new Promise(function(resolve,reject){
		promiseResolve=resolve;
		promiseReject=reject;
	});
	
	saveDirPath||(saveDirPath= process.cwd());
	
	function createImage(){
		var name=curFileName+'_'+n+'.jpg';
		var fname=path.join(saveDirPath,name);
		n++;
		savedImages.push(name);
		saveImagesPaths.push(fname);
		return fs.createWriteStream(fname);
	}
	function saveImage(data){
		//当前无正在保存的图像
		if(!image){
			image=createImage();
			wantSize=data.readUInt32LE(0);
			//去掉头部记录长度的数据
			data=data.slice(4);
		}

		//本次数据不足
		if(wantSize>data.length){
			image.write(data);
			wantSize-=data.length;
			return;
		}
		//本次数据足够
		image.end(data.slice(0,wantSize));
		image=null;
		
		//还有剩余数据,保存剩余数据为图像
		if(data.length>wantSize){
			saveImage(data.slice(wantSize));
		}
	}
	
	readStream.on('readable',function(){
		var chunk;
		while (null !== (chunk =this.read())) {
			saveImage(chunk);
		}
	});
	readStream.on('end',function(){
		promiseResolve({
			names:savedImages,
			paths:saveImagesPaths
		});
	});
	return promise;
}

exports=module.exports={
	saveImages:saveImages
};
