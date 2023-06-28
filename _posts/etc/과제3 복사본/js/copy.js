(function () {
    gsap.registerPlugin(ScrollTrigger);

    const __vdKv = '.vd-qled-kv';
    const __vdSmart = '.vd-qled-smart';
    const __vdQuality = '.vd-qled-quality';
    const __vdSound = '.vd-qled-sound';
    // const __vdDesign = '.vd-qled-design';
    const __vdAcc = '.vd-qled-acc';
    const __vdOutro = '.vd-qled-outro';
    const __rtl = document.getElementsByTagName('html')[0].className.indexOf('rtl') > -1 ? true : false;
    let __isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    //vd common function
    const VD_COMMON = {
        ELEM: {
            __LOAD: false,
            __DELAY: 500,
            __TIMER: null,
            __EXCEPTION_TIMER: null,
            __LOAD_SCROLL_TOP: window.scrollY || window.pageYOffset,
            __LOAD_CHECK: false,
            __LAST_KNOWN_SCROLL_POSITION: 0,
            __TICKING: false,
            __WINDOW_WIDTH: window.innerWidth,
            __WINDOW_HEIGHT: window.innerHeight,
            __AFTER_RESIZE_TYPE: window.innerWidth > 767 ? 2 : 1,
            __BEFORE_RESIZE_TYPE: null,
            __FLOATING_NAV: document.querySelector('.floating-navigation'),
            __BEFORE_TIME_STAMP: 0,
            __AFTER_TIME_STAMP: 0
        },
        SET: {
            VH: function () {
                document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
            },
            // ON_SCROLL: function (__scrollTop = window.scrollY || window.pageYOffset) {
            //     const __floatingNav = VD_COMMON.ELEM.__FLOATING_NAV;
            //     if (__scrollTop >= __floatingNav.offsetHeight) {
            //         document.querySelector(`${__vdKv} .vd-info-scroll`).style.opacity = 0;
            //     } else {
            //         document.querySelector(`${__vdKv} .vd-info-scroll`).style.opacity = 1;
            //     }
            // },
            IE_SCROLL: function (__scrollTop = window.scrollY || window.pageYOffset) {
                stickybits('.vd-sticky-in', {
                    useFixed: true,
                    stuckClass: "vd-sticky-out",
                    stickyBitStickyOffset: VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight,
                });
            },
            LOW: function (__time) {
                console.log('low time : ', __time);
                // if (__time > 8) {
                //     document.getElementsByTagName('html')[0].classList.add('vd-low');
                //     [].forEach.call(document.querySelectorAll('.vd-qled-kv video'), (__kvVideoEl) => {
                //         __kvVideoEl.pause();
                //     });
                // }
            }
        },
        SCALE: {
            Y: function (__progress) {
                const __windowHeight = window.innerHeight;
                let __size = __windowHeight * __progress;
                let __calc = __windowHeight / __size;

                //if (__calc === 0) alert('error!!');

                return __calc;
            }
        },
        VIDEO: {
            PLAY: function (__el, __target, __time) {
                if (document.getElementsByTagName('html')[0].className.indexOf('vd-low') > -1) return false;

                const __videoAllEl = __el.querySelectorAll(`${__target}`);
                [].forEach.call(__videoAllEl, (__video) => {
                    if (__video.paused) {
                        __video.currentTime = __time;
                        __video.play();
                    }

                    [].forEach.call(__el.querySelectorAll('.vd-btn-control'), (__videoBtn) => {
                        if (__video.getAttribute('id').indexOf(__videoBtn.getAttribute('data-role-video')) > -1) {
                            __videoBtn.classList.remove('vd-btn-play');
                            __videoBtn.classList.add('vd-btn-pause');
                            __videoBtn.children[0].innerText = 'Pause';

                            VD_COMMON.TAGGING.VIDEO.PLAY_PAUSE_BTN(__videoBtn, 'stop');
                        }
                    });
                });
            },
            // PAUSE: function (__el, __target, __time) {
            //     if (document.getElementsByTagName('html')[0].className.indexOf('vd-low') > -1) return false;

            //     const __videoAllEl = __el.querySelectorAll(`${__target}`);
            //     [].forEach.call(__videoAllEl, (__video) => {
            //         if (!__video.paused) {
            //             __video.play().then(function () {
            //                 __video.currentTime = __time;
            //                 __video.pause();
            //             });
            //         }

            //         [].forEach.call(__el.querySelectorAll('.vd-btn-control'), (__videoBtn) => {
            //             if (__video.getAttribute('id').indexOf(__videoBtn.getAttribute('data-role-video')) > -1) {
            //                 __videoBtn.classList.remove('vd-btn-pause');
            //                 __videoBtn.classList.add('vd-btn-play');
            //                 __videoBtn.children[0].innerText = 'Play';

            //                 VD_COMMON.TAGGING.VIDEO.PLAY_PAUSE_BTN(__videoBtn, 'play');
            //             }
            //         });
            //     });
            // },
            EVENT: function () {
                const __vdVideoPlayBtn = document.querySelectorAll('.vd-btn-control');

                [].forEach.call(__vdVideoPlayBtn, (__btnEl) => {
                    __btnEl.addEventListener('click', function (e) {
                        const __mode = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 'pc' : 'mo';
                        const __el = e.target;
                        const __role = __el.getAttribute('data-role-video');
                        const __target = document.getElementById((`${__role}-${__mode}`));
                        let __tagging = __el.getAttribute('an-la');

                        if (__el.className.indexOf('vd-btn-pause') > -1) {
                            __el.classList.remove('vd-btn-pause');
                            __el.classList.add('vd-btn-play');
                            __el.children[0].innerText = 'Play';
                            __target.pause();

                            VD_COMMON.TAGGING.EVENT.PLAY_PAUSE_BTN(__el, 'stop');
                        } else {
                            __el.classList.remove('vd-btn-play');
                            __el.classList.add('vd-btn-pause');
                            __el.children[0].innerText = 'Pause';
                            __target.currentTime = 0;
                            __target.play();

                            VD_COMMON.TAGGING.EVENT.PLAY_PAUSE_BTN(__el, 'play');
                        }
                    });
                });
            }
        },
        ROUND_TWO: function (__num) {
            return +(Math.round(__num + "e+2") + "e-2");
        },
        TAGGING: {
            VIDEO: {
                PLAY_PAUSE_BTN: function (__videoBtn, __type) {
                    let __tagging = __videoBtn.getAttribute('an-la');
                    __type == 'stop' ? __tagging = __tagging.replace('stop', 'play') : __tagging = __tagging.replace('play', 'stop');
                    __videoBtn.setAttribute('an-la', __tagging);
                },
            },
            EVENT: {
                PLAY_PAUSE_BTN: function (__el, __type) {
                    let __tagging = __el.getAttribute('an-la');
                    __type == 'stop' ? __tagging = __tagging.replace('stop', 'play') : __tagging = __tagging.replace('play', 'stop');
                    __videoBtn.setAttribute('an-la', __tagging);
                },
            }
        },
        AUTOCHANGE: {
            HEIGHT: function () {
                let __stickyIn = document.querySelectorAll('.vd-sticky-copy .vd-sticky-in');

                [].forEach.call(__stickyIn, (__el) => {
                    let __stickyEnd = __el.querySelectorAll(`[class$="end"]`);
                    [].forEach.call(__stickyEnd, (__elEnd) => {
                        if ((VD_COMMON.ELEM.__WINDOW_HEIGHT - 86) - __elEnd.offsetHeight < 0) {
                            __el.style.height = `${__elEnd.offsetHeight}px`;
                        } else {
                            __el.removeAttribute('style');
                        }
                    });
                });
            },
        },
    };



    //vd acc function
    const VD_ACC = {
        ELEM: {
            __FRONT_LARGE: document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .large-img`),
            __FRONT_AFTER: document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-img`),
            __STORY01_REMOTE: document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`),
            __ACC_SCROLL_WRAP: document.querySelector(`${__vdAcc} .vd-acc-scroll`),
            __ACC_SCROLL_ITEM_LIST: document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-acc-item-list`)
        },
        REMOTE: {
            LARGE_IMG_SIZE: () => {
                return VD_ACC.ELEM.__FRONT_LARGE.offsetWidth;
            },
            SIZE: () => {
                const __size = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? VD_ACC.ELEM.__FRONT_AFTER.naturalWidth : 105;

                return __size;
            },
            START_TOP: (__n) => {
                const __screenHeight = (VD_COMMON.ELEM.__WINDOW_HEIGHT - VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight) / 2;
                const __remoteHeight = VD_ACC.ELEM.__FRONT_AFTER.naturalHeight / 2;
                const __resultTop = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? VD_COMMON.ROUND_TWO(__screenHeight - __remoteHeight) + __n : VD_ACC.ELEM.__STORY01_REMOTE.getBoundingClientRect().top - VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight;

                return __resultTop;
            },
            STORY01_BOTTOM: () => {
                const __bottom = parseInt(window.getComputedStyle(VD_ACC.ELEM.__STORY01_REMOTE).getPropertyValue('bottom'));
                const __n = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 75 : 25;

                return __bottom + __n;
            },
            LEAVE: () => {
                if (document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).className.indexOf('vd-action') === -1) {
                    document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.remove('vd-hide');
                    document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).removeAttribute('style');
                    document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.remove('vd-hide');
                    document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`).classList.remove('vd-show');
                }
            },
            SCREEN_CHANGE: () => {
                document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).style.zIndex = 5;
                document.querySelector(`${__vdAcc} .vd-qled-acc-story02`).removeAttribute('style');
                document.querySelector(`${__vdAcc} .vd-qled-acc-story02 .vd-acc-remote-wrap`).classList.remove('vd-acc-play');
            }
        },
        INNER_X: () => {
            const __itemAll = VD_ACC.ELEM.__ACC_SCROLL_ITEM_LIST.querySelectorAll('[class*="vd-acc-item0"]');
            let __x = 0;

            [].forEach.call(__itemAll, (__el, __i) => {
                if (__i === __itemAll.length - 1) __x = __el.offsetLeft;
            })

            return __rtl !== true ? -(__x) : (__x);
        }
    };

    const VD_SCROLL_TRIGGER = {
        VD_KV_SCROLL: function () {
            if (!document.querySelector(__vdKv)) return;

            const __vdKvTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: __vdKv,
                    //markers: true,
                    start: `-${VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight}px top`,
                    end: "bottom 250%",
                    scrub: 0.5,
                    invalidateOnRefresh: true
                }
            });

            __vdKvTimeline.fromTo(`${__vdKv} .vd-txt-box01`,
                {
                    y: 0,
                    autoAlpha: 1
                },
                {
                    y: -60,
                    duration: 3,
                    autoAlpha: 0
                }
            ).fromTo(`${__vdKv} .vd-txt-box02`,
                {
                    y: 60,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    duration: 3,
                    autoAlpha: 1
                }
            );
        },
        VD_SMART_SCROLL: function () {
            if (!document.querySelector(__vdSmart)) return;
            let __smartLoadCheck1 = false;
            let __smartLoadCheck2 = false;
            let __smartLoadCheck3 = false;
            let __smartLoadCheck4 = false;

            //vd-qled-smart
            const __vdSmartTimeline = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: __vdSmart,
                    //markers: true,
                    start: "top top",
                    end: "bottom 200%",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    //onLeave: () => ScrollTrigger.refresh(),
                    // pin: `${__vdSmart} .vd-sticky-in`,
                    // pinType: 'sticky',
                    // anticipatePin: 1,
                },
            });

            __vdSmartTimeline.set([`${__vdSmart} .smart-circle01 img`, `${__vdSmart} .smart-circle02 img`, `${__vdSmart} .smart-circle03 img`, `${__vdSmart} .smart-circle04 img`], {
                delay: 1.5,
                // rotate: 0.01
            }).to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(0).sequence}`, {
                ease: Back.easeInOut.config(2.5),
                x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(0).sequence - 1).x,
                y: VD_SMART.CIRCLE(0).y,
                duration: 1.2,
                scale: 0,
                autoAlpha: 0
            }, '-=0.5').to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(1).sequence}`, {
                ease: Back.easeInOut.config(2.5),
                x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(1).sequence - 1).x,
                y: VD_SMART.CIRCLE(1).y,
                duration: 1.2,
                scale: 0,
                autoAlpha: 0
            }, '-=1').to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(2).sequence}`, {
                ease: Back.easeInOut.config(2.5),
                x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(2).sequence - 1).x,
                y: VD_SMART.CIRCLE(2).y,
                duration: 1.2,
                scale: 0,
                autoAlpha: 0
            }, '-=1.1').to(`${__vdSmart} .smart-circle0${VD_SMART.CIRCLE(3).sequence}`, {
                ease: Back.easeInOut.config(2.5),
                x: VD_SMART.CIRCLE(VD_SMART.CIRCLE(3).sequence - 1).x,
                y: VD_SMART.CIRCLE(3).y,
                duration: 1.2,
                scale: 0,
                autoAlpha: 0
            }, '-=1.125').to([`${__vdSmart} .vd-qled-smart-monitor .vd-img-before .vd-img-inner`, `${__vdSmart} .vd-qled-smart-monitor .vd-img-after .vd-img-inner`], {
                delay: 0.1,
                y: 0,
                scale: 1
            }, '-=1.5').to(`${__vdSmart} .vd-qled-smart-monitor .vd-img-after`, {
                autoAlpha: 1
            }, '-=0.6').fromTo('.vd-qled-smart-story01',
                {
                    rotate: 0.01,
                    scaleY: 0
                },
                {
                    id: 'smart-story01',
                    onUpdate: function (__progress) {
                        if (__smartLoadCheck1) {
                            const __story01Element = document.querySelector(`${__vdSmart} .vd-qled-smart-story01`);
                            const __story01InnerElement = __story01Element.querySelector('.story-inner');
                            const __r = VD_COMMON.ROUND_TWO(__vdSmartTimeline.getById('smart-story01').ratio);

                            __story01Element.style.transform = `scaleY(${__r})`;
                            __story01InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        } else {
                            __smartLoadCheck1 = true;
                        }

                    },
                    // delay: 4,
                    duration: 1.5,
                    rotate: 0.01,
                    scaleY: 1
                }, '+=2'
            ).to('.vd-qled-smart-story01 .vd-smart-tit', {
                autoAlpha: 1
            }).fromTo('.vd-qled-smart-story02',
                {
                    rotate: 0.01,
                    scaleY: 0
                },
                {
                    id: 'smart-story02',
                    onUpdate: function (__progress) {
                        if (__smartLoadCheck2) {
                            const __story02Element = document.querySelector(`${__vdSmart} .vd-qled-smart-story02`);
                            const __story02InnerElement = __story02Element.querySelector('.story-inner');
                            const __r = VD_COMMON.ROUND_TWO(__vdSmartTimeline.getById('smart-story02').ratio);

                            __story02Element.style.transform = `scaleY(${__r})`;
                            __story02InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        } else {
                            __smartLoadCheck2 = true;
                        }
                    },
                    // delay: 4,
                    duration: 1.5,
                    rotate: 0.01,
                    scaleY: 1
                }, '+=3'
            ).to('.vd-qled-smart-story02 .vd-smart-tit', {
                autoAlpha: 1
            }).fromTo('.vd-qled-smart-story03',
                {
                    rotate: 0.01,
                    scaleY: 0
                },
                {
                    id: 'smart-story03',
                    onUpdate: function (__progress) {
                        if (__smartLoadCheck3) {
                            const __story03Element = document.querySelector(`${__vdSmart} .vd-qled-smart-story03`);
                            const __story03InnerElement = __story03Element.querySelector('.story-inner');
                            const __r = VD_COMMON.ROUND_TWO(__vdSmartTimeline.getById('smart-story03').ratio);

                            __story03Element.style.transform = `scaleY(${__r})`;
                            __story03InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        } else {
                            __smartLoadCheck3 = true;
                        }
                    },
                    // delay: 4,
                    duration: 1.5,
                    rotate: 0.01,
                    scaleY: 1
                }, '+=3'
            ).to('.vd-qled-smart-story03 .vd-smart-tit', {
                autoAlpha: 1
            }).fromTo('.vd-qled-smart-story04',
                {
                    rotate: 0.01,
                    scaleY: 0
                },
                {
                    id: 'smart-story04',
                    onUpdate: function (__progress) {
                        if (__smartLoadCheck4) {
                            const __story04Element = document.querySelector(`${__vdSmart} .vd-qled-smart-story04`);
                            const __story04InnerElement = __story04Element.querySelector('.story-inner');
                            const __r = VD_COMMON.ROUND_TWO(__vdSmartTimeline.getById('smart-story04').ratio);

                            __story04Element.style.transform = `scaleY(${__r})`;
                            __story04InnerElement.style.transform = `scaleY(${VD_COMMON.SCALE.Y(__r)})`;
                        } else {
                            __smartLoadCheck4 = true;
                        }
                    },
                    // delay: 4,
                    duration: 1.5,
                    rotate: 0.01,
                    scaleY: 1
                }, '+=3'
            ).to('.vd-qled-smart-story04 .vd-smart-tit', {
                autoAlpha: 1
            }).to('.vd-qled-smart-story04 .vd-qled-smart-story-end', {
                duration: 1.5,
                autoAlpha: 1
            }, '+=0.5').fromTo('.vd-qled-smart-story04 .vd-qled-smart-story-end .vd-txt-wrap',
                {
                    y: 60,
                    autoAlpha: 0
                },
                {
                    duration: 1.5,
                    y: 0,
                    autoAlpha: 1
                }
            );

            ScrollTrigger.matchMedia({
                "(min-width: 768px)": function () {
                    gsap.to('.vd-qled-smart-story04 .story-inner > .vd-txt-wrap', {
                        scrollTrigger: {
                            trigger: __vdSmart,
                            //markers: true,
                            start: '65% top',
                            end: '85% center',
                            scrub: 0.5,
                            // invalidateOnRefresh: true
                        },
                        autoAlpha: 0
                    });
                },
                "(max-width: 767px)": function () {
                    gsap.to('.vd-qled-smart-story04 .story-inner > .vd-txt-wrap', {
                        scrollTrigger: {
                            trigger: __vdSmart,
                            //markers: true,
                            start: '82.5% top',
                            end: '92.5% center',
                            scrub: 0.5,
                            // invalidateOnRefresh: true
                        },
                        autoAlpha: 0
                    });
                }
            });

        },
        VD_QUALITY_SCROLL: function () {
            if (!document.querySelector(__vdQuality)) return;

            let __videoCheck = false;
            let __vdQualityline = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: `${__vdQuality} .vd-sticky-wrap.first`,
                    //markers: true,
                    start: "top top",
                    end: "bottom 200%",
                    scrub: 0.5,
                    immediateRender: false,
                    onEnter: (__this) => {
                        VD_QUALITY.VIDEO.PLAY(`${__vdQuality} .vd-qled-quality-start .vd-video-box .vd-video-cont`, 0);

                        __this.trigger.querySelector('.vd-txt-wrap.vd-header').style.opacity = 0;
                    },
                    onEnterBack: (__this) => VD_QUALITY.VIDEO.PLAY(`${__vdQuality} .vd-qled-quality-start .vd-video-box .vd-video-cont`, 0),
                    onLeaveBack: (__this) => {
                        __this.trigger.querySelector('.vd-txt-wrap.vd-header').removeAttribute('style');
                    }
                },
            });

            ScrollTrigger.matchMedia({
                "(min-width: 768px)": function () {
                    gsap.to(`${__vdQuality} .vd-qled-quality-end .vd-desc span`, {
                        scrollTrigger: {
                            trigger: `${__vdQuality} .vd-sticky-wrap.vd-sticky-copy`,
                            //markers: true,
                            start: 'top top',
                            end: 'center bottom',
                            scrub: 0.5,
                            // onEnter:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0),
                            // onLeaveBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0)
                        },
                        autoAlpha: 1
                    });
                },
                "(max-width: 767px)": function () {
                    gsap.to(`${__vdQuality} .vd-qled-quality-end .vd-desc span`, {
                        scrollTrigger: {
                            trigger: `${__vdQuality} .vd-sticky-wrap.vd-sticky-copy`,
                            //markers: true,
                            start: 'top top',
                            end: 'center bottom',
                            scrub: 0.5,
                            // onEnter:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0),
                            // onLeaveBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdQuality} .vd-qled-quality-story03 .vd-video-cont`, 0)
                        },
                        autoAlpha: 1
                    });
                }
            });
        },
        VD_SOUND_SCROLL: function () {
            if (!document.querySelector(__vdSound)) return;

            let __vdSoundTimeline = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: `${__vdSound} .vd-sticky-wrap.first`,
                    //markers: true,
                    start: "top top",
                    end: "bottom 200%",
                    scrub: 0.5,
                    immediateRender: false,
                    onEnter: (__this) => {
                        VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0);
                        __this.trigger.querySelector('.vd-txt-wrap.vd-header').style.opacity = 0;
                    },
                    onEnterBack: (__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0),
                    onLeaveBack: (__this) => {
                        __this.trigger.querySelector('.vd-txt-wrap.vd-header').removeAttribute('style');
                        //VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video01 .vd-video-box .vd-video-cont`, 0);
                    }
                },
            });
 

            ScrollTrigger.matchMedia({
                "(min-width: 768px)": function () {
                    gsap.to(`${__vdSound} .vd-qled-sound-end span`, {
                        scrollTrigger: {
                            trigger: `${__vdSound} .vd-sticky-wrap.vd-sticky-copy`,
                            //markers: true,
                            start: 'top top',
                            end: 'center center',
                            scrub: 0.5,
                            // onEnter:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-cont`, 0),
                            // onLeaveBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-cont`, 0)
                        },
                        autoAlpha: 1
                    });
                },
                "(max-width: 767px)": function () {
                    gsap.to(`${__vdSound} .vd-qled-sound-end span`, {
                        scrollTrigger: {
                            trigger: `${__vdSound} .vd-sticky-wrap.vd-sticky-copy`,
                            //markers: true,
                            start: 'top top',
                            end: 'center center',
                            scrub: 0.5,
                            // onEnter:(__this) => VD_COMMON.VIDEO.PAUSE(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-cont`, 0),
                            // onLeaveBack:(__this) => VD_COMMON.VIDEO.PLAY(__this.trigger, `${__vdSound} .vd-qled-sound-video02 .vd-video-cont`, 0)
                        },
                        autoAlpha: 1
                    });
                }
            });
        },
        
        VD_ACC_SCROLL: {
            STORY: function () {
                gsap.to(`${__vdAcc} .vd-qled-acc-start .vd-txt-wrap.vd-header`, {
                    scrollTrigger: {
                        trigger: __vdAcc,
                        //markers: true,
                        start: '5% top',
                        end: '10% center',
                        scrub: 0.5,
                    },
                    autoAlpha: 0
                });

                let __vdAccTimeline = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                        id: 'vd-acc-remote',
                        trigger: `${__vdAcc} .vd-remote`,
                        //markers: true,
                        start: "top top",
                        end: "bottom 125%",
                        scrub: 0.5,
                        // invalidateOnRefresh: true,
                        //onLeave: () => ScrollTrigger.refresh()
                    }
                });

                __vdAccTimeline.to(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`, {
                    duration: 2,
                    top: 0
                }).to(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .vd-remote-img`, {
                    id: 'remote-box1',
                    onUpdate: () => {
                        const __el = document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .vd-remote-img`);
                        const __r = __vdAccTimeline.getById('remote-box1').ratio;
                        const __top = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? VD_ACC.REMOTE.START_TOP(75) : VD_ACC.REMOTE.START_TOP(0);

                        __el.style.top = `${__top * __r}px`;
                    },
                    duration: 2,
                    width: VD_ACC.REMOTE.SIZE()
                }, '-=2').to([`${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box`, `${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box img`], {
                    id: 'remote-change',
                    onStart: () => {
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-back-img`).style.zIndex = 5
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .original-back-img`).classList.remove('vd-hide');
                    },
                    onComplete: function () {
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.remove('vd-show');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box`).classList.add('vd-hide');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).style.zIndex = 5;
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.add('vd-action');
                        // document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`).classList.add('vd-show');
                        document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`).classList.add('vd-hide');
                    },
                    onUpdate: function (__update) {
                        const __imgBoxHeight = document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box`).offsetHeight;
                        let __r = __vdAccTimeline.getById('remote-change').ratio == 0 ? 0.001 : __vdAccTimeline.getById('remote-change').ratio;
                        let __result = __imgBoxHeight * __r;
                        __result = __imgBoxHeight / __result;

                        document.querySelector(`${__vdAcc} .vd-qled-acc-start .vd-remote-box .remote-back-box img`).style.transform = `scaleY(${__result})`;
                    },
                    duration: 2,
                    scaleY: (__i, __el, __a, t) => {
                        if (__el.className.indexOf('remote-back-box') > -1) {
                            return 1 - __i;
                        }
                    }
                }).call(
                    VD_ACC.REMOTE.LEAVE
                )
                    // .set(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`, {
                    //     x: 0,
                    //     xPercent: -50
                    // }).to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`, {
                    //     id: 'vd-qled-acc-light',
                    //     onStart: () => {
                    //         //document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).style.zIndex = 5
                    //         document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.remove('vd-action');
                    //         document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`).classList.remove('vd-hide');
                    //     },
                    //     y: 0
                    // }).to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light .vd-light-on`, {
                    //     autoAlpha: 1
                    // })
                    .to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-effect figure`, {
                        onStart: () => {
                            document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).classList.remove('vd-action');
                            document.querySelector(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`).classList.remove('vd-hide');
                        },
                        duration: 1.2,
                        autoAlpha: 1
                    }).to(`${__vdAcc} .vd-remote-charge .vd-charge11`, {
                        autoAlpha: 1
                    }, '-=0.6').to(`${__vdAcc} .vd-remote-charge .vd-charge10`, {
                        autoAlpha: 1
                    }, '-=0.5').to(`${__vdAcc} .vd-remote-charge .vd-charge09`, {
                        autoAlpha: 1
                    }, '-=0.4').to(`${__vdAcc} .vd-remote-charge .vd-charge08`, {
                        autoAlpha: 1
                    }, '-=0.3').to(`${__vdAcc} .vd-remote-charge .vd-charge07`, {
                        autoAlpha: 0.5
                    }, '-=0.2').to(`${__vdAcc} .vd-remote-charge .vd-charge06`, {
                        autoAlpha: 0.2
                    }, '-=0.1').to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`, {
                        autoAlpha: 1
                    }, '-=2').to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-box`, {
                        bottom: VD_ACC.REMOTE.STORY01_BOTTOM()
                    }, '-=0.5').to(`${__vdAcc} .vd-qled-acc-story01 .vd-remote-light`, {
                        autoAlpha: 0
                    }, '-=0.5').call(
                        VD_ACC.REMOTE.SCREEN_CHANGE
                    ).to(`${__vdAcc} .vd-qled-acc-story02 [class*="vd-charge-item0"]`, {
                        onStart: () => {
                            document.querySelector(`${__vdAcc} .vd-qled-acc-story01`).removeAttribute('style');
                            document.querySelector(`${__vdAcc} .vd-qled-acc-story02`).style.zIndex = 5;
                        },
                        onUpdate: function () {
                            const __remoteWrap = document.querySelector(`${__vdAcc} .vd-qled-acc-story02 .vd-acc-remote-wrap`);
                            if (this.progress() > 0.35 && __remoteWrap.className.indexOf('vd-acc-play') === -1) __remoteWrap.classList.add('vd-acc-play');
                        },
                        duration: 1.5,
                        autoAlpha: 1
                    }).fromTo(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge07`,
                        {
                            autoAlpha: 0.5,
                        },
                        {
                            autoAlpha: 1,
                        }, '-=1'
                    ).fromTo(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge06`,
                        {
                            autoAlpha: 0.2,
                        },
                        {
                            autoAlpha: 1,
                        }, '-=0.9'
                    ).to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge05`, {
                        autoAlpha: 1,
                    }, '-=0.8').to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge04`, {
                        autoAlpha: 1,
                    }, '-=0.7').to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge03`, {
                        autoAlpha: 1,
                    }, '-=0.6').to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge02`, {
                        autoAlpha: 1,
                    }, '-=0.5').to(`${__vdAcc} .vd-qled-acc-story02 .vd-remote-charge .vd-charge01`, {
                        autoAlpha: 1,
                    }, '-=0.4');

                // .to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item04`, {
                //     duration: 1.5,
                //     autoAlpha: 1,
                //     y: 0
                // }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item02`, {
                //     duration: 1.5,
                //     autoAlpha: 1,
                //     y: 0
                // }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item05`, {
                //     duration: 1.5,
                //     autoAlpha: 1,
                //     y: 0
                // }).to(`${__vdAcc} .vd-qled-acc-story02 .vd-charge-item03`, {
                //     duration: 1.5,
                //     autoAlpha: 1,
                //     y: 0
                // })
            },
            END: function () {
                ScrollTrigger.matchMedia({
                    "(min-width: 768px)": function () {
                        const __vdAccEnd = document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-qled-acc-end`);
                        __vdAccEnd.removeAttribute('style');

                        gsap.to(`${__vdAcc} .vd-qled-acc-end .vd-desc span`, {
                            scrollTrigger: {
                                trigger: `${__vdAcc} .vd-acc-scroll`,
                                //markers: true,
                                start: "top top",
                                end: "80% center",
                                scrub: 0.5,
                                // invalidateOnRefresh: true,
                            },
                            autoAlpha: 1
                        });
                    },
                    "(max-width: 767px)": function () {
                        const __vdAccEnd = document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-qled-acc-end.vd-pc-none`);
                        const __vdAccItemList = document.querySelector(`${__vdAcc} .vd-acc-scroll .vd-acc-item-list`);
                        const __marginTop = ((VD_COMMON.ELEM.__WINDOW_HEIGHT - VD_COMMON.ELEM.__FLOATING_NAV.offsetHeight) - __vdAccItemList.offsetHeight) / 2;
                        // __vdAccEnd.style.marginTop = `-${__marginTop}px`;

                        // let __vdAccScrollTimeline = gsap.timeline({
                        //     scrollTrigger: {
                        //         id: 'vd-qled-acc-end',
                        //         trigger: `${__vdAcc} .vd-acc-scroll`,
                        //         //markers: true,
                        //         start: "100px top",
                        //         end: "bottom 150%",
                        //         scrub: 0.5,
                        //         invalidateOnRefresh: true,
                        //     }
                        // });
                        gsap.set(`${__vdAcc} .vd-acc-item-list`, { force3D: true, z: 0.1 });
                        gsap.to(`${__vdAcc} .vd-acc-item-list`, {
                            scrollTrigger: {
                                id: 'vd-qled-acc-end',
                                trigger: `${__vdAcc} .vd-acc-scroll`,
                                //markers: true,
                                start: "100px top",
                                end: "bottom 250%",
                                scrub: 0.5,
                                // invalidateOnRefresh: true,
                                //onLeave: () => ScrollTrigger.refresh()
                            },
                            duration: 10,
                            x: VD_ACC.INNER_X(),
                        });

                        gsap.to(`${__vdAcc} .vd-qled-acc-end .vd-desc span`, {
                            scrollTrigger: {
                                trigger: `${__vdAcc} .vd-acc-scroll`,
                                //markers: true,
                                start: "top top",
                                end: "bottom 250%",
                                scrub: 0.5,
                                // invalidateOnRefresh: true,
                            },
                            autoAlpha: 1
                        });
                    },
                });
            },
            init: function () {
                if (!document.querySelector(__vdAcc)) return;

                this.STORY();
                this.END();
            }
        },
        VD_OUTRO_SCROLL: function () {
            if (!document.querySelector(__vdOutro)) return;

            gsap.to(`${__vdOutro} .vd-header-big span`, {
                scrollTrigger: {
                    trigger: __vdOutro,
                    //markers: true,
                    start: '10% top',
                    end: '70% center',
                    scrub: 0.5,
                },
                delay: 1,
                x: 0
            });
        },
        init: function (__type = 'init') {
            //this.VD_KV_SCROLL();
            // this.VD_SMART_SCROLL2.init();
            this.VD_SMART_SCROLL();
            this.VD_QUALITY_SCROLL();
            // this.VD_SOUND_SCROLL();
            // if (__type === 'init') this.VD_DESIGN_SCROLL();
            // this.VD_DESIGN_SCROLL_TEXT();
            this.VD_ACC_SCROLL.init();
            this.VD_OUTRO_SCROLL();
        }
    };

    
    window.addEventListener('scroll', function (e) {
        VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION = window.scrollY || window.pageYOffset;
        if (!VD_COMMON.ELEM.__TICKING) {
            window.requestAnimationFrame(function () {
                // VD_COMMON.SET.ON_SCROLL(VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION);
                VD_COMMON.ELEM.__TICKING = false;
            });

            VD_COMMON.ELEM.__TICKING = true;
        }

        VD_COMMON.ELEM.__BEFORE_TIME_STAMP = e.timeStamp;
        if (VD_COMMON.ELEM.__BEFORE_TIME_STAMP !== VD_COMMON.ELEM.__AFTER_TIME_STAMP) {
            // console.log('VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION  : ', VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION);
            if (VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION === 0 && (VD_COMMON.ELEM.__BEFORE_TIME_STAMP - VD_COMMON.ELEM.__AFTER_TIME_STAMP) < 20) {
                console.log('scroll : ', (VD_COMMON.ELEM.__BEFORE_TIME_STAMP - VD_COMMON.ELEM.__AFTER_TIME_STAMP));

                clearTimeout(VD_COMMON.ELEM.__TIMER);
                VD_COMMON.ELEM.__TIMER = setTimeout(() => {
                    let __allTigger = ScrollTrigger.getAll();
                    for (var i = 0; i < __allTigger.length; i++) {
                        if (__allTigger[i].vars.id === 'qled-design') {
                            __allTigger[i].refresh();
                        } else {
                            __allTigger[i].kill();
                        }
                    }
                    __allTigger = null;
                    VD_COMMON.VIDEO.PAUSE(document.querySelector('.vd-wrap'), '.vd-video-cont:not([id*="vd-kv-video"])', 0);
                    VD_SCROLL_TRIGGER.init('scroll');
                }, VD_COMMON.ELEM.__DELAY);
            }

            VD_COMMON.ELEM.__AFTER_TIME_STAMP = VD_COMMON.ELEM.__BEFORE_TIME_STAMP;
        }
    });

    //resize event
    window.addEventListener("resize", function (e) {
        VD_COMMON.ELEM.__WINDOW_WIDTH = window.innerWidth;
        VD_COMMON.ELEM.__WINDOW_HEIGHT = window.innerHeight;
        VD_COMMON.ELEM.__BEFORE_RESIZE_TYPE = VD_COMMON.ELEM.__WINDOW_WIDTH > 767 ? 2 : 1;

        //set Vh
        VD_COMMON.SET.VH();

        //kv scroll down btn
        VD_KV.SCROLL_BTN();

        //text height change
        VD_COMMON.AUTOCHANGE.HEIGHT();

        //resize event refresh
        if (VD_COMMON.ELEM.__AFTER_RESIZE_TYPE !== VD_COMMON.ELEM.__BEFORE_RESIZE_TYPE) {
            VD_COMMON.ELEM.__AFTER_RESIZE_TYPE = VD_COMMON.ELEM.__BEFORE_RESIZE_TYPE;
            //console.log('resize!!!');
            clearTimeout(VD_COMMON.ELEM.__TIMER);
            VD_COMMON.ELEM.__TIMER = setTimeout(() => {
                let __allTigger = ScrollTrigger.getAll();
                for (var i = 0; i < __allTigger.length; i++) {
                    __allTigger[i].kill();
                }
                __allTigger = null;
                VD_SCROLL_TRIGGER.init();
            }, VD_COMMON.ELEM.__DELAY);

            //vd - kv video
            VD_KV.VIDEO.PLAYED();

            //circle set
            VD_SMART.SET.CIRCLE();

            //compare slider
            VD_SLIDE.init();
        } else {
            if (!__isMobile && VD_COMMON.ELEM.__LOAD) {
                clearTimeout(VD_COMMON.ELEM.__EXCEPTION_TIMER);
                VD_COMMON.ELEM.__EXCEPTION_TIMER = setTimeout(() => {
                    let __designScroll = ScrollTrigger.getById('qled-design');
                    let __accEnd = ScrollTrigger.getById('vd-qled-acc-end');

                    if (typeof __designScroll !== 'undefined') __designScroll.kill();
                    if (typeof __accEnd !== 'undefined') __accEnd.kill();

                    VD_SCROLL_TRIGGER.VD_DESIGN_SCROLL();
                    VD_SCROLL_TRIGGER.VD_ACC_SCROLL.END();
                }, VD_COMMON.ELEM.__DELAY);
            }
        }

    });

    //window load
    window.addEventListener('load', function () {
        //init 실행
        [].forEach.call(document.querySelectorAll('.vd-wrap'), (__vdEl) => {
            __vdEl.style.opacity = 1;
            __vdEl.classList.add('vd-play');
        });

        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            document.getElementsByTagName('html')[0].classList.add('ie');
            if (window.confirm("The full view of content is limited on Internet Explorer. We recommend the use of Chrome, Safari or Microsoft Edge")) {
                window.location = 'microsoft-edge:' + window.location;
            }
            VD_COMMON.SET.IE_SCROLL(VD_COMMON.ELEM.__LAST_KNOWN_SCROLL_POSITION);
            VD_SCROLL_TRIGGER.VD_KV_SCROLL();

            return false;
        }

        // VD_COMMON.VIDEO.EVENT();
        // VD_KV.SCROLL_BTN();
        // VD_SMART.SET.CIRCLE();
        VD_SCROLL_TRIGGER.init();
        // VD_SMART.ACCESSIBILITY();
        // VD_KV.VIDEO.END();
        // VD_QUALITY.VIDEO.END();
        // VD_SOUND.VIDEO.END();
        // VD_DESIGN.VIDEO.END();
        // VD_SLIDE.init();

        //text height change
        VD_COMMON.AUTOCHANGE.HEIGHT();

        VD_COMMON.ELEM.__LOAD_CHECK = true; //timeline 전용
        VD_COMMON.ELEM.__LOAD = true; //resize event 전용

        ScrollTrigger.addEventListener("refresh", function () {
            //console.log('refresh!!!');
        });
    });

})();