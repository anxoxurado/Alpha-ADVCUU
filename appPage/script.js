const initSlider = () => {
    const cardList = document.querySelector(".container-slider .card-list");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");
    prevButton.addEventListener("click", () => {
        cardList.scrollBy({ left: -cardList.clientWidth, behavior: "smooth" });
    });
    nextButton.addEventListener("click", () => {
    cardList.scrollBy({ left: cardList.clientWidth, behavior: "smooth" });
    });
}

window.addEventListener("load", initSlider);
   