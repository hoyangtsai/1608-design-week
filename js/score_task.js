function AJAX(method, URL, async, type, callback, data) {
    setUser('ohD2qjmtST3rseNCG7M9yTRLk4JA');
    var xml = new XMLHttpRequest();
    xml.responseType = type;
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            var getRes = xml.response;
            callback(getRes);
        }
    };
    xml.onerror = function (e) {
        console.error(e);
    };
    xml.open(method, URL, async);
    xml.withCredentials = true;
    if (data) {
      xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xml.send(data);
    } else {
      xml.send();
    }
}


self.addEventListener('message', function(e) {

  var runner,
    method,
    url = '//mxd.tencent.com/weixin/160818-mbd/server/',
    data,
    type,
    callback;
  var textCallback = function(data) {
    console.log('==============');
    console.log('data have sent');
    console.log(data);
    console.log('==============');
  }
  switch (e.data) {
    case 'start':
      runner = setInterval(function(){
        // method = 'GET';
        // url += 'ajax?item=true&getAll=true';
        // type= 'text';
        // callback = textCallback;

        var user = {
          'imgsrc': '//placeholder.qiniudn.com/200x200',
          'name': 'Unicorn',
          'time': '30分钟',
          'gift': '抱枕1个',
          'status': '未认领'
        };
        self.postMessage(user);
      }, 2000);
      break;
    case 'stop':
      clearInterval(runner);
      self.close();
      break;
  };

}, false);
