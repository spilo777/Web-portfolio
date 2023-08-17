// DARK BTN

let btnDarkMode = document.querySelector(".dark-mode-btn");


btnDarkMode.addEventListener('click', function () {
    btnDarkMode.classList.toggle("dark-mode-btn--active");
});






// BTN UP

let mybutton = document.getElementById("myBtn");


window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}


function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}