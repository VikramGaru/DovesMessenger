//https://github.com/websockets/ws/blob/master/doc/ws.md#new-wsserveroptions-callback
var webSocketServer = require('ws').Server,
wss = new webSocketServer({
server:httpsServer,
                          port: 3000, //ç›‘å¬æŽ¥å£
                          verifyClient: socketVerify //å¯é€‰ï¼ŒéªŒè¯è¿žæŽ¥å‡½æ•°
                          });

function socketVerify(info) {
    console.log(info.origin);
    console.log(info.req.t);
    console.log(info.secure);
    // console.log(info.origin);
    // var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);
    //if (origin.length >= 3 && origin[2] == "blog.luojia.me") {
    //    return true; //å¦‚æžœæ˜¯æ¥è‡ªblog.luojia.meçš„è¿žæŽ¥ï¼Œå°±æŽ¥å—
    //}
    // console.log("è¿žæŽ¥",origin[2]);
    return true; //å¦åˆ™æ‹’ç»
    //ä¼ å…¥çš„infoå‚æ•°ä¼šåŒ…æ‹¬è¿™ä¸ªè¿žæŽ¥çš„å¾ˆå¤šä¿¡æ¯ï¼Œä½ å¯ä»¥åœ¨æ­¤å¤„ä½¿ç”¨console.log(info)æ¥æŸ¥çœ‹å’Œé€‰æ‹©å¦‚ä½•éªŒè¯è¿žæŽ¥
}
//å¹¿æ’­
wss.broadcast = function broadcast(s,ws) {
    // console.log(ws);
    // debugger;
    wss.clients.forEach(function each(client) {
                        // if (typeof client.user != "undefined") {
                        if(s == 1){
                        client.send(ws.name + ":" + ws.msg);
                        }
                        if(s == 0){
                        client.send(ws + "é€€å‡ºèŠå¤©å®¤");
                        }
                        // }
                        });
};
// åˆå§‹åŒ–
wss.on('connection', function(ws) {
       // console.log(ws.clients.session);
       // console.log("åœ¨çº¿äººæ•°", wss.clients.length);
       ws.send('ä½ æ˜¯ç¬¬' + wss.clients.length + 'ä½');
       // å‘é€æ¶ˆæ¯
       ws.on('message', function(jsonStr,flags) {
             var obj = eval('(' + jsonStr + ')');
             // console.log(obj);
             this.user = obj;
             if (typeof this.user.msg != "undefined") {
             wss.broadcast(1,obj);
             }
             });  
       // é€€å‡ºèŠå¤©  
       ws.on('close', function(close) {  
             try{  
             wss.broadcast(0,this.user.name);  
             }catch(e){  
             console.log('åˆ·æ–°é¡µé¢äº†');  
             }  
             });  
       });  

