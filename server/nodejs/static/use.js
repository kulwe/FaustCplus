    (function () {
        var flashvars = {
            "jsfunc": "FaustCplusAjaxCallBack",
            "imgUrl": "default.jpg",
            "pid": "75642723",
            "showBrow": true,
            "showCame": false,
            "uploadSrc": false,
            "pSize": '300|300|70|70',//前2个参数为裁剪窗口大小
            "uploadUrl": '/upload',
            "jslang":function(){
                return{
                    "CX0193": "仅支持JPG，PNG，GIF图片文件，且文件小于2M",
                    "CX0189": "您上传的图片会自动生成两种尺寸\n请注意中小尺寸的图片是否清晰"
                }
            }
        };

        var params = {
            menu: "false",
            scale: "Scale",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            wmode: "transparent",
            bgcolor: "#FFFFFF"
        };

        var attributes = {
            id: "FaustCplus"
        };

        swfobject.embedSWF("FaustCplus.swf", "altContent", "650", "500", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
    })();

    function FaustCplusAjaxCallBack(res) {
        res = eval('(' + res + ')');
        if (res.flag) {
            alert('上传成功');
            console.log(res);
        }
        else {
            alert('上传失败');
            console.log(res);
        }
    }

    function uploadevent(status){
        status += '';
        switch(status){
            case '1':
                alert('upload succeed!');
                var time = new Date().getTime();
                document.getElementById('avatar_priview').innerHTML = "Avatar Priview: <img src='php/avatar_1.jpg?" + time + "'/> <br/> Source Image: <img src='php/avatar_2.jpg?" + time + "'/>";
                break;
            case '2':
                if(confirm('js call upload')){
                    return 1;
                }else{
                    return 0;
                }
                break;
            case '-1':
                alert('cancel!');
                window.location.href = "#";
                break;
            case '-2':
                alert('upload failed!');
                window.location.href = "#";
                break;
            default:
                alert(typeof(status) + ' ' + status);
        }
    }