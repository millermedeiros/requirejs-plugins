/** @license
 * RequireJS plugin for loading Google Ajax API modules thru `google.load`
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 */
define(['propertyParser'], function (propertyParser) {

    var rParts = /^([^,]+)(?:,([^,]+))?(?:,(.+))?/;

    function parseName(name){
        var match = rParts.exec(name),
            data = {
                version : match[1] || '1'
            };
        data.settings = propertyParser.parseProperties(match[2]);
        return data;
    }

    return {
        load : function(name, req, onLoad, config){
            if (config.isBuild) {
                onLoad(null); //avoid errors on the optimizer
            } else {
                var data = parseName(name),
                    settings = data.settings;

                settings.callback = onLoad;

                req([(document.location.protocol === 'https:'? 'https' : 'http') +'://www.gstatic.com/charts/loader.js'], function(){
                    google.charts.load(data.version, settings);
                });
            }
        }
    };

});
