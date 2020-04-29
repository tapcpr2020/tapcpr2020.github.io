response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

$(document).ready(function() {

	var bgFixedY = [];

	function getBgPos() {
		$('.bg-fixedjs > div').each(function(){
			var postion = $(this).offset().top;
			bgFixedY[$(this).index()] = postion;
		})
	}


	$(window).scroll(function() {
	  var scrolledY = $(window).scrollTop();
	  // console.log(scrolledY+','+bgFixedY[0])
	  for (var i = 0; i < $('.bg-fixedjs > div').length; i++) {
	  	$('.bg-fixedjs > div').eq(i).css('background-position', 'center ' + (((scrolledY) - (bgFixedY[i]) )) + 'px');
	  }
	});

	var winWidth = $(window).width();

	$(window).resize(function() {
		winWidth = $(window).width();

		getBgPos();
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
	  	getBgPos();
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
		var name = $(this).data('gevent');
		var cate = $(this).data('gcate');
		var label = $(this).data('glabel');
		var value = $(this).data('gvalue');

		gtag('event', name, {
		  'event_category': cate,
		  'event_label': label,
		  'value': value
		});
	})

})
