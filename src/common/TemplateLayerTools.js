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
        allLevelDataArray[0].httpMethod = allLevelDataArray[layer].httpMethod;
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
        allLevelDataArray[layer].httpMethod = temp.httpMethod;
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


const exchangeLayerData = (obj, layer1, layer2) => {
    console.log(obj, layer1, layer2)
    if (layer1 == 1) {
        return exchangeLayerData1(obj, layer2);
    }
    return exchangeLayerData2(obj, layer1, layer2);
}

export default exchangeLayerData;
