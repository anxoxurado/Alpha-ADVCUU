document.addEventListener('DOMContentLoaded', (event) => {
    const feedSections = document.querySelectorAll('.feed-section');

    feedSections.forEach(feedSection => {
        const prevButton = feedSection.querySelector('.slide-button:first-child');
        const nextButton = feedSection.querySelector('.slide-button:last-child');
        const slider = feedSection.querySelector('.container-slider');
        const scrollbarThumb = feedSection.nextElementSibling.querySelector('.scrollbar-thumb');
        const scrollbarTrack = feedSection.nextElementSibling.querySelector('.scrollbar-track');
        const scrollAmount = slider.querySelector('.card-item').offsetWidth * 1.5;

        function updateButtonVisibility() {
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            prevButton.style.display = slider.scrollLeft > 0 ? 'block' : 'none';
            nextButton.style.display = slider.scrollLeft < maxScrollLeft ? 'block' : 'none';
        }

        function updateScrollbarThumb() {
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            const scrollPercentage = slider.scrollLeft / maxScrollLeft;
            const thumbWidth = scrollbarTrack.clientWidth * (slider.clientWidth / slider.scrollWidth);
            scrollbarThumb.style.width = `${thumbWidth}px`;
            scrollbarThumb.style.left = `${scrollPercentage * (scrollbarTrack.clientWidth - thumbWidth)}px`;
        }

        function handleThumbDrag(event) {
            const thumbPositionRatio = (event.clientX - scrollbarTrack.getBoundingClientRect().left) / scrollbarTrack.clientWidth;
            slider.scrollLeft = thumbPositionRatio * (slider.scrollWidth - slider.clientWidth);
        }

        let isDragging = false;
        scrollbarThumb.addEventListener('mousedown', (event) => {
            isDragging = true;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (event) => {
            if (isDragging) {
                handleThumbDrag(event);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = 'auto';
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

        slider.addEventListener('scroll', () => {
            updateButtonVisibility();
            updateScrollbarThumb();
        });

        updateButtonVisibility();
        updateScrollbarThumb();
    });
});
