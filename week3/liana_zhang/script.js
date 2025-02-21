function addOneToCounter(){
    document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText) + 1;
}

let cookieMonster = false;

function checkHundredClicks(){
    if (document.getElementById("counter").innerText == 10){
        cookieMonster = true;
        alert("You are a Cookie Monster!!! >:(")
    }

}

const button = document.getElementById('Spend 5 Cookies');
button.addEventListener('click', function() {
    if (document.getElementById("counter").innerText >= 5){
        document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText) - 5;
    }
    else{
        alert("Not Enough Cookies!!")
    }
    
});