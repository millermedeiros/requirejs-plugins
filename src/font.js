/** @license
 * RequireJS plugin for loading web fonts using the WebFont Loader
 * Author: Miller Medeiros
 * Version: 0.1.1 (2011/11/28)
 * Released under the MIT license
 */
define(['amd-utils/queryString/decodeQuery'], function (decodeQuery) {

    var rStringArray = /^\[([^\]]+)\]$/; // match "[foo,bar]" capturing "foo,bar"

    function parseName(name) {
        var data = {},
            vendors = name.split('|'),
            n = vendors.length,
            cur;

        while (n--) {
            cur = decodeQuery(vendors[n]);
            data[ cur.vendor ] = processData(cur);
        }
        return data;
    }

    function processData(params) {
        var key, val, arrMatch;

        //used only as the key name of the object
        delete params.vendor;

        //typecast arrays
        for (key in params) {
            if (params.hasOwnProperty(key)) {
                val = params[key];
                arrMatch = typeof val === 'string'? rStringArray.exec(val) : null;
                params[key] = arrMatch? arrMatch[1].split(',') : val;
            }
        }

        return params;
    }

    // API
    return {

        //example: font!vendor=google&families=[Tangerine,Cantarell,Yanone Kaffeesatz:700]
        load : function(name, req, onLoad, config){
            if (config.isBuild) {
                onLoad(null); //avoid errors on the optimizer
            } else {
                var data = parseName(name);
                data.active = onLoad;
                data.inactive = function(){
                    onLoad(false);
                };
                req([(document.location.protocol === 'https:'? 'https' : 'http') +'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'], function(){
                    WebFont.load(data);
                });
            }
        }

    };

});
