var client_id = ""; // Replace text in quotes with your API Key
var callback_uri = "http://localhost/Frontpage/login.html";
//var callback_uri = "http://www.google.com";

function parseParams (params) {
    var sycamoreAuth = Array();
    var authData = params.split("&",4);
    for (i=0; i < authData.length; i++) {
        var paramVal = authData[i].split("=",2);
        sycamoreAuth.push(paramVal[1]);
    }
    
    return sycamoreAuth;
}

function setLocalStorage(token){
    localStorage.setItem("sycamore_auth", token);
    return;
}

//#/login will always have 7 characters...ugly, ugly hack
if (window.location.hash.length == 0) {
    var path = 'https://app.sycamoreeducation.com/oauth/authorize.php?';
    var queryParams = ['client_id=' + client_id,
                       'redirect_uri=' + callback_uri,
                       'scope=general open individual',
                       'response_type=token'];
    var query = queryParams.join('&');
    var url = path + query;
    
    window.open(url,"_self");
} else {
    var rawParams = window.location.hash.substring(1);
    var oAuthData = parseParams(rawParams);

    setLocalStorage(oAuthData[0]);
  
    window.open("index.html", "_self");
}
