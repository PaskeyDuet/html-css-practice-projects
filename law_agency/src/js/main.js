$(function(){
	const $slider = $('.about__slider');
	const $sliderDesc = $('.about__desc');
	const $sliderBtn = $('.about__btn');
	const $navItem = $('.about__navItem');
	let offset = window.pageYOffset;
	let clWidth = document.documentElement.clientWidth;

	$slider.slick({
		slidesToShow: 1,
		fade: true,
		prevArrow: '.about__btn--prev',
		nextArrow: '.about__btn--next',
		draggable: false,
		swipe: false,
		asNavFor: $sliderDesc
	});

	$sliderDesc.slick({
		slidesToShow: 1,
		fade: true,
		arrows: false,
		draggable: false,
		swipe: false,
		adaptiveHeight: true
	});

	$navItem.on('click', function(e) {
		let slideIndex = $(this).data('slick-dot');

		$navItem.removeClass('about__navItem--active');
		$(this).addClass('about__navItem--active');

		$slider.slick('slickGoTo', slideIndex);
	});

	$sliderBtn.on('click', function(e) {
		let slideIndex = $slider.slick('slickCurrentSlide');

		$navItem.removeClass('about__navItem--active');
		$('.about__nav').find(`[data-slick-dot="${slideIndex}"]`).addClass('about__navItem--active');
	});

	$('.navigateLink').on('click', function(e) {
		e.preventDefault();

		if(clWidth <= 480) {
			$('.nav__bar').removeClass('nav__bar--open');
        	$('.nav__body').slideUp(300).removeClass('nav__body--active');
		}

		let target = $(this).attr('href');
		
		$('html').animate({
			scrollTop: $(target).offset().top - 72
		}, 700);
	});

	$('.nav__bar').on('click', function() {
	 	$(this).toggleClass('nav__bar--open');
        $('.nav__body').slideToggle(300).toggleClass('nav__body--active');
    });

	function checkOffset() {
		offset = window.pageYOffset;
		let header = $('.header');

		if (offset > 750) {
			if(clWidth <= 1440) {
				$('body').css('marginTop', '94px');
			}

		  	header.addClass('header--fixed');
		} else {
			$('body').css('marginTop', '0px');
			header.removeClass('header--fixed');
		}
	}

	checkOffset();

	$(window).on('scroll', checkOffset); // оптимизировать

	$('.advice__btn').on('click', function(e) {
		let $submit = $(this);
		let $form = $('.advice__form');
		let $inputWrap = $('.advice__formInput');
		let $errors = $('.advice__formInput[data-error]');

		e.preventDefault();
		$submit.attr('disabled', true);

		$.ajax({
            url: `/php/advice.php`,
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            timeout: 10000,
            success: onSucess,
            error: function() {
                // $result.html('Превышено ожидание ответа от сервера...');
            },
            complete: function() {
                $submit.attr('disabled', false);
                // console.log($form.serialize());
            },
        });

        function onSucess(data) {
        	if(data.res) {
	        	$inputWrap.removeClass('form__input--wrong');
	           
	           let link = '';

		        link = 'http://advokat-egorova.com/thanks.html';

				let a = document.createElement("a");
				a.setAttribute('href', link);
				a.click();

				$inputWrap.removeClass('form__input--wrong');
				$form.trigger('reset');
	        } else {
	           $errors.attr('data-error', '');
	           $inputWrap.removeClass('form__input--wrong');

	            for( let name in data.errors) {
	                let target = $(`[name=${name}]`);
	                
	                if(target.length > 0){
	                    target.closest($errors).attr('data-error', data.errors[name]);
	                    target.parent().addClass('form__input--wrong');
	                }
	            }
	        }
        }
	});

	$('.contactsForm__btn').on('click', function(e) {
		let $submit = $(this);
		let $form = $('.contactsForm');
		let $inputWrap = $('.contactsForm__input');
		let $errors = $('.contactsForm__input[data-error]');

		e.preventDefault();
		$submit.attr('disabled', true);

		$.ajax({
            url: `/php/contacts.php`,
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            timeout: 10000,
            success: onSuccess,
            error: function() {
                // $result.html('Превышено ожидание ответа от сервера...');
            },
            complete: function() {
                $submit.attr('disabled', false);
                // console.log($form.serialize());
            },
        });

        function onSuccess(data) {
        	if(data.res) {
	        	$inputWrap.removeClass('form__input--wrong');
	           
	           let link = '';

		        link = 'http://advokat-egorova.com/thanks.html';

				let a = document.createElement("a");
				a.setAttribute('href', link);
				a.click();

				$inputWrap.removeClass('form__input--wrong');
				$form.trigger('reset');
	        } else {
	           $errors.attr('data-error', '');
	           $inputWrap.removeClass('form__input--wrong');

	            for( let name in data.errors) {
	                let target = $(`[name=${name}]`);
	                
	                if(target.length > 0){
	                    target.closest($errors).attr('data-error', data.errors[name]);
	                    target.parent().addClass('form__input--wrong');
	                }
	            }
	        }
        }
	});
});