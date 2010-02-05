/*!
 * jquery.silverlight
 * 
 * Copyright (c) 2010 makoto_kw, http://www.makotokw.com
 * Licensed under the MIT license.
 * 
 * @author makoto_kw
 * @version @VERSION
 */
(function($) {
	var ua = navigator.userAgent.toLowerCase(),
		check = function(r){return r.test(ua);},
		isOpera = check(/opera/),
		isWebKit = check(/webkit/),
		isGecko = !isWebKit && check(/gecko/),
		isIE = !isOpera && check(/msie/),
		isWindows = check(/windows|win32/)
		;
	// default settings
	var settings = {
		silverlight: {
			data:'data:application/x-silverlight-2,',
			type:'application/x-silverlight-2',
			width:'640',
			height:'480',
			param: {
				onError: 'onSilverlightError',
				minRuntimeVersion: '3.0.40818.0',
				autoUpgrade: 'true'
			},
			content:'<a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=3.0.40818.0" style="text-decoration:none">'
			  		+'<img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style:none"/>'
					+'</a>'
		},
		window: {
			id: 'silverlightbox',
			css: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				zIndex: 100,
				textAlign: 'center',
				lineHeight: 0
			}
		},
		overlay: {
			enabled: true,
			id: 'silverlightbox_overlay',
			fadeIn: 200,
			feedOut: 400,
			css: {
				backgroundColor: '#000',
				opacity: 0.8,
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 90,
				width: '100%',
				height: '500px'
			}
		},
		events: {
			opened:null,
			closed:null
		}
	}
	
	function silverlightContent(options) {
		options = $.extend(true,{},settings.silverlight,options);
		var attr = [], content = [];
		$.each(['id','data','type','width','height'], function() {
			var k = this.toString(), v = options[k];
			if (v !== undefined) {
				attr.push(k+'="'+v.toString()+'"');
			}
		});
		$.each(options.param, function(name, value) {
			content.push('<param name="'+name+'" value="'+value+'">');
		});
		content.push(options.content);
		return '<object '+attr.join('')+'>'+content.join('')+'</object>';
	}
	function silverlightBox(options) {
		if (options == 'close') {
			close();
		}
		options = $.extend(true,{},settings,options);
		open();
		
		// private function
		function open() {
			var $window = $('#'+options.window.id);
			if ($window.length == 0) {
				$window = $('<div/>').attr({id:options.window.id}).css(options.window.css);
				$("body").append($window)
				;
			}
			var $overlay = $('#'+options.overlay.id);
			if ($overlay.length == 0) {
				$overlay = $('<div/>').attr({id:options.overlay.id})
					.css(options.overlay.css)
					.click(function(e){close();return false;})
					;
				$("body").append($overlay);
			}
			$('embed, object, select').css({'visibility':'hidden'});
			$overlay.hide().addClass("silverlightbox_overlay").fadeIn(options.overlay.fadeIn,function(){
				//$window.silverlight(options.silverlight);
				//resize();
			});
			// show silverlight immediately because silverligt has splash screen
			$window.silverlight(options.silverlight);
			resize();
			$(document).bind('keydown.silverlightbox', function(e) {
				if (e.keyCode == 27/*ESC*/) {
					close();
				}
				return true
			});
			$(window).bind('resize.silverlightbox',function() {
				resize();
			});
			if (options.events.opened) {
				options.events.opened.apply(this,[]);
			}
		}
		function close() {
			$(window).unbind('resize.silverlightbox');
			$(document).unbind('keydown.silverlightbox');
			var $overlay = $('#'+options.overlay.id), $window = $('#'+options.window.id);
			$window.remove();
			$overlay.fadeOut(options.overlay.fadeOut,function(){
				$overlay.remove();
				$('embed, object, select').css({'visibility':'visible'});
			});
			
		}
		function resize() {
			var $overlay = $('#'+options.overlay.id), $window = $('#'+options.window.id);
			if ($overlay.length > 0 || $window.length > 0) {
				var aPageSize = getPageSize(), aPageScroll = getPageScroll(), aSilverlightSize = getSilverlightSize(aPageSize);
				$overlay.css({
					backgroundColor:	options.overlay.backgroundColor,
					opacity:			options.overlay.opacity,
					width:				aPageSize[0],
					height:				aPageSize[1]
				});
				$window.css({
					top:		aPageScroll[1] + ((aPageSize[3] - aSilverlightSize[1])/2) - 5,
					left:		aPageScroll[0] + ((aPageSize[2] - aSilverlightSize[0])/2) - 5,
					width:		aSilverlightSize[0] + 10,
					height:		aSilverlightSize[1] + 10
				});
				// update silverlight size
				$('object',$window).attr({width:aSilverlightSize[0],height:aSilverlightSize[1]});
			}
		}
		// getPageSize() by quirksmode.com
		function getPageSize() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {	
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
				xScroll = document.body.scrollWidth;
				yScroll = document.body.scrollHeight;
			} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				xScroll = document.body.offsetWidth;
				yScroll = document.body.offsetHeight;
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {	// all except Explorer
				windowWidth = (document.documentElement.clientWidth) ? document.documentElement.clientWidth : self.innerWidth;
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) { // other Explorers
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}	
			return [Math.min(xScroll,windowWidth),Math.max(yScroll,windowHeight),windowWidth,windowHeight]
		};
		
		// getPageScroll() by quirksmode.com
		function getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else if (document.documentElement
					&& document.documentElement.scrollTop) {
				yScroll = document.documentElement.scrollTop;
				xScroll = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
				yScroll = document.body.scrollTop;
				xScroll = document.body.scrollLeft;
			}
			return [xScroll, yScroll];
		}
		function getSilverlightSize(aPageSize) {
			var width = options.silverlight.width, height = options.silverlight.height;
			try {
				if (width.toString().indexOf('%') !== -1) {
					width = aPageSize[2] * parseInt(width) / 100;
				} else {
					width = parseInt(width);
				}
				if (height.toString().indexOf('%') !== -1) {
					height = aPageSize[3] * parseInt(height) / 100;
				} else {
					height = parseInt(height);
				}
				return [width,height];
			} catch (e) {}
			return [settings.silverlight.width,settings.silverlight.height];
		}
		return this;
	}
	
	// Extend jQuery
	$.fn.extend({
		silverlight:function(options) { // append Silverlight Content
			$(this).append($(silverlightContent(options)));
			return this;
		}
	});
	$.extend({
		silverlightContent: silverlightContent,
		silverlightBox: silverlightBox
	});
})(jQuery);