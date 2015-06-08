    (function () {
        var flashvars = {
            "jsfunc": "callback",
            "imgUrl": "/Content/images/user_male.png",
            "pid": "75642723",
            "showBrow": true,
            "showCame": true,
            "uploadSrc": false,
            "pSize": '300|300|150|150|70|70',//前2个参数为裁剪窗口大小
            "uploadUrl": '@Url.Action("ChangeHeader", "Account", new { id = LinklifeAuthentication.MemberId })',
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

        swfobject.embedSWF("/Content/flash/FaustCplus.swf", "uploadContent", "650", "500", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
    })();

    function callback(res) {
        res = eval('(' + res + ')');
        if (res.flag) {
            $.zbtip('ok', '上传成功');
            console.log(res.content);
        }
        else { $.zbtip('error',res.content); }
    }