let counter = 0;

const cookieImages = [
    "cookies/1.png", // Full cookie
    "cookies/2.png",  // First bite
    "cookies/3.png",  // Second bite
    "cookies/4.png",  // Third bite
    "cookies/5.png",  // Almost gone
    "cookies/6.png"  // Only crumbs left
];

function addOneToCounter() {
    if (counter < cookieImages.length - 1) {
        counter++;
        document.getElementById("counter").innerText = counter;
        document.getElementById("cookie-img").src = cookieImages[counter];

        if (counter === cookieImages.length - 1) {
            document.getElementById("restart-btn").style.display = "block"; // Show restart button
        }
    }
}

function restartGame() {
    counter = 0;
    document.getElementById("counter").innerText = counter;
    document.getElementById("cookie-img").src = cookieImages[counter];
    document.getElementById("restart-btn").style.display = "none"; // Hide restart button
}
