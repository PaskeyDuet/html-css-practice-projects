(function(){
	let $body = $('body');
	$('.header__menu--open').on('click', function() {
		$('.menu__body').show(500);
		$('.header__location--outer').slideUp(500);
		$('.header__menu--open').slideUp(500);
		$body.addClass('openedMenu');
	});

	$('.header__menu--close').on('click', closeMenu);

	function closeMenu(e) {
		if($body.hasClass('openedMenu')) {
			$('.menu__body').hide(500);
			$('.header__location--outer').slideDown(500);
			$('.header__menu--open').slideDown(500);
			$body.removeClass('openedMenu');
		}
	}

	document.body.addEventListener('click', function(e) {
		if($(e.target).closest('.menu').length === 0) {
			closeMenu();
		}
	});

	$('.play').on('click', function() {
		const videoId = $(this).data('src');

		$(this).addClass('play--stay');
		$(this).find('.play__video').html(`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; web-share" allowfullscreen></iframe>`);
	});

	function checkOffset(e) {
		offset = window.pageYOffset;
		let $header = $('.header');

		if (offset > 350) {
		  $('body').css('marginTop', '84px');
		  $header.addClass('header--fixed');
		} else {
		  $('body').css('marginTop', '0px');
		  $header.removeClass('header--fixed');
		}

		closeMenu();
	}

	let testimonialsNode = document.querySelector('.testimonials');
	let translateX = 0;
	let prevOffset = 0;
	let directionDown = true;

	function testimonialsMove() {
		if(window.pageYOffset > 2250 && window.pageYOffset < 6500) {
			let testimonialsRect = testimonialsNode.getBoundingClientRect();
			directionDown = window.pageYOffset > prevOffset ? true : false;
			prevOffset = window.pageYOffset;

			if(testimonialsRect.top < 750 && testimonialsRect.top > -120) {
				if(directionDown) {
					translateX = Math.max(-175, translateX -= 2);
				}
				else {
					translateX = Math.min(175, translateX += 2);
				}

				$('.testimonials__title').css({
					'transform': `translateX(${translateX}%)`
				});
			}
		}
	}

	let creativeNode = document.querySelector('.creative');
	let translatePics = {
		red: [0, 0],
		violet: [0, 0],
		blue: [0, 0],
		lightBlue: [0, 0],
		green: [0, 0],
		lightViolet: [0, 0],
		orange: [0, 0],
		darkBlue: [0, 0],
	}

	function creativeMove() {
		if(window.pageYOffset > 4000 && window.pageYOffset < 7000) {
			let creativeRect = creativeNode.getBoundingClientRect();
			directionDown = window.pageYOffset > prevOffset ? true : false;
			prevOffset = window.pageYOffset;

			if(creativeRect.top < 700 && creativeRect.top > -320) {
				if(directionDown) {
					$('.creative__picItem--red').css({
						'transform': `translate(
							${translatePics.red[0] += 0.25}%, 
							${translatePics.red[1] += 0.25}%
						)`
					});
					$('.creative__picItem--violet').css({
						'transform': `translate(
							${translatePics.violet[0] += 0.3}%, 
							${translatePics.violet[1] += 0.3}%
						)`
					});

					$('.creative__picItem--blue').css({
						'transform': `translate(
							${translatePics.blue[0] -= 0.15}%, 
							${translatePics.blue[1] += 0.15}%
						)`
					});
					$('.creative__picItem--light-blue').css({
						'transform': `translate(
							${translatePics.lightBlue[0] -= 0.1}%, 
							${translatePics.lightBlue[1] += 0.1}%
						)`
					});

					$('.creative__picItem--green').css({
						'transform': `translate(
							${translatePics.green[0] += 0.2}%, 
							${translatePics.green[1] -= 0.2}%
						)`
					});
					$('.creative__picItem--light-violet').css({
						'transform': `translate(
							${translatePics.lightViolet[0] += 0.35}%, 
							${translatePics.lightViolet[1] -= 0.35}%
						)`
					});

					$('.creative__picItem--orange').css({
						'transform': `translate(
							${translatePics.orange[0] -= 0.35}%, 
							${translatePics.orange[1] -= 0.35}%
						)`
					});
					$('.creative__picItem--dark-blue').css({
						'transform': `translate(
							${translatePics.darkBlue[0] -= 0.15}%, 
							${translatePics.darkBlue[1] -= 0.15}%
						)`
					});
				}
				else {
					$('.creative__picItem--red').css({
						'transform': `translate(
							${translatePics.red[0] -= 0.25}%, 
							${translatePics.red[1] -= 0.25}%
						)`
					});
					$('.creative__picItem--violet').css({
						'transform': `translate(
							${translatePics.violet[0] -= 0.3}%, 
							${translatePics.violet[1] -= 0.3}%
						)`
					});

					$('.creative__picItem--blue').css({
						'transform': `translate(
							${translatePics.blue[0] += 0.15}%, 
							${translatePics.blue[1] -= 0.15}%
						)`
					});
					$('.creative__picItem--light-blue').css({
						'transform': `translate(
							${translatePics.lightBlue[0] += 0.1}%, 
							${translatePics.lightBlue[1] -= 0.1}%
						)`
					});

					$('.creative__picItem--green').css({
						'transform': `translate(
							${translatePics.green[0] -= 0.2}%, 
							${translatePics.green[1] += 0.2}%
						)`
					});
					$('.creative__picItem--light-violet').css({
						'transform': `translate(
							${translatePics.lightViolet[0] -= 0.35}%, 
							${translatePics.lightViolet[1] += 0.35}%
						)`
					});

					$('.creative__picItem--orange').css({
						'transform': `translate(
							${translatePics.orange[0] += 0.35}%, 
							${translatePics.orange[1] += 0.35}%
						)`
					});
					$('.creative__picItem--dark-blue').css({
						'transform': `translate(
							${translatePics.darkBlue[0] += 0.15}%, 
							${translatePics.darkBlue[1] += 0.15}%
						)`
					});
				}
			}
		}
	}

	checkOffset();

	$(window).on('scroll', throttle(checkOffset, 300));
	$(window).on('scroll', throttle(testimonialsMove, 100));
	$(window).on('scroll', throttle(creativeMove, 100));

	let $links = $('.scrollTo');
	  $links.on('click', function(e) {
	    e.preventDefault();

	    let target = $(this).attr('href');
	    $('html, body').animate({
	      scrollTop: $(target).offset().top
	    }, 700);
	  });

	const $reviewSlider = $('.reviews__list');
	const reviewPrevBtn = '.reviews__control--prev';
	const reviewNextBtn = '.reviews__control--next';
	let slidesToShow = 3;

	$reviewSlider.slick({
		slidesToShow: slidesToShow,
		prevArrow: reviewPrevBtn,
		nextArrow: reviewNextBtn,
		infinite: false,
		responsive: [
		    {
		      breakpoint: 1240,
		      settings: {
		        slidesToShow: 2,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		      }
		    },
		]
	});

	let reviewScores = [];
	$('.review__score span').each(function() {
		reviewScores.push(+$(this).text());
	});

	let reviewTotal;
	
	if($('.reviews').length > 0) {
		reviewTotal = reviewScores.reduce((accumulator, currentValue) => { 
			return (accumulator + currentValue) / 2 
		});

		$('.reviews__score').text(`Rating ${reviewTotal.toFixed(1)}`);
		$('.reviews__beforeReview .reviews__starsFill').css('width', `${reviewTotal.toFixed(1)}` * 20 + '%');
	}

	$reviewSlider.on('beforeChange', function(event, { slideCount }, currentSlide, nextSlide){
		if(nextSlide === 0) {
			$(reviewPrevBtn).prop("disabled", true);
		}
		else if(nextSlide === slideCount - slidesToShow) {
			$(reviewNextBtn).prop("disabled", true);
		}
		else {
			$(reviewPrevBtn).prop("disabled", false);
			$(reviewNextBtn).prop("disabled", false);
		}

		$('.reviews__progressBar').css('width', 100 / (slideCount - slidesToShow) * nextSlide + '%');
	});

	$reviewSlider.on('breakpoint', function(event, slick, breakpoint){
	 	if(breakpoint === 1240) {
			slidesToShow = 2;
	 	}
	 	else if(breakpoint === 768) {
	 		slidesToShow = 1;
	 	}
	});

	$('.partners__list').slick({
		slidesToShow: 6,
		arrows: false,
		autoplay: true,
		responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 4,
		      }
		    },
		    {
		      breakpoint: 576,
		      settings: {
		        slidesToShow: 2,
		      }
		    },
		]
	});

	$('input[name=contact-agree]').on('change', function(e) {
		if($(this).is(':checked')) {
			$('.form__submit').attr('disabled', false);
		}
		else {
			$('.form__submit').attr('disabled', true);
		}
	});

	$submit = $('.form__submit');

	$submit.on('click', function(e) {
	    let $form = $submit.closest('.form');
	    let $inputWrap = $form.find('.form__label');

	    e.preventDefault();
	    $submit.attr('disabled', true);

	    if(!$submit.hasClass('form__submit--done')) {
	    	$.ajax({
		        url: `${themeRoot}/php/contacts.php`,
		        method: 'POST',
		        data: $form.serialize(),
		        dataType: 'json',
		        timeout: 10000,
		        success: function(data) {
		            onSucess(data, $form, $inputWrap);
		        },
		        complete: function() {
		            $submit.attr('disabled', false);
		        },
		    });
	    }
	});

	function onSucess(data, $form, $label) {
		if(data.res) {
	    	$label.removeClass('form__label--wrong');
	    	$form.trigger('reset');
	    	$('label[for=contact-agree]').hide(500);

	    	$submit.addClass('form__submit--done');
	    	$submit.find('span').text('Request sent!');
	    	$submit.attr('disabled', true);
	    } else {
	       $label.attr('data-error', '').removeClass('form__label--wrong');

	        for( let name in data.errors) {
	            let target = $(`[name=${name}]`);
	            
	            if(target.length > 0){
	                target.closest($label).addClass('form__label--wrong').attr('data-error', data.errors[name]);
	            }
	        }
	    }
	}

	let date = new Date();
	let hour = date.getHours();
	let minute = date.getMinutes();

	function formatTime(time) {
		return time < 10 ? `0${time}` : `${time}`;
	}

	$('.header__location b').text(`${formatTime(hour % 12)}:${formatTime(minute)}`);
	$('.header__location span').text(hour >= 12 ? 'PM': 'AM');

	setInterval(() => {
		let currentDate = new Date();
		let currentHour = currentDate.getHours();
		let currentMinute = currentDate.getMinutes();

		if(minute < currentMinute){
			$('.header__location b').text(`${formatTime(currentHour % 12)}:${formatTime(currentMinute)}`);
			$('.header__location span').text(currentHour >= 12 ? 'PM': 'AM');

			minute = currentMinute;
		}
	}, 1000);

	function throttle(func, ms) {
		let isThrottled = false,
		savedArgs,
		savedThis;

		function wrapper() {

			if (isThrottled) { // (2)
				savedArgs = arguments;
				savedThis = this;
				return;
			}

			func.apply(this, arguments); // (1)

			isThrottled = true;

			setTimeout(function() {
				isThrottled = false; // (3)
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		}
		return wrapper;
	}
})();