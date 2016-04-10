function requestSubstring(strBody) {
    var bodyLen = strBody.length;
    var reqLength = 140;
    if (bodyLen <= reqLength) {
        return strBody;
    }
    else {
        var strFound = false;
        var counter = 1;
        while (!strFound) {
            if (strBody[reqLength - counter] == ' ') {
                return strBody.substr(0, [reqLength - counter]);
            }
            else if (strBody[reqLength + counter] == ' ') {
                return strBody.substr(0, [reqLength + counter]);
            }
            counter += 1;
        }
        return strBody.substring(0, reqLength);
    }
}
function requestIssue(issueNum) {
    window.location = '/issue?issueNumber='+issueNum;
}