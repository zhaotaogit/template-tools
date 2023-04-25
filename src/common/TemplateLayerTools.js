const deepClone = (obj) => {
    let _tmp = JSON.stringify(obj); //将对象转换为json字符串形式
    let result = JSON.parse(_tmp); //将转换而来的字符串转换为原生js对象
    return result;
};

// 获取所有层数据，不含下一层的next,并放入一个数组
const getAllLevelData = (obj) => {
    let arr = [];
    let i = 0;
    while (obj.next) {
        const {next, ...rest} = obj;
        arr.push(rest);
        obj = obj.next;
        i++;
    }
    arr.push(obj);
    return arr;
}

// 除第一层外，其他层交换数据
const exchangeLayerData2 = (obj, layer1, layer2) => {
    layer1 = layer1 - 1;
    layer2 = layer2 - 1;
    const allLevelDataArray = getAllLevelData(obj);
    const tempKeyVal = [];
    tempKeyVal.push(allLevelDataArray[layer1].keyVal);
    tempKeyVal.push(allLevelDataArray[layer2].keyVal);
    const temp = allLevelDataArray[layer1];
    allLevelDataArray[layer1] = allLevelDataArray[layer2];
    allLevelDataArray[layer2] = temp;
    allLevelDataArray[layer1].keyVal = tempKeyVal[0];
    allLevelDataArray[layer2].keyVal = tempKeyVal[1];
    let i = 0;
    while (i < allLevelDataArray.length - 1) {
        allLevelDataArray[i].next = allLevelDataArray[i + 1];
        i++;
    }
    return allLevelDataArray[0];
}

// 第一层与其他层交换
const exchangeLayerData1 = (obj, layer) => {
    layer = layer - 1;
    const allLevelDataArray = getAllLevelData(obj);
    const temp = deepClone(allLevelDataArray)[0];
    if (obj['templateType'] === 'COMPLETE') {
        allLevelDataArray[0].seeds.bases = [allLevelDataArray[layer].urlField];
        allLevelDataArray[0].params = allLevelDataArray[layer].params;
        allLevelDataArray[0].httpMethod = allLevelDataArray[layer].httpMethod;
        allLevelDataArray[0].headers = allLevelDataArray[layer].headers;
        allLevelDataArray[0].proxyType = allLevelDataArray[layer].proxyType;
        allLevelDataArray[0].peekReqHeaders = allLevelDataArray[layer].peekReqHeaders;
        allLevelDataArray[0].peekResHeaders = allLevelDataArray[layer].peekResHeaders;
        allLevelDataArray[0].followRedirects =
            allLevelDataArray[layer].followRedirects;
        allLevelDataArray[0].parseError = allLevelDataArray[layer].parseError;
        allLevelDataArray[0].tableRules = allLevelDataArray[layer].tableRules;
        allLevelDataArray[0].fieldRules = allLevelDataArray[layer].fieldRules;
        allLevelDataArray[0].returnResult = allLevelDataArray[layer].returnResult;
        // allLevelDataArray[0].cookieDetector = allLevelDataArray[layer].cookieDetector;
        allLevelDataArray[layer].urlField = temp.seeds.bases[0];
        allLevelDataArray[layer].seeds.bases = [temp.urlField];
        allLevelDataArray[layer].params = temp.params;
        allLevelDataArray[layer].httpMethod = temp.httpMethod;
        allLevelDataArray[layer].headers = temp.headers;
        allLevelDataArray[layer].proxyType = temp.proxyType;
        allLevelDataArray[layer].peekReqHeaders = temp.peekReqHeaders;
        allLevelDataArray[layer].peekResHeaders = temp.peekResHeaders;
        allLevelDataArray[layer].followRedirects = temp.followRedirects;
        allLevelDataArray[layer].parseError = temp.parseError;
        allLevelDataArray[layer].tableRules = temp.tableRules;
        allLevelDataArray[layer].fieldRules = temp.fieldRules;
        allLevelDataArray[layer].returnResult = temp.returnResult;
        allLevelDataArray[layer].cookieDetector = temp.cookieDetector;
    } else if (obj['templateType'] === 'MODULE') {
        // allLevelDataArray[0].domains[0] = [allLevelDataArray[layer].urlField];
        // 大写转小写
        allLevelDataArray[0].httpMethod = allLevelDataArray[layer].httpMethod.toLowerCase();
        allLevelDataArray[0].headers = allLevelDataArray[layer].headers;
        allLevelDataArray[0].followRedirects = allLevelDataArray[layer].followRedirects;
        allLevelDataArray[0].parseError = allLevelDataArray[layer].parseError;
        allLevelDataArray[0].fieldRules = allLevelDataArray[layer].fieldRules;
        allLevelDataArray[0].tableRules = allLevelDataArray[layer].tableRules;
        allLevelDataArray[0].proxyType = allLevelDataArray[layer].proxyType;
        allLevelDataArray[0].returnResult = allLevelDataArray[layer].returnResult;
        allLevelDataArray[0].hasMsgType = allLevelDataArray[layer].hasMsgType;
        allLevelDataArray[0].params = allLevelDataArray[layer].params;
        // allLevelDataArray[0].msgType = allLevelDataArray[layer].msgType;
        allLevelDataArray[layer].followRedirects = temp.followRedirects;
        allLevelDataArray[layer].parseError = temp.parseError;
        // allLevelDataArray[layer].urlField = [allLevelDataArray[0].domains[0]];
        allLevelDataArray[layer].httpMethod = temp.httpMethod.toUpperCase();
        allLevelDataArray[layer].proxyType = temp.proxyType;
        allLevelDataArray[layer].headers = temp.headers;
        allLevelDataArray[layer].fieldRules = temp.fieldRules;
        allLevelDataArray[layer].returnResult = temp.returnResult;
        allLevelDataArray[layer].hasMsgType = temp.hasMsgType;
        allLevelDataArray[layer].params = temp.params;
        allLevelDataArray[layer].tableRules = temp.tableRules;
        // allLevelDataArray[layer].msgType = temp.msgType;
    }
    let i = 0;
    while (i < allLevelDataArray.length - 1) {
        allLevelDataArray[i].next = allLevelDataArray[i + 1];
        i++;
    }
    return allLevelDataArray[0];
}


export const exchangeLayerData = (obj, layer1, layer2) => {
    console.log(obj, layer1, layer2)
    if (layer1 == 1) {
        return exchangeLayerData1(obj, layer2);
    }
    return exchangeLayerData2(obj, layer1, layer2);
}

export const temporaryFilling = (obj) => {
    // 遍历obj对象下所有fieldRules下的所有字段，如果command为空就
    const allLevelDataArray = getAllLevelData(obj);
    allLevelDataArray.forEach((item) => {
            Object.keys(item['fieldRules']).forEach((field) => {
                let key = item['fieldRules'][field][0].command;
                // console.log(`key:${key},field:${field},${typeof field}`);
                if (!key) {
                    // console.log(field=='title')
                    if (field == 'content') {
                        item['fieldRules'][field][0].command = '//div[@class="content"]';
                    } else if (field == 'title') {
                        item['fieldRules'][field][0].command = '//div[@class="title"]';
                        // console.log(item)
                    } else if (field == 'time') {
                        item['fieldRules'][field][0].command = '//div[@class="time"]';
                    } else if (field == 'reporter') {
                        item['fieldRules'][field][0].command = '//div[@class="reporter"]';
                    } else if (field == 'source') {
                        item['fieldRules'][field][0].command = 'test';
                    } else if (field == 'pic_urls') {
                        item['fieldRules'][field][0].command = '//div[@class="pic_urls"]';
                    } else if (field == 'rootSource') {
                        item['fieldRules'][field][0].command = 'test';
                    } else if (field == 'editor') {
                        item['fieldRules'][field][0].command = '//div[@class="pic_urls"]'
                    } else {
                        item['fieldRules'][field][0].command = 'test';
                        item['fieldRules'][field][0].parserName = 'APPENDER';
                        item['fieldRules'][field][0].parsingType = 'overwrite';
                    }
                }
            })
        }
    );
    let i = 0;
    while (i < allLevelDataArray.length - 1) {
        allLevelDataArray[i].next = allLevelDataArray[i + 1];
        i++;
    }
    console.log(allLevelDataArray[0])
    return allLevelDataArray[0];
}



// const getCertainLayer = (obj, layer) => {
//     layer = layer - 1;
//     let a = {"templateType":"MODULE","name":"闽财网-问答","domains":["www.mincaiwang.com.cn"],"urlPattern":"www.mincaiwang.com.cn/ask/\\d+.htm.*","identifiers":["<section class=\"alltotalsNums\">"],"foreign":0,"origin":"PC","sslProvider":"openssl","seeds":{"bases":["http://www.mincaiwang.com.cn/ask/26792.html","http://www.mincaiwang.com.cn/ask/27315.html"]},"enableCache":true,"httpMethod":"get","headers":null,"params":null,"peekReqHeaders":null,"peekResHeaders":null,"followRedirects":true,"parseError":false,"tableRules":[],"fieldRules":{"question_id":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$self.url"},{"parserName":"REGEX","parsingType":"matchFirst","command":"(?<=ask/)\\d+"}],"question_url":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$self.url"}],"question_title":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='w1200']/span[2]"}],"question_content":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='w1200 questionBody']/section[@class='ques-item']"}],"question_comment_num":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='wdContent']/section[@class='alltotalsNums']/p"},{"parserName":"REGEX","parsingType":"matchFirst","command":"\\d+(?=人已答)","attrName":""}],"question_read_num":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='wdContent']/section[@class='alltotalsNums']/p","attrName":""},{"parserName":"REGEX","parsingType":"matchFirst","command":"\\d+(?=查看)"}],"question_username":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='w1200 questionBody']/section[@class='top-ques']/span[2]"},{"parserName":"APPENDER","parsingType":"default","command":"匿名"}],"realSource":[{"parserName":"APPENDER","parsingType":"overwrite","command":"闽财网"}],"question_time":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='w1200 questionBody']/section[@class='top-ques']/p/span[3]","attrName":""},{"parserName":"TIME","parsingType":"auto","command":"yyyy MM dd HH mm ss S|yyyy MM dd HH mm ss SSS|yyyy MM dd HH mm ss|yyyy MM dd|yyyy MM dd HH mm|HH mm","attrName":""}]},"hasMsgType":false,"returnResult":true,"proxyType":"NAT","detectChineseCharset":true,"useCookieJar":false,"cleanAnchor":true,"cookieDetector":null,"next":{"isshow":true,"followRedirects":true,"httpMethod":"GET","proxyType":"NAT","tableRules":[{"parserName":"XPATH","parsingType":"htmlAll","command":"//section[@class='wdcontent-item']"}],"fieldRules":{"question_id":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_id"}],"question_url":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_url"}],"question_title":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_title"}],"question_time":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_time"}],"question_username":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_username"}],"question_content":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_content"}],"question_comment_num":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_comment_num"}],"question_read_num":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$pre.question_read_num"}],"answer_username":[{"parserName":"XPATH","parsingType":"textFirst","command":"//p[@class='username']/span[1]"},{"parserName":"APPENDER","parsingType":"default","command":"匿名"}],"answer_content":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='neirong']"}],"answer_time_text":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='userInfos']/section[@class='userInfos-left']/p[3]"},{"parserName":"REGEX","parsingType":"replaceAll","command":".{0,30}\\||\\s"}],"answer_url":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$cur.question_url","attrName":""},{"parserName":"APPENDER","parsingType":"suffix","command":"?answer_name="},{"parserName":"APPENDER","parsingType":"suffix","command":"$cur.answer_username"},{"parserName":"APPENDER","parsingType":"suffix","command":"&answer_time="},{"parserName":"APPENDER","parsingType":"suffix","command":"$cur.answer_time_text"}],"realSource":[{"parserName":"APPENDER","parsingType":"overwrite","command":"闽财网"}],"origin_url":[{"parserName":"APPENDER","parsingType":"overwrite","command":"$root.$subtemplate.url"}],"answer_time":[{"parserName":"XPATH","parsingType":"textFirst","command":"//section[@class='userInfos']/section[@class='userInfos-left']/p[3]","attrName":""},{"parserName":"REGEX","parsingType":"replaceAll","command":".{0,30}\\||\\s"},{"parserName":"TIME","parsingType":"auto","command":"yyyy MM dd HH mm ss S|yyyy MM dd HH mm ss SSS|yyyy MM dd HH mm ss|yyyy MM dd|yyyy MM dd HH mm|HH mm","attrName":""}]},"returnResult":true,"hasMsgType":false,"msgType":{"c1":null,"c2":null,"c3":null,"c4":null},"seeds":{"bases":null,"firstPath":null,"pages":null,"outerParams":null,"lastPath":null},"params":null,"headers":null},"msgType":{"c1":"TEXT","c2":"QA","c3":"PGC","c4":"问答"},"discardFields":["answer_time_text"],"subType":0,"execType":"0"}
//     const allLevelDataArray = getAllLevelData(obj)
//     console.log(allLevelDataArray[layer])
// }
//
// getCertainLayer(obj, 1)