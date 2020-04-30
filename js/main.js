$(document).ready(function() {

	var bgFixedY = [];
	var secTopArr = [];

	function getPos() {
		$('.bg-fixedjs > div').each(function(){
			var postion = $(this).offset().top;
			bgFixedY[$(this).index()] = postion;
		})
		$('section').each(function(){
			var postion = $(this).offset().top;
			secTopArr[$(this).index()] = postion;
		})
	}

	var windowTop = 0;
	$(window).scroll(function() {
	  var scrolledY = $(window).scrollTop();
	  windowTop = scrolledY;
	  // console.log(scrolledY+','+bgFixedY[0])
	  for (var i = 0; i < $('.bg-fixedjs > div').length; i++) {
	  	$('.bg-fixedjs > div').eq(i).css('background-position', 'center ' + (((scrolledY) - (bgFixedY[i]) )) + 'px');
	  }
	});

	var winWidth = $(window).width();

	$(window).resize(function() {
		winWidth = $(window).width();

		getPos();
		getProgress();
		if (winWidth < 748) {
			$('.single-full-slider').slick('unslick');
		}else {
			$('.single-full-slider').slick('refresh');
		}
	})

	// var parallax = document.getElementsByClassName('parallax');
	// new simpleParallax(parallax);

	$('.summary').click(function(){
		$(this).parent('.details').toggleClass('active');
	})
	$('.tab').click(function(){
		$(this).parents('.tabs-list').find('.tab').removeClass('active')
		$(this).addClass('active');
		var page = $(this).attr('data-page');

		$(page).parents('.pages-list').find('.page').removeClass('active')
		$(page).toggleClass('active')
	})

	/* progress */
	var iframeBacker = $('#progBacker');
	function getBakerIframe() {
		var percent = $('#progBacker').contents().find('h1.active').html();
		if (percent) {
			console.log(percent);
		}else {
			// setTimeout(function(){
			// 	getBakerIframe();
			// }, 2000)
		}
	}
	getBakerIframe();   

	function getProgress() {
		var progComplete = $('#progressBar').data('complete');
		var compLength = 'calc(' + progComplete + '% - 2px)';
		$('.bar-wide .progress-complete').css('width', compLength);
		$('.bar-long .progress-complete').css('height', compLength);
		lightCard(progComplete);
	} 
	getProgress();

	function lightCard(progComplete) {
		var card = $('.card-purpose');
		var lightArray = [];
		card.removeClass('lighted');
		if (winWidth < 748) {
			var lightL = (Math.floor(progComplete / 100 * 6));
			for (var i = 0; i < lightL; i++) {
				card.eq(i).addClass('lighted');
			}
		}else {
			if ( progComplete > 83 ) {
				lightArray = [0, 1, 2, 3, 4, 5];
			}else if ( progComplete > 49 ) {
				lightArray = [0, 1, 3, 4];
			}else if ( progComplete > 16 ) {
				lightArray = [0, 3];
			}
			for (var i = 0; i < lightArray.length; i++) {
				card.eq(lightArray[i]).addClass('lighted');
			}
		}
		
		
	}

	/* scrollspy */
    var anchor = new Array;
    var media_arr = new Array;
    var navScroll = $('.scrollto');

    if (navScroll.length > 0){
        scrollby();
    }

    function scrollby(){
        navScroll.each(function(){
            var anchorId = $(this).attr('href');
            if (anchorId.slice(0,1) == '#') {
                anchor.push($(anchorId).offset().top);
                $(this).click(function(){
                    $('html, body').animate({
                        scrollTop: $(anchorId).offset().top
                    }, 800);
                })
            } else {

            }
        });
    }
	

	/* slider */
	$('.single-full-slider').on('init', function(event, slick){
	  	getPos();
	});
	$('.single-full-slider').slick({
		infinite: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
		    {
		      breakpoint: 748,
		      settings: "unslick"
		    }
		  ]
	})
	
	// $('.single-slider').slick({
	//     infinite: true,
	// 	dots: true,
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	mobileFirst: true,
	// 	responsive: [
	// 	    {
	// 	      breakpoint: 748,
	// 	      settings: "unslick"
	// 	    }
	// 	  ]
	// });

	/* copy link */
	$('.btn-copy-link').click(function(){
		var $temp = $("<input>");
	  	$("body").append($temp);
	  	var btn = $(this);
	  	$temp.val(btn.data('href')).select();
	  	document.execCommand("copy");
	  	$temp.remove();
	  	btn.addClass('copied');
	  	setTimeout(function(){ 
	  		btn.removeClass('copied');
	  	 }, 800);

	})

	/* gtag */
	$('.gtagbtn').click(function(){
		var gname = $(this).data('gevent');
		var gcate = $(this).data('gcate');
		var glabel = $(this).data('glabel');
		var gvalue = $(this).data('gvalue');

		console.log(gname);

		gtag('event', gname, {
		  'event_category': gcate,
		  'event_label': glabel,
		  'value': gvalue
		});
	})

	window.onbeforeunload = function () {
		var secId;
		for (var i = 0; i < secTopArr.length; i++) {
			if(windowTop >= secTopArr[i]){
				secId = $('section').eq(i).attr('id');
			}
		}
		
	    gtag('event', 'leave', {
		  'event_category': 'close',
		  'event_label': secId,
		  'value': windowTop
		});
	};

})

	
	
