//just as example of a plain JS file that isn't wrapped inside a define call
//and has dependencies.

jQuery(function($){

    $('#wrapper').append(window.FOO.msg).append('<p><b>bar.js</b> loaded!!</p>');

});
