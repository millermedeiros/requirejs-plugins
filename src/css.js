/** @license
 * RequireJS plugin for loading css files`
 * Author: Itay Merchav
 * (2017/08/23)
 * Released under the MIT license
 */
define("css", function () {
    "use strict";

    var XMLHttpFactories = [
        function () {return new XMLHttpRequest()},
        function () {return new ActiveXObject("Msxml2.XMLHTTP")},
        function () {return new ActiveXObject("Msxml3.XMLHTTP")},
        function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];

    function createXMLHTTPObject () {

        var xmlHttp = false;

        for (var index = 0; index < XMLHttpFactories.length; index++) {
            try       { xmlHttp = XMLHttpFactories[index](); }
            catch (e) { continue; }
            break;
        }
        return xmlHttp;
    }

    function createLink (srcArg) {

        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = srcArg;

        head.appendChild(link);
        return link;
    }

    function sendRequest (urlArg, callbackSuccessArg, callbackErrorArg) {

        var xmlHttpObject = createXMLHTTPObject();
        if (!xmlHttpObject) return;

        xmlHttpObject.open("GET", urlArg, true);

        xmlHttpObject.onreadystatechange = function () {

            if (xmlHttpObject.readyState != 4) return;

            if (xmlHttpObject.status != 200 && xmlHttpObject.status != 304) {
                callbackErrorArg(xmlHttpObject);
            }
            else {
                callbackSuccessArg(xmlHttpObject.responseText);
            }
        };

        if (xmlHttpObject.readyState == 4) return;
        xmlHttpObject.send();
    }

    //noinspection JSUnusedLocalSymbols
    return {

        load: function (nameArg, parentRequireArg, onLoadArg, configArg) {

            function callbackSuccess (cssStreamArg) {
                //The file is here, it will be loaded as css from the cache.
                createLink(nameArg);
                onLoadArg(cssStreamArg);
            }
            function callbackError (status) {
                //Report the error
                onLoadArg.error(status);
            }
            sendRequest(nameArg, callbackSuccess, callbackError);
        }
    }
});