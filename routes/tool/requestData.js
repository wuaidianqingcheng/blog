var http = require("http");
var https = require("https");

var requestData = {
  resuest(config){
    // console.log(config)
    var { protocol, options, success } = config;
//  var protocol = config.protocol;

    if(protocol == "http"){
      http.request( options, (res) => {
        var str = "";
        //接收数据
        res.on("data", (data) => {
          str += data;
        })
         //接收数据完毕
        res.on("end", () => {
//        console.log(str);
          success(str)
        })
        res.on("error", (error) => {
          console.log(error);
        })
      }).end();
    }else{
      // console.log("https")
      https.request( options, (res) => {
        var str = "";
        //接收数据
        res.on("data", (data) => {
          str += data;
        })
         //接收数据完毕
        res.on("end", () => {
//        console.log(str);
           success(str)
        })
        res.on("error", (error) => {
          console.log(error);
        })
      }).end();
    }
    
   
  }
}

module.exports = requestData;
