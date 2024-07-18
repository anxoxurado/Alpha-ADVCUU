document.addEventListener("DOMContentLoaded", function() {
    const scrollingContent = document.getElementById('scrollingContent');
    const containerHeight = scrollingContent.offsetHeight;
    const totalHeight = scrollingContent.scrollHeight;
    const scrollAmount = totalHeight - containerHeight;
    
    const keyframes = `
        @keyframes scroll {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-${scrollAmount}px);
            }
        }
    `;
    
    // Create a style element
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
});