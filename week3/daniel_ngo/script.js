function addToCount() {
    text = document.getElementById("count").innerText;
    if (text == "1") {
        document.getElementById("cookieString").innerText = "Cookie";
    }
    else {
        document.getElementById("cookieString").innerText = "Cookies";
    }
    document.getElementById("count").innerText = parseInt(text) + 1;
}