    /* =========================================================
    LEO CAFE - SCRIPT.JS
    Text-only icon version
    Works with index.html and chocolate.html
    ========================================================= */


    /* =========================================================
    PAGE LOAD
    ========================================================= */

    document.addEventListener("DOMContentLoaded", function () {

        initializePreloader();

        initializeNavbar();

        initializeMobileMenu();

        initializeSmoothScrolling();

        initializeCoffeeSlider();

        initializeChocolateSlider();

        initializeMenuFilters();

        initializeOrderButtons();

        initializeReservation();

        initializeNotifications();

        initializeMap();

        initializeCurrentYear();

        initializeBackToTop();

        initializeScrollReveal();

        initializeVideoHandling();

        initializeKeyboardControls();

        initializeHoverPause();

        console.log("Leo Cafe website initialized successfully.");

    });



    /* =========================================================
    PRELOADER
    ========================================================= */

    function initializePreloader() {

        const preloader = document.getElementById("preloader");

        if (!preloader) {
            return;
        }

        window.addEventListener("load", function () {

            setTimeout(function () {

                preloader.classList.add("hide");

            }, 700);

        });

    }



    /* =========================================================
    NAVBAR
    ========================================================= */

    function initializeNavbar() {

        const navbar = document.querySelector(".navbar");

        if (!navbar) {
            return;
        }

        function updateNavbar() {

            if (window.scrollY > 50) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        }

        window.addEventListener("scroll", updateNavbar);

        updateNavbar();

    }



    /* =========================================================
    MOBILE MENU
    ========================================================= */

    function initializeMobileMenu() {

        const menuButton =
            document.getElementById("mobileMenuBtn");

        const navMenu =
            document.getElementById("navMenu");

        if (!menuButton || !navMenu) {
            return;
        }


        menuButton.addEventListener("click", function () {

            navMenu.classList.toggle("open");

        });


        const navLinks =
            navMenu.querySelectorAll(".nav-link");


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("open");

            });

        });


        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                navMenu.classList.remove("open");

            }

        });

    }



    /* =========================================================
    SMOOTH SCROLLING
    ========================================================= */

    function initializeSmoothScrolling() {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        links.forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    }



    /* =========================================================
    COFFEE SLIDER
    ========================================================= */

    let coffeeCurrentSlide = 0;

    let coffeeSliderTimer = null;

    let coffeeSliderPaused = false;



    function initializeCoffeeSlider() {

        const slider =
            document.getElementById("coffeeSlider");


        if (!slider) {
            return;
        }


        const slides =
            slider.querySelectorAll(".coffee-slide");


        const dots =
            document.querySelectorAll(
                "#sliderDots .dot"
            );


        const previousButton =
            document.getElementById("prevBtn");


        const nextButton =
            document.getElementById("nextBtn");


        if (!slides.length) {
            return;
        }


        function showCoffeeSlide(index) {

            if (index < 0) {

                index =
                    slides.length - 1;

            }


            if (index >= slides.length) {

                index = 0;

            }


            coffeeCurrentSlide = index;


            slides.forEach(function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === coffeeCurrentSlide
                );

            });


            dots.forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === coffeeCurrentSlide
                );

            });


            playCoffeeVideo(
                slides[coffeeCurrentSlide]
            );

        }


        function nextCoffeeSlide() {

            showCoffeeSlide(
                coffeeCurrentSlide + 1
            );

        }


        function previousCoffeeSlide() {

            showCoffeeSlide(
                coffeeCurrentSlide - 1
            );

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextCoffeeSlide();

                    restartCoffeeTimer();

                }
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousCoffeeSlide();

                    restartCoffeeTimer();

                }
            );

        }


        dots.forEach(function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    showCoffeeSlide(index);

                    restartCoffeeTimer();

                }
            );

        });


        function startCoffeeTimer() {

            clearInterval(
                coffeeSliderTimer
            );


            coffeeSliderTimer =
                setInterval(function () {

                    if (!coffeeSliderPaused) {

                        nextCoffeeSlide();

                    }

                }, 5000);

        }


        function restartCoffeeTimer() {

            startCoffeeTimer();

        }


        showCoffeeSlide(0);

        startCoffeeTimer();


        window.nextCoffeeSlide =
            nextCoffeeSlide;

        window.previousCoffeeSlide =
            previousCoffeeSlide;

    }



    /* =========================================================
    COFFEE VIDEO
    ========================================================= */

    function playCoffeeVideo(slide) {

        if (!slide) {
            return;
        }


        const videos =
            document.querySelectorAll(
                "#coffeeSlider video"
            );


        videos.forEach(function (video) {

            video.pause();

            video.currentTime = 0;

        });


        const currentVideo =
            slide.querySelector("video");


        if (!currentVideo) {
            return;
        }


        currentVideo.muted = true;


        const playPromise =
            currentVideo.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(function () {

                console.log(
                    "Coffee background video autoplay was blocked."
                );

            });

        }

    }



    /* =========================================================
    CHOCOLATE SLIDER
    ========================================================= */

    let chocolateCurrentSlide = 0;

    let chocolateSliderTimer = null;

    let chocolateSliderPaused = false;



    function initializeChocolateSlider() {

        const slider =
            document.getElementById(
                "chocolateSlider"
            );


        if (!slider) {
            return;
        }


        const slides =
            slider.querySelectorAll(
                ".chocolate-slide"
            );


        const dots =
            document.querySelectorAll(
                "#chocolateSliderDots .dot"
            );


        const previousButton =
            document.getElementById(
                "chocolatePrevBtn"
            );


        const nextButton =
            document.getElementById(
                "chocolateNextBtn"
            );


        if (!slides.length) {
            return;
        }


        function showChocolateSlide(index) {

            if (index < 0) {

                index =
                    slides.length - 1;

            }


            if (index >= slides.length) {

                index = 0;

            }


            chocolateCurrentSlide =
                index;


            slides.forEach(function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === chocolateCurrentSlide
                );

            });


            dots.forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === chocolateCurrentSlide
                );

            });


            playChocolateVideo(
                slides[chocolateCurrentSlide]
            );

        }


        function nextChocolateSlide() {

            showChocolateSlide(
                chocolateCurrentSlide + 1
            );

        }


        function previousChocolateSlide() {

            showChocolateSlide(
                chocolateCurrentSlide - 1
            );

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextChocolateSlide();

                    restartChocolateTimer();

                }
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousChocolateSlide();

                    restartChocolateTimer();

                }
            );

        }


        dots.forEach(function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    showChocolateSlide(index);

                    restartChocolateTimer();

                }
            );

        });


        function startChocolateTimer() {

            clearInterval(
                chocolateSliderTimer
            );


            chocolateSliderTimer =
                setInterval(function () {

                    if (!chocolateSliderPaused) {

                        nextChocolateSlide();

                    }

                }, 5000);

        }


        function restartChocolateTimer() {

            startChocolateTimer();

        }


        showChocolateSlide(0);

        startChocolateTimer();


        window.nextChocolateSlide =
            nextChocolateSlide;

        window.previousChocolateSlide =
            previousChocolateSlide;

    }



    /* =========================================================
    CHOCOLATE VIDEO
    ========================================================= */

    function playChocolateVideo(slide) {

        if (!slide) {
            return;
        }


        const videos =
            document.querySelectorAll(
                "#chocolateSlider video"
            );


        videos.forEach(function (video) {

            video.pause();

            video.currentTime = 0;

        });


        const currentVideo =
            slide.querySelector("video");


        if (!currentVideo) {
            return;
        }


        currentVideo.muted = true;


        const playPromise =
            currentVideo.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(function () {

                console.log(
                    "Chocolate background video autoplay was blocked."
                );

            });

        }

    }



    /* =========================================================
    MENU FILTERS
    ========================================================= */

    function initializeMenuFilters() {

        const filterButtons =
            document.querySelectorAll(
                ".filter-btn"
            );


        const menuItems =
            document.querySelectorAll(
                ".menu-item"
            );


        if (!filterButtons.length) {
            return;
        }


        if (!menuItems.length) {
            return;
        }


        filterButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const filter =
                        this.dataset.filter;


                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    menuItems.forEach(
                        function (item) {

                            const category =
                                item.dataset.category;


                            if (
                                filter === "all" ||
                                category === filter
                            ) {

                                item.classList.remove(
                                    "hidden"
                                );

                            } else {

                                item.classList.add(
                                    "hidden"
                                );

                            }

                        }
                    );

                }
            );

        });

    }



    /* =========================================================
    ORDER BUTTONS
    ========================================================= */

    function initializeOrderButtons() {

        const orderButtons =
            document.querySelectorAll(
                ".order-btn"
            );


        orderButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        this.closest(
                            ".coffee-card"
                        );


                    if (!card) {
                        return;
                    }


                    const nameElement =
                        card.querySelector(
                            "h3"
                        );


                    const priceElement =
                        card.querySelector(
                            ".coffee-bottom span"
                        );


                    const itemName =
                        nameElement
                            ? nameElement.textContent.trim()
                            : "Item";


                    const itemPrice =
                        priceElement
                            ? priceElement.textContent.trim()
                            : "";


                    showNotification(
                        "Order Added",
                        itemName +
                        " has been added to your order " +
                        itemPrice
                    );

                }
            );

        });

    }



    /* =========================================================
    RESERVATION
    ========================================================= */

    function initializeReservation() {

        const form =
            document.getElementById(
                "reservationForm"
            );


        if (!form) {
            return;
        }


        const dateInput =
            document.getElementById(
                "date"
            );


        if (dateInput) {

            const today =
                new Date();


            const year =
                today.getFullYear();


            const month =
                String(
                    today.getMonth() + 1
                ).padStart(2, "0");


            const day =
                String(
                    today.getDate()
                ).padStart(2, "0");


            dateInput.min =
                year + "-" +
                month + "-" +
                day;

        }


        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();


                const date =
                    document.getElementById(
                        "date"
                    ).value;


                const time =
                    document.getElementById(
                        "time"
                    ).value;


                const guests =
                    document.getElementById(
                        "guests"
                    ).value;


                if (!name) {

                    showNotification(
                        "Reservation",
                        "Please enter your name."
                    );

                    return;

                }


                if (!email) {

                    showNotification(
                        "Reservation",
                        "Please enter your email."
                    );

                    return;

                }


                if (!date) {

                    showNotification(
                        "Reservation",
                        "Please select a date."
                    );

                    return;

                }


                if (!time) {

                    showNotification(
                        "Reservation",
                        "Please select a time."
                    );

                    return;

                }


                if (!guests) {

                    showNotification(
                        "Reservation",
                        "Please select the number of guests."
                    );

                    return;

                }


                showNotification(
                    "Reservation Confirmed",
                    "Thank you " +
                    name +
                    ". Your table request for " +
                    guests +
                    " guest(s) has been received."
                );


                form.reset();


                if (dateInput) {

                    const today =
                        new Date();


                    const year =
                        today.getFullYear();


                    const month =
                        String(
                            today.getMonth() + 1
                        ).padStart(2, "0");


                    const day =
                        String(
                            today.getDate()
                        ).padStart(2, "0");


                    dateInput.min =
                        year + "-" +
                        month + "-" +
                        day;

                }

            }
        );

    }



    /* =========================================================
    NOTIFICATIONS
    ========================================================= */

    let notificationTimer = null;



    function initializeNotifications() {

        const closeButton =
            document.getElementById(
                "notificationClose"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    hideNotification();

                }
            );

        }

    }



    /* =========================================================
    SHOW NOTIFICATION
    ========================================================= */

    function showNotification(
        title,
        message
    ) {

        const notification =
            document.getElementById(
                "notification"
            );


        const titleElement =
            document.getElementById(
                "notificationTitle"
            );


        const messageElement =
            document.getElementById(
                "notificationMessage"
            );


        if (!notification) {
            return;
        }


        if (titleElement) {

            titleElement.textContent =
                title;

        }


        if (messageElement) {

            messageElement.textContent =
                message;

        }


        notification.classList.add(
            "show"
        );


        clearTimeout(
            notificationTimer
        );


        notificationTimer =
            setTimeout(
                function () {

                    hideNotification();

                },
                5000
            );

    }



    /* =========================================================
    HIDE NOTIFICATION
    ========================================================= */

    function hideNotification() {

        const notification =
            document.getElementById(
                "notification"
            );


        if (!notification) {
            return;
        }


        notification.classList.remove(
            "show"
        );

    }



    /* =========================================================
    GOOGLE MAP
    ========================================================= */

    function initializeMap() {

        window.openMap =
            function () {

                const mapURL =
                    "https://www.google.com/maps/search/?api=1&query=Kashmir%2C+India";


                window.open(
                    mapURL,
                    "_blank"
                );

            };

    }



    /* =========================================================
    CURRENT YEAR
    ========================================================= */

    function initializeCurrentYear() {

        const yearElement =
            document.getElementById(
                "currentYear"
            );


        if (!yearElement) {
            return;
        }


        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =========================================================
    BACK TO TOP
    ========================================================= */

    function initializeBackToTop() {

        const button =
            document.getElementById(
                "backToTop"
            );


        if (!button) {
            return;
        }


        function checkScroll() {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }


        window.addEventListener(
            "scroll",
            checkScroll
        );


        button.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        checkScroll();

    }



    /* =========================================================
    SCROLL REVEAL
    ========================================================= */

    function initializeScrollReveal() {

        const elements =
            document.querySelectorAll(
                ".coffee-card, " +
                ".about-container, " +
                ".ambiance-card, " +
                ".location-item, " +
                ".map-box, " +
                ".reservation-form, " +
                ".section-heading"
            );


        if (!elements.length) {
            return;
        }


        elements.forEach(function (element) {

            element.classList.add(
                "reveal"
            );

        });


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(function (element) {

            observer.observe(
                element
            );

        });

    }



    /* =========================================================
    VIDEO HANDLING
    ========================================================= */

    function initializeVideoHandling() {

        const videos =
            document.querySelectorAll(
                "video"
            );


        if (!videos.length) {
            return;
        }


        videos.forEach(function (video) {

            video.muted = true;

            video.playsInline = true;


            video.addEventListener(
                "loadedmetadata",
                function () {

                    if (
                        video.closest(
                            ".coffee-slide.active"
                        )
                    ) {

                        const promise =
                            video.play();


                        if (
                            promise !== undefined
                        ) {

                            promise.catch(
                                function () {}
                            );

                        }

                    }

                }
            );


            video.addEventListener(
                "error",
                function () {

                    console.warn(
                        "Video could not be loaded:",
                        video.currentSrc
                    );

                }
            );

        });


        window.addEventListener(
            "load",
            function () {

                videos.forEach(
                    function (video) {

                        if (
                            video.closest(
                                ".chocolate-hero"
                            )
                        ) {

                            video.muted = true;

                            const promise =
                                video.play();


                            if (
                                promise !== undefined
                            ) {

                                promise.catch(
                                    function () {}
                                );

                            }

                        }

                    }
                );

            }
        );

    }



    /* =========================================================
    KEYBOARD CONTROLS
    ========================================================= */

    function initializeKeyboardControls() {

        document.addEventListener(
            "keydown",
            function (event) {

                const activeElement =
                    document.activeElement;


                const isTyping =
                    activeElement &&
                    (
                        activeElement.tagName === "INPUT" ||
                        activeElement.tagName === "TEXTAREA" ||
                        activeElement.tagName === "SELECT"
                    );


                if (isTyping) {
                    return;
                }


                const chocolateSlider =
                    document.getElementById(
                        "chocolateSlider"
                    );


                const coffeeSlider =
                    document.getElementById(
                        "coffeeSlider"
                    );


                if (
                    chocolateSlider &&
                    isElementInViewport(
                        chocolateSlider
                    )
                ) {

                    if (
                        event.key === "ArrowRight"
                    ) {

                        if (
                            window.nextChocolateSlide
                        ) {

                            window.nextChocolateSlide();

                        }

                    }


                    if (
                        event.key === "ArrowLeft"
                    ) {

                        if (
                            window.previousChocolateSlide
                        ) {

                            window.previousChocolateSlide();

                        }

                    }


                    return;

                }


                if (
                    coffeeSlider &&
                    isElementInViewport(
                        coffeeSlider
                    )
                ) {

                    if (
                        event.key === "ArrowRight"
                    ) {

                        if (
                            window.nextCoffeeSlide
                        ) {

                            window.nextCoffeeSlide();

                        }

                    }


                    if (
                        event.key === "ArrowLeft"
                    ) {

                        if (
                            window.previousCoffeeSlide
                        ) {

                            window.previousCoffeeSlide();

                        }

                    }

                }

            }
        );

    }



    /* =========================================================
    VIEWPORT CHECK
    ========================================================= */

    function isElementInViewport(element) {

        const rect =
            element.getBoundingClientRect();


        return (
            rect.top <
            window.innerHeight &&
            rect.bottom > 0
        );

    }



    /* =========================================================
    HOVER PAUSE
    ========================================================= */

    function initializeHoverPause() {

        const coffeeSlider =
            document.getElementById(
                "coffeeSlider"
            );


        if (coffeeSlider) {

            coffeeSlider.addEventListener(
                "mouseenter",
                function () {

                    coffeeSliderPaused = true;

                }
            );


            coffeeSlider.addEventListener(
                "mouseleave",
                function () {

                    coffeeSliderPaused = false;

                }
            );

        }


        const chocolateSlider =
            document.getElementById(
                "chocolateSlider"
            );


        if (chocolateSlider) {

            chocolateSlider.addEventListener(
                "mouseenter",
                function () {

                    chocolateSliderPaused = true;

                }
            );


            chocolateSlider.addEventListener(
                "mouseleave",
                function () {

                    chocolateSliderPaused = false;

                }
            );

        }

    }



    /* =========================================================
    TOUCH / SWIPE SUPPORT
    ========================================================= */

    function initializeSwipeSupport() {

        let startX = 0;

        let endX = 0;


        const coffeeSlider =
            document.getElementById(
                "coffeeSlider"
            );


        if (coffeeSlider) {

            coffeeSlider.addEventListener(
                "touchstart",
                function (event) {

                    startX =
                        event.touches[0].clientX;

                },
                {
                    passive: true
                }
            );


            coffeeSlider.addEventListener(
                "touchend",
                function (event) {

                    endX =
                        event.changedTouches[0].clientX;


                    handleSwipe(
                        startX,
                        endX,
                        "coffee"
                    );

                },
                {
                    passive: true
                }
            );

        }


        const chocolateSlider =
            document.getElementById(
                "chocolateSlider"
            );


        if (chocolateSlider) {

            chocolateSlider.addEventListener(
                "touchstart",
                function (event) {

                    startX =
                        event.touches[0].clientX;

                },
                {
                    passive: true
                }
            );


            chocolateSlider.addEventListener(
                "touchend",
                function (event) {

                    endX =
                        event.changedTouches[0].clientX;


                    handleSwipe(
                        startX,
                        endX,
                        "chocolate"
                    );

                },
                {
                    passive: true
                }
            );

        }

    }



    /* =========================================================
    HANDLE SWIPE
    ========================================================= */

    function handleSwipe(
        startX,
        endX,
        sliderType
    ) {

        const difference =
            startX - endX;


        const minimumSwipe =
            50;


        if (
            Math.abs(difference) <
            minimumSwipe
        ) {

            return;

        }


        if (
            sliderType === "coffee"
        ) {

            if (
                difference > 0 &&
                window.nextCoffeeSlide
            ) {

                window.nextCoffeeSlide();

            }


            if (
                difference < 0 &&
                window.previousCoffeeSlide
            ) {

                window.previousCoffeeSlide();

            }

        }


        if (
            sliderType === "chocolate"
        ) {

            if (
                difference > 0 &&
                window.nextChocolateSlide
            ) {

                window.nextChocolateSlide();

            }


            if (
                difference < 0 &&
                window.previousChocolateSlide
            ) {

                window.previousChocolateSlide();

            }

        }

    }



    /* =========================================================
    INITIALIZE SWIPE
    ========================================================= */

    initializeSwipeSupport();



    /* =========================================================
    IMAGE ERROR HANDLING
    ========================================================= */

    document.addEventListener(
        "error",
        function (event) {

            if (
                event.target &&
                event.target.tagName === "IMG"
            ) {

                console.warn(
                    "Image could not be loaded:",
                    event.target.src
                );

            }

        },
        true
    );



    /* =========================================================
    PAGE VISIBILITY
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        function () {

            const videos =
                document.querySelectorAll(
                    "video"
                );


            if (
                document.hidden
            ) {

                videos.forEach(
                    function (video) {

                        video.pause();

                    }
                );

            } else {

                const activeCoffee =
                    document.querySelector(
                        "#coffeeSlider .coffee-slide.active"
                    );


                if (activeCoffee) {

                    playCoffeeVideo(
                        activeCoffee
                    );

                }


                const activeChocolate =
                    document.querySelector(
                        "#chocolateSlider .chocolate-slide.active"
                    );


                if (activeChocolate) {

                    playChocolateVideo(
                        activeChocolate
                    );

                }

            }

        }
    );



    /* =========================================================
    CONSOLE MESSAGE
    ========================================================= */

    console.log(
        "===================================="
    );

    console.log(
        "LEO CAFE WEBSITE"
    );

    console.log(
        "Coffee + Filter Kaapi + Chocolate"
    );

    console.log(
        "Text-only icon version"
    );

    console.log(
        "===================================="
    );