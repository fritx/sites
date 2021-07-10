// background changing
$(function(){
	var num = 3, interval = 10000,
			opacFull = .3, duration = 500;
	var index = 0, $bg = $('#bg_image').css({
		'background-image':'url("images/background/'+(index+1)+'.jpg")'
	});
	var resetBackground = function() {
		$bg.animate({'opacity':0}, duration, function(){
			$bg.css({
				'background-image':'url("images/background/'+((++index%num)+1)+'.jpg")'
			}).animate({'opacity':opacFull}, duration);
		});
	}
	setInterval(resetBackground, interval);
});
// slider
$(function(){
	$('#slider>div').meSlide({
		width: 700, height: 500,
		duration: 500, colorBorder: '#fc7',
		pathDir: 'images/animals/', numPhotos: 16
	});
});
// adding classes
$(function(){
	$('#memory p').addClass('shake');
	$('#blessing p').addClass('shake');
	$('#tips li').addClass('shake');
	$('#message p').addClass('shake');
	
	$('#tree').addClass('transparent');
	$('#green').addClass('transparent');
});
// running the elements
$(function(){
	$('#wrapper').removeClass('hidden');
	var offset = 10, duration = 300;
	$('.shake').mouseenter(function(){
		var $this = $(this);
		var old = parseInt($this.css('padding-left'));
		if ($this.data('shaking')===true) return;
		$this.data('shaking', true);
		$this.animate({
			'padding-left':old+offset+'px'
		}, function(){
			$this.animate({
				'padding-left':old+'px'
			}, function(){
				$this.data('shaking', false);
			});
		});
	});
	
	var $tree = $('#tree');
	var old = parseInt($tree.css('margin-top'));
	$tree.css('margin-top', old+50+'px');
	$('#button').click(function(){
		$tree.animate({'opacity':1,'margin-top':old}, 1000, function(){
			$('#green').css('opacity', 1);
		});
	});
});