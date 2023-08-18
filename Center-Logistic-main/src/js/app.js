import * as functions from "./modules/functions.js";
import $ from "jquery";
import 'slick-carousel';
import AOS from 'aos';

// export for others scripts to use

functions.isWebp();

$(function () {
    let
        menuButton = $('.burger'),
        navigation = $('.nav');

    menuButton.on('click', function () {
        toggleNavigation(menuButton, navigation);
    });


    function toggleNavigation(menuButton, navigation) {
        if (window.innerWidth <= 768) {
            navigation.toggleClass('show');
            $('body').toggleClass('nav-show');
            menuButton.toggleClass('active');
        }
    }

    function closeNavigation(menuButton, navigation) {
        if (window.innerWidth <= 768) {
            navigation.removeClass('show');
            $('body').removeClass('nav-show');
            menuButton.removeClass('active');
        }
    }



    let
        header = $('.header'),
        intro = $('.intro');

    let
        headerH = header.innerHeight(),
        introH = intro.innerHeight();

    let scrollPosition = $(window).scrollTop();

    let
        currentElement = '',
        sectionsPos = [];
    setSectionsPos();


    spyScroll(scrollPosition);
    headerScroll(scrollPosition);

    $(window).on('scroll', function () {
        scrollPosition = $(window).scrollTop();

        headerScroll(scrollPosition);
        spyScroll(scrollPosition);

    });

    $(window).on('resize', function () {
        headerH = header.innerHeight();
        introH = intro.innerHeight();

        setSectionsPos();
        closeNavigation(menuButton, navigation);
    });

    $("[data-scroll]").on('click', function (e) {
        e.preventDefault();

        let scrollEl = $(this).data("scroll");
        let scrollElPos = $(scrollEl).offset().top;

        $('html, body').animate({
            scrollTop: scrollElPos - headerH
        }, 500);

        closeNavigation(menuButton, navigation);
    });


    $('[data-modal]').on('click', function (e) {
        e.preventDefault();
        let data = $(this).data('modal');

        let
            modal = $(`#${data}`),
            modalWindow = modal.find('.modal-window');

        modal.addClass('show');

        setTimeout(() => {
            modalWindow.css({
                opacity: 1,
                transform: 'scale(1)'
            });
            modal.css({
                opacity: 1
            });

            $('body').addClass('no-scroll');
        }, 1);

    });



    $('[data-close]').on('click', function (e) {
        e.preventDefault();
        let
            modal = $(this).closest('.modal'),
            modalWindow = modal.find('.modal-window');
        closeModal(modal, modalWindow);
    });

    $('.modal').on('click', function () {
        let
            modal = $(this),
            modalWindow = modal.find('.modal-window');
        closeModal(modal, modalWindow);
    });



    $('.modal-window').on('click', function (e) {
        e.stopPropagation();
    });


    function closeModal(modal, modalWindow) {
        modalWindow.css({
            opacity: 0,
            transform: 'scale(0.5)'
        });
        modal.css({
            opacity: 0
        });
        $('body').removeClass('no-scroll');

        setTimeout(() => {
            modal.removeClass('show');
        }, 200);
    }



    function headerScroll() {
        if (scrollPosition >= introH - headerH - introH * 0.1) {
            header.addClass('header--scroll');
        } else {
            header.removeClass('header--scroll');
        }
    }


    function setSectionsPos() {
        sectionsPos = [];
        let windowHeight = window.innerHeight;

        $('[data-spyScroll]').each(function (index, element) {
            // element == this
            let
                item = $(this),
                itemPos = item.offset().top - (windowHeight * 0.3);

            sectionsPos.push({
                position: itemPos,
                name: item.data('spyscroll')
            });

        });
    }

    function spyScroll(scrollPosition) {
        for (let i = 0; i < sectionsPos.length; i++) {
            const item = sectionsPos[i];

            if (scrollPosition >= item.position) {

                if (sectionsPos[i + 1] === undefined) {
                    let sectionsPosLast = sectionsPos[sectionsPos.length - 1];
                    if (sectionsPosLast.name != currentElement) {

                        $('.nav .nav__link').removeClass('active');
                        $(`[data-scroll="${sectionsPosLast.name}"]`).addClass('active');

                        currentElement = sectionsPosLast.name;

                        return;
                    }

                } else
                    if (scrollPosition < sectionsPos[i + 1].position && item.name != currentElement) {

                        $('.nav .nav__link').removeClass('active');


                        $(`[data-scroll="${item.name}"]`).addClass('active');

                        currentElement = item.name;
                        return;
                    }

            } else {
                if (scrollPosition < sectionsPos[0].position &&
                    currentElement != 'start') {
                    document.querySelectorAll('.nav .nav__link').forEach(function (item, i, arr) {
                        item.classList.remove('active');
                    });
                    currentElement = 'start';
                }
            }

        }

    }


    // Slider 
    // https://bezramok-tlt.ru/blog/posts/slick-slider-ustanovka-nastrojka-primery-i-dokumentaciya
    // https://kenwheeler.github.io/slick/


    // Intro-Slider
    let slider = $('.slider');

    $('.slider').on('init', function (slick) {
        intro.find('.loader-wrapper').remove();
    });

    slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: '700',
        lazyLoad: 'ondemand',
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    });


    $('.slider-arrows__arrow--prev').on('click', function () {
        $('.slider').slick('slickPrev');
    });

    $('.slider-arrows__arrow--next').on('click', function () {
        $('.slider').slick('slickNext');
    });

    // Reviews Slider

    $('.reviews').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: '700',
        arrows: false,
        dots: true
    });


    // AOS 

    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 700, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
});