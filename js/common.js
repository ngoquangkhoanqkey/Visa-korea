$(document).on('ready', function() {
    var SkipNavigation = (function() {
        var root = $('.skip'),
            nav = $('.skip__nav'),
            isFocus;

            (function init() {
                addEvent();
            })();

            function addEvent() {
                nav.on('focusin', onFocusin);
                nav.on('focusout', onFocusout);
            }

            function onFocusin() {
                isFocus = true;
                root.addClass('-active');
            }

            function onFocusout() {
                isFocus = false;
                
                setInterval(function() {
                    if(!isFocus) root.removeClass('-active');
                }, 400);
            }
    })();
    
    var Header = (function() {
        var root = $('.header'),
            scrollTop;

        (function init() {
            addEvent();
            scrollCheck();

            setTimeout(function() {
                root.addClass('-init');
            }, 10);
        })();

        function addEvent() {
            $(window).on('scroll', onScroll);
        }

        function scrollCheck() {
            scrollTop = $(window).scrollTop();

            if (scrollTop > 0) {
                activate();
            };
        }

        function onScroll() {
            scrollTop = $(window).scrollTop();

            if (scrollTop > 0) {
                activate();
            } else {
                deactivate();
            }
        }

        function activate() {
            root.addClass('-active');
        }

        function deactivate() {
            if (!Nav.isActive() && scrollTop === 0) {
                root.removeClass('-active');
            }
        }

        return {
            activate: activate,
            deactivate: deactivate
        }
    })();

    var Nav = (function() {
        var root = $('.gnb'),
            header = $('.header'),
            folder = $('.gnb__folder'),
            link = $('.gnb__folder-name, .gnb__link'),
            button = $('.gnb__button'),
            isActive = false,
            isFocus = false;

        (function init() {
            addEvent();
        })();

        function addEvent() {
            header.on('mouseleave', close);
            root.on('focusin', '.gnb__folder-name, .gnb__link', onFocusin);
            root.on('focusout', '.gnb__folder-name, .gnb__link', onFocusout);
            root.on('click', '.gnb__folder-name', onClick);
            root.on('mouseenter', '.gnb__folder', onMouseenter);
            root.on('mouseleave', '.gnb__folder', onMouseleave);
        }

        function onFocusin() {
            isFocus = true;
            $(this).parents('.gnb__folder').addClass('-active');
        }
        
        function onFocusout() {
            isFocus = false; 
            $(this).parents('.gnb__folder').removeClass('-active');

            setTimeout(function() {
                if(!isFocus) close();
            }, 100);
        }

        function onClick(e) {
            if (!isActive) {
                open();
            } else {
                close();
            }

            e.preventDefault();
        }

        function onMouseenter() {
            $(this).addClass('-active');
        }
        
        function onMouseleave() {
            $(this).removeClass('-active');
        }

        function open() {
            isActive = true;
            Header.activate();              
            root.addClass('-active');
        }

        function close() {
            isActive = false;
            root.removeClass('-active');
            Header.deactivate();
        }

        function onToggle() {
            if (!isActive) {
                open();
                header.off('mouseleave');
            } else {
                close();
                header.on('mouseleave', close);
            }
        }

        function isActivate() {
            return isActive;
        }

        return  {
            isActive: isActivate,
            open: open,
            close: close
        }
    })();

    var Bridge = (function() {
        var root = $('.bridge'),
            isActive,
            isFocus;

        (function init() {
            addEvent();
        })();

        function addEvent() {
            root.on('mouseleave', close);
            root.on('click', '.bridge__name', toggle);
            root.on('focusin', '.bridge__name, .bridge__value', onFocusin);
            root.on('focusout', '.bridge__name, .bridge__value', onFocusout);
        }
        
        function toggle() {
            var el = $(this);

            if (!isActive) {
                isActive = true;
                $(el).parent().addClass('-active');
            } else {
                isActive = false;
                $(el).parent().removeClass('-active');
            }
        }

        function onFocusin() {
            isFocus = true;
        }

        function onFocusout() {
            isFocus = false;

            setTimeout(function() {
                if(!isFocus) close();
            }, 100);
        }

        function close() {
            isActive = false;
            $(this).removeClass('-active');
        }

        return  {
            toggle: toggle,
            close: close
        }
    })();

    var Banners = (function() {
        var root = $('.banners'),
            item = $('.banners__list > div'),
            indicator = $('.banners__indicator'),
            idx = 0,
            timer,
            interval = 4000;

        (function init() {
            item.children().css('transition', 'all .4s');

            play();
            addEvent();
        })();

        function addEvent() {
            root.on('click', '.banners__indicator', onClick);
            root.on('focusin', '.banners__indicator, .banners__button', onFocusin);
            root.on('focusout', '.banners__indicator, .banners__button', onFocusout);
        }

        function onClick(e) {
            var index = $(this).index();

            goto(index);

            e.preventDefault();
        }

        function onFocusin() {
            stop();
        }

        function onFocusout() {
            play();
        }

        function play() {
            timer = setInterval(next, interval);
        }

        function stop() {
            clearInterval(timer);
        }

        function next() {
            if(idx < item.length) {
                idx++
            } else {
                idx = 0;
            }

            draw();
        }

        function goto(number) {
            idx = number;

            draw();
        }

        function draw() {
            item.eq(idx).children().addClass('-active').parent().siblings().children().removeClass('-active');
            indicator.eq(idx).addClass('-active').siblings().removeClass('-active');
        }

        return {
            play: play,
            stop: stop,
            next: next,
            goto: goto
        }
    })();

    var travelSlide = (function() {
        var root = $('.travel-slide'),
            item = $('.travel-slide__item'),
            indicator = $('.travel-slide__indicator'),
            idx = 0,
            timer,
            interval = 4000,
            playTimer;

        (function init() {
            play();
            addEvent();

            $('.travel-slide__indicator').eq(0).addClass('-active');
            $('.travel-slide__item').eq(0).addClass('-active');
        })();

        function addEvent() {
            root.on('click', '.travel-slide__indicator', onClick);
            root.on('focusin', '.travel-slide__indicator', onFocusin);
            root.on('focusout', '.travel-slide__indicator', onFocusout);
            root.on('click', '.travel-slide__prev', prev);
            root.on('click', '.travel-slide__next', next);
        }

        function onClick(e) {
            var index = $(this).index();

            goto(index);

            e.preventDefault();
        }

        function onFocusin() {
            stop();
        }

        function onFocusout() {
            play();
        }

        function play() {
            timer = setInterval(next, interval);
        }

        function stop() {
            clearInterval(timer);
        }

        function prev() {
            clearTimeout(playTimer);
            stop();

            if(idx >= 0) {
                idx--
            } else {
                idx = item.length - 2;
            }

            draw();

            playTimer = setTimeout(play, 4000);
        }

        function next() {
            clearTimeout(playTimer);
            stop();

            if(idx < item.length - 1) {
                idx++
            } else {
                idx = 0;
            }

            draw();
            playTimer = setTimeout(play, 4000);
        }

        function goto(number) {
            idx = number;

            draw();
        }

        function draw() {
            item.eq(idx).addClass('-active').siblings().removeClass('-active');
            indicator.eq(idx).addClass('-active').siblings().removeClass('-active');
        }

        return {
            play: play,
            stop: stop,
            next: next,
            goto: goto
        }
    })();

    var GuideMap = (function() {
        var root = $('.guide-map'),
            list = $('.guide-map__list'),
            prevButton = $('.guide-map__control.-prev'),
            nextButton = $('.guide-map__control.-next'),
            playButton = $('.guide-map__control.-play'),
            pauseButton = $('.guide-map__control.-pause'),
            slider;

        (function init() {
            list.slick({
                swipe: false,
                arrows: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000
            });
            addEvent();
        })();

        function addEvent() {
            prevButton.on('click', prev);
            nextButton.on('click', next);
            playButton.on('click', play);
            pauseButton.on('click', pause);
        }

        function prev() {
            pause();
            list.slick('slickPrev');
        }

        function next() {
            pause();
            list.slick('slickNext');
        }

        function play() {
            root.removeClass('-stop');
            list.slick('slickPlay');
        }

        function pause() {
            root.addClass('-stop');
            list.slick('slickPause');
        }

        return {
            prev: prev,
            next: next,
            play: play,
            pause: pause
        }
    })();

    var Top = (function() {
        var wins = $(window),
            docs = $(document),
            footer = $('.footer'),
            root = $('.top'),
            button = $('.top__button');

        (function init() {
            addEvent();
        })();

        function addEvent() {
            wins.on('scroll', onScroll);
            button.on('click', onClick);
        }

        function onScroll() {
            if ( wins.scrollTop() > 300 ) {
                root.addClass('-scrolling');
            } else {
                root.removeClass('-scrolling');
            }
            if( wins.scrollTop() >= docs.height() - wins.height() - footer.height() ) {
                button.css('marginTop', docs.height() - wins.height() - footer.height() - 50 - wins.scrollTop())
            } else {
                button.css('marginTop', 0);
            }
        }

        function onClick(e) {
            $('html, body').animate({
                scrollTop: 0
            }, 400);

            e.preventDefault();
        }
    })();

    var Headline = (function() {
        var self = $('.headline'),
            lnb = $('.lnb'),
            link = $('.lnb__link');

        (function init() {
            if (!lnb.length) {
                self.addClass('-no-lnb');
            }

            addEvent();
        })();

        function addEvent() {
            link.on('click', function() {
                $(this).parent().addClass('-active').siblings().removeClass('-active');
            });
        }
    })();

    var LNB = (function() {
        var root = $('.lnb'),
            item = $('.lnb__item');

        (function init() {
            root.addClass('-type' + item.length);
        })();
    })();

    var Theme = (function() {
        var root = $('.theme__categories'),
            item = $('.theme__category');

        (function init() {
            root.addClass('-type' + item.length);
            item.eq(0).addClass('-active');
            addEvent();
        })();

        function addEvent() {
            item.on('click', function(e) {
                $(this).addClass('-active').siblings().removeClass('-active');

                e.preventDefault();
            });
        }
    })();

    var Popup = (function() {
        var root = $('.popup'),
            close = $('.js-popup-close');
                
        (function init() {
            addEvent();
        })();

        function addEvent() {
            close.on('click', popupClose);
        }

        function popupClose() {
            $(this).parents('.popup').removeClass('-active');

            setTimeout(function () {
                $('body').removeClass('js-popup-open');
            }, 200);
        }
    })();

    var SampleTabs = (function() {
        var tabs = $('.sample__tabs'),
            tab = tabs.find('.sample__tab-link'),
            targets = tabs.next('.sample__targets'),
            target = targets.find('.sample__target');

        (function init() {    
            addEvent();
        })();

        function addEvent() {
            if (hasTarget()) {
                tabs.on('click', '.sample__tab-link', onTab);
            }
        }

        function hasTarget() {
            return tabs.next('.sample__targets').length ? true : false;
        }

        function onTab(e) {
            var tabID = $(this).attr('href');

            $(this).parent().addClass('-active').siblings().removeClass('-active');
            $(tabID).addClass('-active').siblings().removeClass('-active');

            $(tabID).find('.sample-slide__list').each(function() {
                $(this).slick('refresh');
            });

            e.preventDefault();
        }
    })();

    $('.sample-slide__list').each(function(key) {
        var slideID = 'slide-' + key;

        $(this).attr('id', slideID);

        $('#' + slideID).on('init', function(event, slick) {
            var self = this,
                pagination = document.createElement('div'),
                prevButton = document.createElement('button'),
                nextButton = document.createElement('button'),
                page = document.createElement('span'),
                current = document.createElement('span'),
                total = document.createElement('span');

            $(prevButton).attr('type','button');
            $(nextButton).attr('type','button');

            $(pagination).addClass('pagination _gap');
            $(prevButton).addClass('pagination__button -prev');
            $(nextButton).addClass('pagination__button -next');
            $(page).addClass('pagination__page');
            $(current).addClass('pagination__current');
            $(total).addClass('pagination__total');

            $(current).text(slick.currentSlide + 1);
            $(total).text(slick.slideCount);

            $(prevButton).on('click', function() {
                $(self).slick('slickPrev');
            });
            $(nextButton).on('click', function() {
                $(self).slick('slickNext');
            });

            $(page).append(current);
            $(page).append(' / ');
            $(page).append(total);
            $(pagination).append(prevButton);
            $(pagination).append(page);
            $(pagination).append(nextButton);
            $(this).parent().append(pagination);
        })
        .slick({
            arrows: false,
            swipe: false,
            adaptiveHeight: true
        })
        .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $(this).next('.pagination').find('.pagination__current').text(nextSlide + 1);
        });
    });

    /* Tabs */ 
    $('.tabs').on('click', '.tabs__tab', function(e){
        e.preventDefault();
        var idx =  $(this).index();
        $(this).addClass('-active').siblings().removeClass('-active');
        $(this).parent().next().children().eq(idx).addClass('-active').siblings().removeClass('-active');

        $('.js-more-preview').each(function(index, el) {
            var isSlideItem = $(this).children().length ? true : false;

            if (isSlideItem) {
                $(el).slick('refresh');
                $('.js-more-thumb').eq(index).slick('refresh');
            }
        });

        $('.js-room-preview').each(function(index, el) {
            $(el).slick('refresh');
            $('.js-room-thumb').eq(index).slick('refresh');
        });
    });
    
    /* 슬라이드 */
    $('.js-more-preview').each(function(key, item) {
        var isSlideItem = $(this).children().length ? true : false;
        var previewId = 'more-preview-' + key;
        var thumbId = 'more-thumb-' + key;

        if (isSlideItem) {
            $(this).attr('id', previewId);
            $('.js-more-thumb').eq(key).attr('id', thumbId);

            $('#' + previewId).slick({
                swipe: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '#' + thumbId,
                prevArrow: $(this).parent().siblings('.pagination').find('.pagination__button.-prev'),
                nextArrow: $(this).parent().siblings('.pagination').find('.pagination__button.-next')
            });

            $('#' + thumbId).on('init', function(event, slick) {
                $(this).parent().siblings('.pagination').find('.pagination__current').text(slick.currentSlide + 1);
                $(this).parent().siblings('.pagination').find('.pagination__total').text(slick.slideCount);
            })
            .slick({
                swipe: false,
                arrows: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '#' + previewId,
                focusOnSelect: true
            })
            .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                $(this).parent().siblings('.pagination').find('.pagination__current').text(nextSlide + 1);
            });
        } else {
            $(this).parents('.tab__content').find('.pagination').addClass('_hidden');
        }
    });
    
    /* 룸페이지 슬라이드 */
    $('.js-room-preview').each(function(key, item) {
        var previewId = 'room-preview-' + key;
        var thumbId = 'room-thumb-' + key;

        $(this).attr('id', previewId);
        $('.js-room-thumb').eq(key).attr('id', thumbId);

        $('#' + previewId).slick({
            swipe: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '#' + thumbId,
            nextArrow:'false',
            prevArrow:'false'
        });

        $('#' + thumbId).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '#' + previewId,
            focusOnSelect: true
        });
    });

    /* 사전예약 약관 */
    $('.terms-folder').on('click', '.terms-folder__trigger', function(e){
        $(this).parents('.terms-folder__item').toggleClass('-active');

        if ( $(this).parents('.terms-folder__item').hasClass("-active") ) {
            $(this).attr('title', 'OPEN');
        } else {
            $(this).attr('title', 'CLOSE');
        }

        e.preventDefault();
    });

    /* 아코디언 스크립트 */
    $('.accordion__list').on('click', '.accordion__btn', function(e){
        $(this).parent().toggleClass("-active").siblings().removeClass('-active');

        if ( $(this).parent().hasClass("-active") ) {
            $(this).attr('title', 'OPEN');
        } else {
            $(this).attr('title', 'CLOSE');
        }

        e.preventDefault();
    });
    
    $('.tab__content').on('click', '.js-link-image', function(e) {
        e.preventDefault();
    });

    /* =사전예약 */
    $('.book').on('click', '.time-table__link', function(e) {
        var isDone = $(this).parent().hasClass('-done');

        if ( !isDone ) {
            $('.time-table__ly').addClass('-active');
            $(this).parent().addClass('-active').siblings().removeClass('-active');
        }

        e.preventDefault();
    });
    
    $('.book').on('click', '.time-table__ly-close', function(){
        $(this).parent().removeClass('-active');
        $('.time-table__ly-item').removeClass('-active');
    });

    // 개발소스로 이전
    // $('.book').on('click', '.time-table__ly-link', function(e) {
    //     var fieldsOffset = $(this).parents('.section').next('.section').offset().top,
    //         headerHeight = $('.header').height();

    //     if ( !$(this).hasClass('-done') ) {
    //         $(this).parent().addClass('-active').siblings().removeClass('-active');

    //         $('html, body').animate({
    //             scrollTop: (fieldsOffset - headerHeight) - 20
    //         }, 400);
    //     }

    //     e.preventDefault();
    // });

    $('.link').each(function() {
        if ( $(this).attr('href') === undefined ) {
            $(this).attr('href', '#');

            $(this).on('click', function(e) {
                e.preventDefault();
            });
        }
    });
});