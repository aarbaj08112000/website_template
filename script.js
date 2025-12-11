// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconPath = document.getElementById('theme-icon-path');
    const body = document.body;

    // Moon icon path (for dark mode)
    const moonPath = "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z";
    // Sun icon path (for light mode)
    const sunPath = "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z";

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        if (themeIconPath) themeIconPath.setAttribute('d', sunPath);
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            const isLightMode = body.classList.contains('light-mode');

            // Update icon
            if (themeIconPath) {
                themeIconPath.setAttribute('d', isLightMode ? sunPath : moonPath);
            }

            // Save preference
            localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        });
    }

    // Page load animation (fade in)
    gsap.from("body", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
    });

    // Hero Section Animations - REMOVED to avoid conflict with Swiper
    // The Swiper fade effect will handle basic transitions.
    // We can add slideChange animations later if needed.


    // Scroll Reveal for Service Cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // Client Logo Slider Animation (Continuous Scroll)
    gsap.to(".logo-track", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear"
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('glass-nav', 'shadow-lg');
            nav.classList.remove('bg-transparent');
        } else {
            nav.classList.remove('glass-nav', 'shadow-lg');
            nav.classList.add('bg-transparent');
        }
    });

    // Initialize Swiper
    // Initialize Swiper (only if element exists)
    if (document.querySelector(".mySwiper")) {
        const swiper = new Swiper(".mySwiper", {
            spaceBetween: 30,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
});

// Video Modal Logic
const videoModal = document.getElementById('videoModal');
const videoModalContent = document.getElementById('videoModalContent');
const videoFrame = document.getElementById('videoFrame');
const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; // Example Video

function openVideoModal() {
    videoFrame.src = videoUrl;
    videoModal.classList.remove('hidden');
    // Small delay to allow display block to apply before opacity transition
    setTimeout(() => {
        videoModal.classList.add('modal-show');
        videoModalContent.classList.add('modal-content-show');
    }, 10);
}

function closeVideoModal() {
    videoModal.classList.remove('modal-show');
    videoModalContent.classList.remove('modal-content-show');

    setTimeout(() => {
        videoModal.classList.add('hidden');
        videoFrame.src = ""; // Stop video
    }, 300); // Match CSS transition duration
}


// Close modal on click outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}


// FAQ Accordion Toggle
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');

    // Close all other FAQs
    document.querySelectorAll('.FAQ-item button').forEach(otherBtn => {
        if (otherBtn !== button) {
            otherBtn.nextElementSibling.classList.add('hidden');
            otherBtn.querySelector('svg').classList.remove('rotate-180');
        }
    });

    // Toggle current
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// --- GALLERY LOGIC ---

// Tab Switching
function openTab(evt, tabName) {
    // Hide all tab content
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("gallery-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Deactivate all tab links
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-tab", "").replace(" text-cyan-400", " text-gray-400").replace(" bg-white/10", " hover:bg-white/5");
    }

    // Show current tab and activate link
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active-tab text-cyan-400 bg-white/10";
    evt.currentTarget.classList.remove("text-gray-400", "hover:bg-white/5");
}

// Flip Card Logic
function flipCard(card) {
    card.classList.toggle('isflipped');
}

// Gallery Lightbox Logic
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxWrapper = document.getElementById('lightboxSwiperWrapper');
let lightboxSwiper;

function openLightbox(clickedElement, tabName) {
    if (!galleryLightbox || !lightboxWrapper) return;

    // 1. Get all items in the current tab
    const currentTab = document.getElementById(tabName);
    const items = currentTab.querySelectorAll('.gallery-card-container');

    // 2. Find index of clicked element
    let activeIndex = 0;
    const slidesHTML = [];

    items.forEach((item, index) => {
        if (item === clickedElement) {
            activeIndex = index;
        }

        const inner = item.querySelector('.gallery-card-inner');
        const type = inner.dataset.type;
        const src = inner.dataset.src;
        const title = inner.dataset.title;

        let slideContent = '';
        if (type === 'image') {
            slideContent = `
                <div class="swiper-slide flex items-center justify-center">
                    <img src="${src}" alt="${title}" class="max-w-full max-h-full object-contain rounded shadow-2xl">
                    <h3 class="absolute bottom-4 left-0 w-full text-center text-white text-xl font-bold drop-shadow-md bg-black/50 py-2">${title}</h3>
                </div>
            `;
        } else if (type === 'video') {
            // Append autoplay only if it's the active slide? handled by Swiper events usually or just standard iframe
            slideContent = `
                <div class="swiper-slide flex items-center justify-center">
                    <iframe src="${src}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full max-w-4xl aspect-video rounded-xl shadow-2xl"></iframe>
                </div>
            `;
        }
        slidesHTML.push(slideContent);
    });

    // 3. Inject Slides
    lightboxWrapper.innerHTML = slidesHTML.join('');

    // 4. Show Modal
    galleryLightbox.classList.remove('hidden');
    // Force reflow
    void galleryLightbox.offsetWidth;

    setTimeout(() => {
        galleryLightbox.classList.remove('opacity-0');
        galleryLightbox.classList.add('modal-show');
    }, 10);

    // 5. Initialize or Update Swiper
    if (lightboxSwiper) {
        lightboxSwiper.destroy(true, true);
    }

    lightboxSwiper = new Swiper(".lightboxSwiper", {
        initialSlide: activeIndex,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

function closeLightbox() {
    if (!galleryLightbox) return;

    galleryLightbox.classList.remove('modal-show');
    galleryLightbox.classList.add('opacity-0');

    setTimeout(() => {
        galleryLightbox.classList.add('hidden');
        if (lightboxSwiper) {
            lightboxSwiper.destroy(true, true);
            lightboxSwiper = null;
        }
        lightboxWrapper.innerHTML = ''; // Clear content
    }, 300);
}
