document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // CURRENT YEAR
    // =====================================

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    // =====================================
    // MOBILE MENU
    // =====================================

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const icon =
                menuBtn.querySelector("i");


            if (navLinks.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    // =====================================
    // CLOSE MOBILE MENU
    // =====================================

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navLinks) {
                navLinks.classList.remove("open");
            }


            if (menuBtn) {

                const icon =
                    menuBtn.querySelector("i");


                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    });


    // =====================================
    // REVEAL ANIMATION
    // =====================================

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(entry.target);

                        }

                    });

                },

                {
                    threshold: 0.1
                }

            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("show");

        });

    }


    // =====================================
    // PORTFOLIO FILTER
    // =====================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const selectedFilter =
                button.getAttribute("data-filter");


            projectCards.forEach(function (card) {

                const category =
                    card.getAttribute("data-category");


                if (
                    selectedFilter === "all" ||
                    selectedFilter === category
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    // =====================================
    // PROJECT MODAL
    // =====================================

    const modal =
        document.getElementById("projectModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalClose =
        document.getElementById("modalClose");

    const projectImages =
        document.querySelectorAll(".project-image");


    function openModal(imageSource) {

        if (!modal || !modalImage) {
            return;
        }

        modalImage.src = imageSource;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    projectImages.forEach(function (projectImage) {

        projectImage.addEventListener("click", function () {

            const image =
                projectImage.querySelector("img");


            if (image) {

                openModal(image.src);

            }

        });

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                closeModal();

            }

        });

    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    // =====================================
    // COUNTERS
    // =====================================

    const counters =
        document.querySelectorAll("[data-target]");


    function startCounter(element) {

        const target =
            Number(element.getAttribute("data-target"));

        let current = 0;

        const duration = 1200;

        const steps = 60;

        const increment =
            target / steps;

        const intervalTime =
            duration / steps;


        const timer =
            setInterval(function () {

                current += increment;


                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }


                element.textContent =
                    Math.floor(current);

            }, intervalTime);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            startCounter(entry.target);

                            observer.unobserve(entry.target);

                        }

                    });

                },

                {
                    threshold: 0.5
                }

            );


        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(function (counter) {

            counter.textContent =
                counter.getAttribute("data-target");

        });

    }


    // =====================================
    // MOUSE LIGHT
    // =====================================

    const mouseLight =
        document.getElementById("mouseLight");


    if (mouseLight) {

        document.addEventListener("mousemove", function (event) {

            mouseLight.style.left =
                event.clientX + "px";

            mouseLight.style.top =
                event.clientY + "px";

        });

    }


    // =====================================
    // HERO PHOTO 3D EFFECT
    // =====================================

    const heroVisual =
        document.getElementById("heroVisual");

    const photoCard =
        document.getElementById("photoCard");


    if (
        heroVisual &&
        photoCard &&
        window.innerWidth > 1000
    ) {

        heroVisual.addEventListener("mousemove", function (event) {

            const rectangle =
                heroVisual.getBoundingClientRect();


            const mouseX =
                event.clientX - rectangle.left;

            const mouseY =
                event.clientY - rectangle.top;


            const centerX =
                rectangle.width / 2;

            const centerY =
                rectangle.height / 2;


            const rotateY =
                ((mouseX - centerX) / centerX) * 4;


            const rotateX =
                -((mouseY - centerY) / centerY) * 3;


            photoCard.style.transform = `
                translateX(-50%)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;

        });


        heroVisual.addEventListener("mouseleave", function () {

            photoCard.style.transform = `
                translateX(-50%)
                rotateX(0deg)
                rotateY(0deg)
            `;

        });

    }


    // =====================================
    // ACTIVE NAVIGATION
    // =====================================

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNavigation() {

        let currentSection = "home";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;


            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    // =====================================
    // SMOOTH SCROLL
    // =====================================

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                link.getAttribute("href");


            if (!href || href === "#") {
                return;
            }


            const target =
                document.querySelector(href);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });

});
