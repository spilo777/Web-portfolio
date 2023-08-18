// DARK BTN
let btnDarkMode = document.querySelector(".dark-mode-btn");

let darkVariables = `
:root {
    --main-bg-color: #252625;
    --title-1: #fff;
    --title-2: #fff;
    --btn-outline-color: #fff;
    --btn-outline-border-color: #fff;
    --project-card-bg: #000;
    --project-card-text: #fff;
    --box-shadow: 0px 12px 3px 0px rgb(0 0 0 / 25%);
}`


function applyDarkMode() {
    const style = document.createElement("style");
    style.innerHTML = darkVariables;
    style.id = "dark-variables";
    document.head.append(style);
    document.body.classList.add("dark");
    btnDarkMode.classList.add('dark-mode-btn--active');
}


function removeDarkMode() {
    document.querySelector("#dark-variables").remove();
    document.body.classList.remove("dark");
    btnDarkMode.classList.remove('dark-mode-btn--active');
}

btnDarkMode.addEventListener('click', function () {
    if (document.body.classList.contains("dark")) {
        removeDarkMode();
        localStorage.setItem("darkMode", "light");
    } else {
        applyDarkMode();
        localStorage.setItem("darkMode", "dark");
    }
});


if (localStorage.getItem("darkMode") === "dark") {
    applyDarkMode();
} else {
    removeDarkMode();
}


// BTN UP
let mybutton = document.getElementById("myBtn");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
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