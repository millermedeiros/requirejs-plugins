/** @license
 * RequireJS plugin for loading JSON files
 * - depends on Text plugin and it was HEAVILY "inspired" by it as well.
 * Author: Miller Medeiros
 * Version: 0.2.0 (2012/04/17)
 * Released under the MIT license
 */
define(
    [
    //>>excludeStart('excludeJSON', pragmas.excludeJSON)
       'text'
    //>>excludeEnd('excludeJSON')
    ],
    function(
    //>>excludeStart('excludeJSON', pragmas.excludeJSON)
        text
    //>>excludeEnd('excludeJSON')
    ){
    //>>excludeStart('excludeJSON', pragmas.excludeJSON)

    var CACHE_BUST_QUERY_PARAM = 'bust',
        CACHE_BUST_FLAG = '!bust',
        jsonParse = (typeof JSON !== 'undefined' && typeof JSON.parse === 'function')? JSON.parse : function(val){
            return eval('('+ val +')'); //quick and dirty
        },
        buildMap = {};

    function cacheBust(url){
        url = url.replace(CACHE_BUST_FLAG, '');
        url += (url.indexOf('?') < 0)? '?' : '&';
        return url + CACHE_BUST_QUERY_PARAM +'='+ Math.round(2147483647 * Math.random());
    }

    //>>excludeEnd('excludeJSON')
    //API
    return {

        load : function(name, req, onLoad, config) {
    //>>excludeStart('excludeJSON', pragmas.excludeJSON)
            text.get(req.toUrl(name), function(data){
                if (config.isBuild) {
                    if ( config.inlineJSON === false || name.indexOf(CACHE_BUST_QUERY_PARAM +'=') !== -1) {
                        //avoid inlining cache busted JSON or if inlineJSON:false
                        onLoad(null);
                    } else {
                        buildMap[name] = data;
                        onLoad(data);
                    }
                } else {
                    onLoad(jsonParse(data));
                }
            });
        },

        normalize : function (name, normalize) {
            //used normalize to avoid caching references to a "cache busted" request
            return (name.indexOf(CACHE_BUST_FLAG) === -1)? name : cacheBust(name);
        },

        //write method based on RequireJS official text plugin by James Burke
        //https://github.com/jrburke/requirejs/blob/master/text.js
        write : function(pluginName, moduleName, write){
            if(moduleName in buildMap){
                var content = buildMap[moduleName];
                write('define("'+ pluginName +'!'+ moduleName +'", function(){ return '+ content +';});\n');
            }
    //>>excludeEnd('excludeJSON')
        }

    };
});
