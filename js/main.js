jQuery(document).foundation();
jQuery(document).ready(function ($) {
	
	$('.expander-items').imagelistexpander({
        prefix: "expander-"
    });
	
	
	$('.expander-item').on('click', function(){
		$('.wf-card-button',$('.expander-items')).each(function(){
			$(this).show();
		});
		if($(this).hasClass('active'))
		{
			$('.wf-card-button',$(this)).hide();
		}
		else{
			$('.wf-card-button',$(this)).show();
		}
	});
	
	
//Set default open/close settings
$('.acc_container').hide(); //Hide/close all containers
    $('.acc_expand-all').click(function(){
		var controlElement = $(this);
		/* if($(controlElement).text().toUpperCase() == 'VIEW ALL')
		{
			$(this).parent('div').find('.acc_container').slideDown('slow', function(){
				$(controlElement).text('Close');
			});
		}
		else{
			$(this).parent('div').find('.acc_container').slideUp('slow', function(){
			$(controlElement).text('View all');
			});
		} */
		var slideElement = $(this).parent('div').find('.acc_container');
		$(slideElement).slideToggle(
			'1000',
			function() {
			if($(controlElement).text().toUpperCase() == 'VIEW ALL')
			{
				$(controlElement).text('Close');
			}else{
				$(controlElement).text('View all');
			}
		
		});
    });


	// back-to-top =================================	
	$(function () {
		//back to top
		$("#scrollMe-top").click(function(){
		$('body,html').animate({scrollTop:0},1000);
		return false;
		});
		});
	
	//Slick nav ----------------------- 
	$('#menu').slicknav();
	$(".slicknav_btn").click(function(){
		$(".wf-mobileHeader").toggleClass("slicknav_black");
	});
	// imgLiquidFill -----------------------		
	$(".imgLiquidFill").imgLiquid({ fill: true });
	$(".imgLiquidNoFill").imgLiquid({ fill: false });


    // Scroll to selected elements -------------
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });
	
	
	//Keep underline for parent menu items
	$('li.trigger.nav-parent').on('mouseover', function () {
        $('#menu-section .active').removeClass('active');
        $(this).addClass('active');
    })
	
	var hideBackdrop = true;

	// SLIDE DOWN ANIMATION MEGA-NAV BACKDROP
	$('li.trigger')
		.on('mouseenter', function () {
			
			//console.log('hover triggered');
			if ($('.mega-menu-active').length == 0) {
				$('.mega-menu').addClass('mega-menu-active');
				hideBackdrop = false;
			}
			$('.wf-megaHeader').addClass('append-logo');
			$('.vg-topNav').addClass('hover-state');
			$('.vg-bottomNav').addClass('hover-state');
			
		});
		
	
	//For closing menu on ipad while touching outside the menu
	$(document).on('touchstart', function (event) {
		
		if($('.wf-megaHeader').find($(event.target)).length == 0) {
			hideBackdrop = true;
		if ($('.mega-menu-active').length > 0) {
			$('.mega-menu-active').removeClass('mega-menu-active');
			$('#menu-section .active').removeClass('active');
			$('.wf-megaHeader').removeClass('append-logo');
			$('.vg-topNav').removeClass('hover-state');
			$('.vg-bottomNav').removeClass('hover-state');
		}
		}
	});	
	
	//open/close link_info_text
	/* $('.link_info_text').hide();
	$('.menu_has_info').mouseover(function () {
		
		$('.link_info_text').show();
	});
	$('.menu_has_info').mouseout(function () {
		$('.link_info_text').hide();
	}); */
	
	$('.link_info_text_About').hide();
	$('.link_info_text_BOD').hide();
	$('.link_info_text_ExecTeam').hide();
	$('.link_info_text_CorporateGov').hide();
	$('.link_info_text_Sustainability').hide();
	$('.link_info_text_History').hide();
	$('.link_info_text_NewsEvents').hide();
	$('.link_info_text_MediaAnn').hide();
	$('.link_info_text_Calendar').hide();
	
	$('.menu_has_info').mouseover(function () {
		$('.link_info_text_'+$(this).attr('menuName')).show();
	});
	$('.menu_has_info').mouseout(function () {
		$('.link_info_text_'+$(this).attr('menuName')).hide();
	});

	$('li.no-trigger').on('mouseenter', function(){
		hideBackdrop = true;
		if ($('.mega-menu-active').length > 0) {
			$('.mega-menu-active').removeClass('mega-menu-active');
			$('.hover-state').removeClass('hover-state');
			$('#menu-section .active').removeClass('active');
			$('.wf-megaHeader').removeClass('append-logo');
		}		
	});
	
	

	$('.menu-wrapper').on('mouseleave', function () {
		if (hideBackdrop == true) {
			$('.mega-menu').removeClass('mega-menu-active');
			$('#menu-section .active').removeClass('active');			
		}
		$('.wf-megaHeader').removeClass('append-logo');
		$('.vg-topNav').removeClass('hover-state');
		$('.vg-bottomNav').removeClass('hover-state');
	});


	$('.wf-megaHeader').on('mouseleave', function () {
		hideBackdrop = true;
		if ($('.mega-menu-active').length > 0) {
			$('.mega-menu-active').removeClass('mega-menu-active');
			$('#menu-section .active').removeClass('active');
			$('.wf-megaHeader').removeClass('append-logo');
		}
	});
	
	//Header Fix
	$(window).scroll(function () {
		if ($(window).scrollTop() > 5) {
			$('.wf-megaHeader').addClass('header-fix');
			$('.wf-mobileHeader').addClass('header-fix');
		} else {
			$('.wf-megaHeader').removeClass('header-fix');
			$('.wf-mobileHeader').removeClass('header-fix');
		}
	});

	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MQL = 1170;

	//primary navigation slide-in effect
	if ($(window).width() > MQL) {
		var headerHeight = $('.cd-header').height();
		$(window).on('scroll',
			{
				previousTop: 0
			},
			function () {
				var currentTop = $(window).scrollTop();
				//check if user is scrolling up
				if (currentTop < this.previousTop) {
					//if scrolling up...
					if (currentTop > 0 && $('.cd-header').hasClass('is-fixed')) {
						$('.cd-header').addClass('is-visible');
					} else {
						$('.cd-header').removeClass('is-visible is-fixed');
					}
				} else {
					//if scrolling down...
					$('.cd-header').removeClass('is-visible');
					if (currentTop > headerHeight && !$('.cd-header').hasClass('is-fixed')) $('.cd-header').addClass('is-fixed');
				}
				this.previousTop = currentTop;
			});
	}
});