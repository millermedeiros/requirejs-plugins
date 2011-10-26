/*!
 * RequireJS plugin for loading files without adding the JS extension, useful for
 * JSONP services and any other kind of resource that already contain a file
 * extension or that shouldn't have one (like dynamic scripts).
 * @author Miller Medeiros
 * @version 0.3.0 (2011/10/26)
 * Released under the WTFPL <http://sam.zoy.org/wtfpl/>
 */
define(function(){
    
    var QUERY_PARAM = 'noext';

    //API
    return {
        load : function(name, req, onLoad, config){
            var url = req.toUrl(name).replace(/\.js$/, '');
            req([url], function(mod){
                onLoad(mod);
            });
        },
        normalize : function(name, norm){
            //append query string to avoid adding .js extension
            name += (name.indexOf('?') < 0)? '?' : '&';
            return name + QUERY_PARAM +'=1';
        }

    };
});
