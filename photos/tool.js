/**var images = require("images");

images("01.jpg")                     //Load image from file 
                                        //加载图像文件
    .size(100)                          //Geometric scaling the image to 400 pixels width
                                        //等比缩放图像到400像素宽
    .draw(images("logo.png"), 10, 10)   //Drawn logo at coordinates (10,10)
                                        //在(10,10)处绘制Logo
    .save("output.jpg", {               //Save the image to a file, with the quality of 50
        quality : 50                    //保存图片到文件,图片质量为50
    });
*/
//pqL9ffC5ai3ZQbAQI8ZPrW69IsI8Waqf

/**var tinify = require("tinify");
var fs = require("fs");
tinify.key = "pqL9ffC5ai3ZQbAQI8ZPrW69IsI8Waqf";
//var source = tinify.fromFile("01.jpg");
//source.toFile("sss.jpg");

var readDir = function getFiles(dir,files_){
	var files_ = files_||[];
	var files = fs.readdirSync(dir);
	for(var i in files){
		var name = dir + "/" + files[i];
		if(fs.statSync(name).isDirectory()){
			getFile(name,files_);
		}else{
			files_.push(name);
		}
	}
	return files_;
}
//设置扫描记录
var dirs = readDir("D:\ceshi");*/

var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('D:\ceshi');
const tinify = require('tinify')
tinify.key = "pqL9ffC5ai3ZQbAQI8ZPrW69IsI8Waqf";


//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
                            // 压缩图片
							var source = tinify.fromFile(filedir);
							var resized = source.resize({
							  method: "fit",
							  width: 400,
							  height: 200
							});
                            setTimeout(()=>{resized.toFile(filedir)});
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
