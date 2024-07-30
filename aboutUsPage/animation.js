document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.hidden');

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

    elements.forEach(element => {
        observer.observe(element);
    });
});
