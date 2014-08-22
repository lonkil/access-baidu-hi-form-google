//百度限制所有谷歌过来访问，本插件实现突破此限制。
//作者：Lonkil@gmail.com
//日期：2014.08

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if( details.method == "GET" && details.url.indexOf("http://hi.baidu.com/") == 0 )
    {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Referer') {
                var refUrl = details.requestHeaders[i].value;
                var re = new RegExp("^http(s)?:\/\/.*google\..*","i");
                if(re.test(refUrl))
                {
                    details.requestHeaders[i].value="";
                    return {requestHeaders: details.requestHeaders};
                }
            }

        }
    }
  },
  {urls: ["*://hi.baidu.com/*"]},
  ["blocking", "requestHeaders"]);

