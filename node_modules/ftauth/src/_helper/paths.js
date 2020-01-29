let pathList, requestUrl;

exports.setPath = (paths = []) => {
    pathList = paths;
};

exports.getPath = () => {
    return pathList;
}

exports.getRequestUrl = () => {
    return requestUrl;
}

exports.setRequestUrl = (url) => {
    return requestUrl = url;
}

exports.checkPath = (url, requestMethod) =>{
    requestUrl = url;

    for(path of pathList) {
        if (path.url == requestUrl && path.method == requestMethod){ 
            return path;
        }        
    }
    return false;
}