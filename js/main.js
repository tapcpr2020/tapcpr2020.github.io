$(document).ready(function() {

	// var bgFixedY = [];

	// $('.bg-fixedjs > div').each(function(){
	// 	var postion = $(this).offset().top;
	// 	bgFixedY.push(postion);
	// 	console.log(bgFixedY);
	// })


	// $(window).scroll(function() {
	//   var scrolledY = $(window).scrollTop();
	//   for (var i = 0; i < $('.bg-fixedjs > div').length; i++) {
	//   	console.log((scrolledY)+','+ bgFixedY[i]);
	//   	$('.bg-fixedjs > div').eq(i).css('background-position', 'center ' + (((scrolledY) - (bgFixedY[i]) )) + 'px');
	//   }
	// });

	var parallax = document.getElementsByClassName('parallax');
	new simpleParallax(parallax);

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

})
