document.addEventListener('DOMContentLoaded', (event) => {
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const slider = document.querySelector('.container-slider');
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');
    const scrollbarTrack = document.querySelector('.scrollbar-track');

    const scrollAmount = document.querySelector('.card-item').offsetWidth * 2;

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
