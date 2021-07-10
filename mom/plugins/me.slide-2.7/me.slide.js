/*  Simplified from the jFlow  */
/*  <jquery.js>,<me.slide.css> required  */
(function($){
window.MeSlide = {
	c: {
		slide: 'msSliderr',
		ctrl: 'msControls',
		frame: 'msFrame',
		set: 'msPhotoset',
		prev: 'msPrev',
		next: 'msNext'
	},
	slide: function(button, step){
		var MS = MeSlide;
		var $slider = $(button).parent().parent();
		var width = $slider.data('width'),
				duration = $slider.data('duration'),
				numPhotos = $slider.data('numPhotos');
		var index = ($slider.data('current')+numPhotos+step)%numPhotos;
		$slider.find('.'+MS.c.set)
				.animate({'margin-left':-width*index+'px'}, duration);
		$slider.data('current', index);
	},
	meSlide: function(options){
		/* options: width!, height!, linesPara=1, duration=500,
				colorBorder='#fc7', (pathDir='', numPhotos!, extName='.jpg') */
		var MS = MeSlide,
				$this = $(this).addClass(MS.c.slide);
		var o = options || {};
		var width = o.width, height = o.height,
				linesPara = o.linesPara || 1,
				duration = o.duration || Math.round(width*.5),
				colorBorder = o.colorBorder || '#fc7',
				pathDir = o.pathDir || '';
		// html
		var $photos, numPhotos, extName, htmlPhotos;
		if (pathDir==='') {
			$photos = $this.children();
			numPhotos = $photos.length;
			htmlPhotos = $this.html();
		} else {
			linesPara = 0;
			numPhotos = o.numPhotos;
			extName = o.extName || '.jpg';
			// add photos from the directory
			htmlPhotos = '';
			for (var i=0; i<numPhotos; i++) {
				htmlPhotos += ['<div>',
							'<img src="'+ pathDir + (i+1) + extName +'" />',
						'</div>'].join('');
			}
		}
		var htmlNew = [
			'<div class="'+MS.c.ctrl+'">',
				'<span class="'+MS.c.prev+'"></span>',
				'<span class="'+MS.c.next+'"></span>',
			'</div>',
			'<div class="'+MS.c.frame+'">',
				'<div class="'+MS.c.set+'">',
					htmlPhotos,
				'</div>',
			'</div>'
		].join('');
		$this.html(htmlNew);
		// css
		var a = Math.round(width*.05)+50;
		var h = Math.round(height*.2), s;
		h = (h>40? 40:h), s = Math.round(h*.7), p = Math.round(s*.6);
		var H = h*linesPara+20;
		var $ctrl = $this.find('.'+MS.c.ctrl).css('margin-bottom',-a*.8+'px');
		$ctrl.children().css({
			'width':a+'px','height':a+'px',
			'background-size': a+'px '+a+'px'
		});
		$this.find('.'+MS.c.frame).css({
			'width':width+'px','height':height+'px','border-color':colorBorder
		}).find('.'+MS.c.set).css({
			'width':width*numPhotos+'px'
		}).children().css({
			'width':width+'px'
		}).find('p').css({
			'height':H+'px','top':-H+'px','line-height':h+'px',
			'font-size':s+'px','padding-left':p+'px','padding-right':p+'px'
		});
		// data
		$this.data('width',width).data('duration',duration)
				.data('numPhotos',numPhotos).data('current',0);
		// event
		$ctrl.find('.'+MS.c.prev).bind('click', function(e){
			MS.slide(this, -1);
		}).parent().find('.'+MS.c.next).bind('click', function(e){
			MS.slide(this, 1);
		});
		// show at last
		$this.css('display', 'block');
	}
}
$.fn.meSlide = MeSlide.meSlide;
})(jQuery);