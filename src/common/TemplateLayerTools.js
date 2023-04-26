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


// 复制第一个模板的某一层到另一个模板的某一层（不包括第一层）
const templateChangeCopy1 = (obj1, obj2, template1Layer, template2Layer) => {
    template1Layer = template1Layer - 1;
    template2Layer = template2Layer - 1;
    const allLevelDataArray1 = getAllLevelData(obj1);
    const allLevelDataArray2 = getAllLevelData(obj2);
    const keyVal = allLevelDataArray2[template2Layer].keyVal;
    allLevelDataArray2[template2Layer] = allLevelDataArray1[template1Layer]
    allLevelDataArray2[template2Layer].keyVal = keyVal;
    let i = 0;
    while (i < allLevelDataArray2.length - 1) {
        allLevelDataArray2[i].next = allLevelDataArray2[i + 1];
        i++;
    }
    return allLevelDataArray2[0];
}


const templateChangeCopy2 = (obj1, obj2, template1Layer, template2Layer) => {
    template1Layer = template1Layer - 1;
    template2Layer = template2Layer - 1;
    const allLevelDataArray1 = getAllLevelData(obj1);
    const allLevelDataArray2 = getAllLevelData(obj2);
    if (obj['templateType'] === 'COMPLETE') {
        if (template1Layer == 1 && template2Layer !== 1) {
            allLevelDataArray2[layer].urlField = allLevelDataArray1[0].seeds.bases[0];
            allLevelDataArray2[layer].seeds.bases = [allLevelDataArray1[0].urlField];
            allLevelDataArray2[layer].params = allLevelDataArray1[0].params;
            allLevelDataArray2[layer].httpMethod = allLevelDataArray1[0].httpMethod;
            allLevelDataArray2[layer].headers = allLevelDataArray1[0].headers;
            allLevelDataArray2[layer].proxyType = allLevelDataArray1[0].proxyType;
            allLevelDataArray2[layer].peekReqHeaders = allLevelDataArray1[0].peekReqHeaders;
            allLevelDataArray2[layer].peekResHeaders = allLevelDataArray1[0].peekResHeaders;
            allLevelDataArray2[layer].followRedirects = allLevelDataArray1[0].followRedirects;
            allLevelDataArray2[layer].parseError = allLevelDataArray1[0].parseError;
            allLevelDataArray2[layer].tableRules = allLevelDataArray1[0].tableRules;
            allLevelDataArray2[layer].fieldRules = allLevelDataArray1[0].fieldRules;
            allLevelDataArray2[layer].returnResult = allLevelDataArray1[0].returnResult;
            allLevelDataArray2[layer].cookieDetector = allLevelDataArray1[0].cookieDetector;
        } else if (template1Layer !== 1 && template2Layer == 1) {
            allLevelDataArray2[0].seeds.bases = [allLevelDataArray1[layer].urlField];
            allLevelDataArray2[0].params = allLevelDataArray1[layer].params;
            allLevelDataArray2[0].httpMethod = allLevelDataArray1[layer].httpMethod;
            allLevelDataArray2[0].headers = allLevelDataArray1[layer].headers;
            allLevelDataArray2[0].proxyType = allLevelDataArray1[layer].proxyType;
            allLevelDataArray2[0].peekReqHeaders = allLevelDataArray1[layer].peekReqHeaders;
            allLevelDataArray2[0].peekResHeaders = allLevelDataArray1[layer].peekResHeaders;
            allLevelDataArray2[0].followRedirects = allLevelDataArray1[layer].followRedirects;
            allLevelDataArray2[0].parseError = allLevelDataArray1[layer].parseError;
            allLevelDataArray2[0].tableRules = allLevelDataArray1[layer].tableRules;
            allLevelDataArray2[0].fieldRules = allLevelDataArray1[layer].fieldRules;
            allLevelDataArray2[0].returnResult = allLevelDataArray1[layer].returnResult;
            // allLevelDataArray[0].cookieDetector = allLevelDataArray[layer].cookieDetector;
        }
    } else if (obj['templateType'] === 'MODULE') {
        // allLevelDataArray[0].domains[0] = [allLevelDataArray[layer].urlField];
        if (template1Layer == 1 && template2Layer !== 1) {
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
        } else if (template1Layer !== 1 && template2Layer == 1) {
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
        }
    }
    let i = 0;
    while (i < allLevelDataArray.length - 1) {
        allLevelDataArray[i].next = allLevelDataArray[i + 1];
        i++;
    }
    return allLevelDataArray[0];
}

export const templateChangeCopy = (obj1, obj2, template1Layer, template2Layer) => {
    if (template1Layer !== 1 || template2Layer !== 1) {
        return templateChangeCopy1(obj1, obj2, template1Layer, template2Layer);
    }
    return templateChangeCopy2(obj1, obj2, template1Layer, template2Layer);
}
