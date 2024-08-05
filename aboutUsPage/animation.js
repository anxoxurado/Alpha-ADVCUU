document.addEventListener('DOMContentLoaded', () => {
    // Preloader logic
    const preloader = document.getElementById('preloader');
    const container = preloader.querySelector('.container div');
    
    // Scroll animation logic
    const elements = document.querySelectorAll('.hidden');
    
    // Intersection Observer setup
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Preloader animation end listener
    container.addEventListener('animationend', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
            // Start observing elements for scroll animation after preloader is gone
            elements.forEach(element => {
                observer.observe(element);
            });
        }, 1000);
    });

    // Fallback for preloader
    setTimeout(() => {
        if (!document.body.classList.contains('loaded')) {
            document.body.classList.add('loaded');
            // Start observing elements if fallback is triggered
            elements.forEach(element => {
                observer.observe(element);
            });
        }
    }, 10000); // Total duration: 10s
});
