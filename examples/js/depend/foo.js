window.FOO = {};

window.FOO.msg = '';

//just to make sure jQuery did loaded before foo
window.FOO.msg += (jQuery)? '<br><b>jQuery</b> loaded before foo!!!' : '<br><b>jQuery</b> didn\'t loaded before foo :(';

window.FOO.msg += '<br><b>foo.js</b> loaded!';
