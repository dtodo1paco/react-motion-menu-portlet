//var icons = ['restore','question-answer','important-devices','card-membership'];
/*
var icons = [ 'fa fa-clock-o fa-lg', 'fa fa-question-circle fa-lg',
		'fa fa-tablet fa-lg', 'fa fa-credit-card fa-lg' ]
var links = [ '/save-time', '/question-answer', '/responsive', '/pricing' ];
var mainButtonIcon = 'fa fa-paw fa-3x';
var w = 200;
var h = 400;
var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft
		: screen.left;
var dualScreenTop = window.screenTop != undefined ? window.screenTop
		: screen.top;
var width = window.innerWidth ? window.innerWidth
		: document.documentElement.clientWidth ? document.documentElement.clientWidth
				: screen.width;
var height = window.innerHeight ? window.innerHeight
		: document.documentElement.clientHeight ? document.documentElement.clientHeight
				: screen.height;
var left = ((width / 2) - (w / 2)) + dualScreenLeft;
var top = ((height / 2) - (h / 2)) + dualScreenTop;

var mainButton_X = 200;
var mainButton_Y = 200;
var background_color = '#8898A5';
var color = '#CDDC39';
renderMotionMenu('#container', icons, links, mainButtonIcon, mainButton_X,
		mainButton_Y, color, background_color);
*/
/*
    var childIconProps = {};
    childIconProps.icons = ['fa fa-dashboard fa-lg','face','face'];;
    childIconProps.links = ['/one','/two','/tree'];
    childIconProps.diam = 100;

    var mainIconProps = {};
    mainIconProps.icon = 'face';
    mainIconProps.diam = 150;

    // calculate the center of the screen
    var w = mainIconProps.diam;
    var h = mainIconProps.diam;
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var theleft = ((width / 2) - (w / 2)) + dualScreenLeft;
    var thetop = ((height / 2) - (h / 2)) + dualScreenTop;

	var background_color = '#8898A5';
	var color = '#CDDC39';

    mainIconProps.pos_x = theleft;
    mainIconProps.pos_y = thetop;

	renderMotionMenu('#container', mainIconProps, childIconProps, color, background_color);
	*/

function getCenterPosition(w,h) {
	var pos = {};
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    pos.left = ((width / 2) - (w / 2)) + dualScreenLeft;
    pos.top = ((height / 2) - (h / 2)) + dualScreenTop;
    return pos;
}