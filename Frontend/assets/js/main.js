// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href"))
            ?.scrollIntoView({ behavior: "smooth" });
    });
});

// Header shadow
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.style.boxShadow =
        window.scrollY > 20 ? "0 10px 30px rgba(0,0,0,.4)" : "none";
});

// Reveal animation
const reveals = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add("active");
        }
    });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Counter animation
const counters = document.querySelectorAll(".counter");

const animateCounter = counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const step = target / 80;

    const update = () => {
        count += step;
        if (count < target) {
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(update);
        } else {
            counter.textContent = target;
        }
    };
    update();
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

counters.forEach(c => observer.observe(c));
