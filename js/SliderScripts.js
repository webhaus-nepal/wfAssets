$(document).ready(function () {
    window.config = {};
    window.homeSliders = {};
    var nextSlideBgColor = '', lastSlideBgColor = '';
    function getConfigOptions(mode) {
        return {
            autoStart: false,
            auto: false,
            mode: mode,
            pause: 6000,
            pager: false,
            //minSlides: 1,
            //maxSlides: 1,
            //slideWidth: "500",
            //preloadImages: 'all',
            controls: false,
            autoControls: false,
            touchEnabled: false,
            easing: 'ease-out',
            speed: 2000,
            infiniteLoop: false
        };
    }
    function switchDirection(config, direction) {
        var c = $.extend({}, config);
        c.mode = direction;
        return c;
    }
    var bxslider1Config = {
        mode: 'vertical',
        auto: true,
        autoStart: true,
        pause: 6000,
        controls: false,
        preloadImages: 'all',
        touchEnabled: false,
        pager: true,
        infiniteLoop: true,
        onSliderLoad: function () {
            $('.sc').animate({
                opacity: 1
            }, 2000);
        },
        onSlideBefore: function (el, oldIndex, newIndex) {
            slider2.goToSlide(newIndex);
        }
    };
    var bxslider2Config = getConfigOptions('fade');
	bxslider2Config.pager = true;
	bxslider2Config.touchEnabled = true;
	bxslider2Config.preventDefaultSwipeX = false;
	bxslider2Config.preventDefaultSwipeY = true;
	bxslider2Config.swipeThreshold = 48;
    // SLIDER 3 REGION
    var bxslider3Config = getConfigOptions('vertical');
    bxslider3Config.pause = 6000;
    bxslider3Config.easing = 'ease-in-out';
    bxslider3Config.speed = 2000;
    bxslider3Config.touchEnabled = false;
    bxslider3Config.infiniteLoop = false;
	
	
	/* bxslider3Config.onSliderLoad = function(){
		console.log('news slider ready');
		$('.bxslider3 li').each(function(index, value){
			var nxtSlide = $('.bxslider3 li').eq(index+1);
			if(nxtSlide.length == 0)// no next slide
			{
				return;
			}
			var nextTitle =  $(nxtSlide).find('div.float-left h2').text();
			var nextContent = $(nxtSlide).find('div.float-left p').text();
			var previewHtml = '<div class="float-left2 nxt">'
					+ '<h2>' + nextTitle + '</h2>'
					+ '<p>' + nextContent + '</p>'
					+ '</div>';
			$(this).find('.news-parent').append(previewHtml);
		});
	} */
	
	
	
    var bxslider4Config = $.extend({}, bxslider3Config);
    bxslider4Config.pause = 2700;
    bxslider4Config.speed = 1700;
    bxslider4Config.auto = false;
    bxslider4Config.touchEnabled = false;
    var pageNo = 0;
    var busyFlag = false;
    $('#arrNext').css('opacity', '0.3');
    // handle custom events
    $('#arrPrev').on('click', function (e) {
        if (busyFlag == true) {
            return false;
        }
        e.preventDefault();
        slider3.goToNextSlide();
    });
    $('#arrNext').on('click', function (e) {
        if (busyFlag == true) {
            return false;
        }
        e.preventDefault();
        slider3.goToPrevSlide();
    });
    var bgColors = [];
    bxslider3Config.onSliderLoad = function () {
        $('ul.bxslider3>li').each(function () {
            bgColors.push($(this).css('background-color'));
        });
    };
	
	
	
	
	
	
    bxslider3Config.onSlideAfter = function (el, oldIndex, newIndex) {
        var lastSlide = $('li:eq(' + oldIndex + ')', $(this));
        $(lastSlide).css('background-color', bgColors[oldIndex]);
		
		// 1. pull the next slide upwards to show the text preview
		// 2. change the bg-color of the next slide to match current slide
		// 3. reduce the opacity of the next slide
		
		// keep backup of all changing properties
		var nextSlide = $('.bxslider3 li').eq(newIndex);
		
		
		
        busyFlag = false;
    };
	
	
	
    bxslider3Config.onSlideBefore = function (el, oldIndex, newIndex) {
        busyFlag = true;
        var lastSlide = $('li:eq(' + oldIndex + ')', $(this));
        el.animate({
            backgroundColor: bgColors[oldIndex]
        }, 300, function () {
            $(lastSlide).animate({
                backgroundColor: bgColors[newIndex]
                //color: "#fff"
            }, 2000, function () {
                $(this).css('background-color', bgColors[oldIndex]);
            });
            el.animate({
                backgroundColor: bgColors[newIndex]
            }, 2000);
            window.config.slider4.goToSlide(newIndex);
        });
    };
	
	
	
	
	
	
	
	
	
	
	
    bxslider3Config.onSlideNext = function (el, oldIndex, newIndex) {
		console.log('going to next slide');
        var pageCount = slider3.getSlideCount();
        if (pageNo < pageCount) {
            pageNo++;
            if (pageNo == (pageCount - 1)) {
                $('#arrPrev').css('opacity', '0.3');
            }
            $('#arrNext').css('opacity', '1');
        }
		
		// fade out preview text
		/* var lastSlide = $('.bxslider3 li').eq(oldIndex);
		var prevText = lastSlide.find('.float-left2');
		//prevText.hide();
		 prevText.animate({
			opacity: 0
		}, 400); */
		
    };
    bxslider3Config.onSlidePrev = function (el, oldIndex, newIndex) {
		console.log('going to previous slide');
        if (pageNo > 0) {
            pageNo--;
            if (pageNo == 0) {
                $('#arrNext').css('opacity', '0.3');
            }
            $('#arrPrev').css('opacity', '1');
        }
		
		
		// fade out preview text
		/* var lastSlide = $('.bxslider3 li').eq(oldIndex);
		var prevText = el.find('.float-left2');
		//prevText.hide();
		 prevText.animate({
			opacity: 0.6
		}, 1000); */
    };
    // SLIDER 3 REGION END
    var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        isMobile = true;


    function getDeviceSize() {
        // using media query
        if (window.matchMedia("(max-width: 39.9375em)").matches) {
            return 'small';
        } else if (window.matchMedia("(min-width: 40em) and (max-width: 63.9375em)").matches) {
            return 'medium';
        } else {
            return 'large';
        }
    }

    var deviceSize = getDeviceSize();
    
    if (deviceSize == "small") {
        bxslider3Config = switchDirection(bxslider3Config, 'horizontal');
        bxslider4Config = switchDirection(bxslider4Config, 'horizontal');
    }
    // INITIALIZE SLIDER
    window.slider1 = $('.bxslider').bxSlider(bxslider1Config);
    var slider2 = $('.bxslider2').bxSlider(bxslider2Config);
    var slider3 = $('.bxslider3').bxSlider(bxslider3Config);
    var slider4 = $('.bxslider4').bxSlider(bxslider4Config);
    window.config.slider4 = slider4;


    var lastDeviceSize = deviceSize;

    $(window).on('resize orientationchange load', function () {
        var currentDeviceSize = getDeviceSize();

        if (currentDeviceSize !== lastDeviceSize) {
            $(window).trigger('breakpoint-changed', currentDeviceSize);
            lastDeviceSize = currentDeviceSize;
        }
    });





    //WINDOW RESIZE HANDLER
    $(window).on('breakpoint-changed', function (e, breakpoint) {
        $('#arrNext').css('opacity', '0.3');
		$('#arrPrev').css('opacity', '1');
		pageNo = 0;
        if (breakpoint === 'small') {
            e.preventDefault();
            curTopSliderOrientation = 'horizontal';
            if (slider3) {
                slider3.reloadSlider(switchDirection(bxslider3Config, 'horizontal'));				
            }
            if (slider4) {
                slider4.reloadSlider(switchDirection(bxslider4Config, 'horizontal'));
            }
        }
        if (breakpoint === 'medium') {
            e.preventDefault();
            if (slider3) {
                slider3.reloadSlider(switchDirection(bxslider3Config, 'vertical'));
            }
            if (slider4) {
                slider4.reloadSlider(switchDirection(bxslider4Config, 'vertical'));
            }
        }
        if (breakpoint === 'large') {
            e.preventDefault();
            if (slider3) {
                slider3.reloadSlider(switchDirection(bxslider3Config, 'vertical'));
            }
            if (slider4) {
                slider4.reloadSlider(switchDirection(bxslider4Config, 'vertical'));
            }
        }
    });
});