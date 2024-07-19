document.addEventListener('DOMContentLoaded', (event) => {
    const feedSections = document.querySelectorAll('.feed-section');

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    feedSections.forEach(feedSection => {
        const prevButton = feedSection.querySelector('.slide-button:first-child');
        const nextButton = feedSection.querySelector('.slide-button:last-child');
        const slider = feedSection.querySelector('.container-slider');
        const scrollbarThumb = feedSection.nextElementSibling.querySelector('.scrollbar-thumb');
        const scrollbarTrack = feedSection.nextElementSibling.querySelector('.scrollbar-track');
        const scrollAmount = Math.max(slider.querySelector('.card-item').offsetWidth, slider.clientWidth * 0.8);

        let isDragging = false;
        let startX;
        let scrollLeft;

        // Añadir estilos CSS para transiciones suaves
        prevButton.style.transition = 'opacity 0.3s ease-in-out';
        nextButton.style.transition = 'opacity 0.3s ease-in-out';

        function updateButtonVisibility() {
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            const scrollPercentage = slider.scrollLeft / maxScrollLeft;

            // Fade del botón previo
            const prevOpacity = Math.max(0, Math.min(1, slider.scrollLeft / (slider.clientWidth * 0.2)));
            prevButton.style.opacity = prevOpacity;
            prevButton.style.visibility = prevOpacity > 0 ? 'visible' : 'hidden';

            // Fade del botón siguiente
            const nextOpacity = Math.max(0, Math.min(1, (maxScrollLeft - slider.scrollLeft) / (slider.clientWidth * 0.2)));
            nextButton.style.opacity = nextOpacity;
            nextButton.style.visibility = nextOpacity > 0 ? 'visible' : 'hidden';
        }

        function updateScrollbarThumb() {
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            const scrollPercentage = slider.scrollLeft / maxScrollLeft;
            const thumbWidth = scrollbarTrack.clientWidth * (slider.clientWidth / slider.scrollWidth);
            scrollbarThumb.style.width = `${thumbWidth}px`;
            scrollbarThumb.style.left = `${scrollPercentage * (scrollbarTrack.clientWidth - thumbWidth)}px`;
        }

        function handleThumbDrag(event) {
            if (!isDragging) return;
            event.preventDefault();
            const x = event.clientX - scrollbarTrack.getBoundingClientRect().left;
            const walk = (x - startX) * (slider.scrollWidth / scrollbarTrack.clientWidth);
            slider.scrollLeft = scrollLeft + walk;
        }

        function update() {
            updateButtonVisibility();
            updateScrollbarThumb();
            requestAnimationFrame(update);
        }

        scrollbarThumb.addEventListener('mousedown', (event) => {
            isDragging = true;
            startX = event.clientX - scrollbarThumb.offsetLeft;
            scrollLeft = slider.scrollLeft;
            document.body.style.userSelect = 'none';
        });

        scrollbarThumb.addEventListener('touchstart', (event) => {
            isDragging = true;
            startX = event.touches[0].clientX - scrollbarThumb.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        document.addEventListener('mousemove', handleThumbDrag);

        document.addEventListener('touchmove', (event) => {
            if (!isDragging) return;
            event.preventDefault();
            const x = event.touches[0].clientX - scrollbarTrack.getBoundingClientRect().left;
            const walk = (x - startX) * (slider.scrollWidth / scrollbarTrack.clientWidth);
            slider.scrollLeft = scrollLeft + walk;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = 'auto';
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        prevButton.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextButton.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        slider.addEventListener('scroll', throttle(() => {
            updateButtonVisibility();
            updateScrollbarThumb();
        }, 100));

        requestAnimationFrame(update);
    });
});