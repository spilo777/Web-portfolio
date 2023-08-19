import * as functions from "./modules/functions.js";

functions.isWebp();


let rightArrow = document.querySelector('#brand-carousel-right-arrow');
let content = document.querySelector('.brand-carousel__content');
if (rightArrow && content) {
  rightArrow.addEventListener('click', function () {
    content.scrollLeft = content.scrollLeft + (content.offsetWidth / 2);
  });
}

document.querySelectorAll('.product__buy-button').forEach(function (item, i, arr) {
  item.addEventListener('click', function () {
    item.parentNode.classList.add('is-add-cart');
  });
});

document.querySelectorAll('.cart-counter').forEach(function (item, i, arr) {
  let input = item.querySelector('input');
  let value = input.value;

  item.addEventListener('click', function (e) {
    if (e.target.textContent == '+') {
      input.value = ++input.value;
    } else if (e.target.textContent == '−') {
      if (parseInt(input.value, 10) == 0) { return }
      input.value = --input.value;
    }
  });

  input.addEventListener('input', function (e) {
    if (/\D/.test(e.data)) {
      input.value = input.value.replace(/\D/ig, '');
    }
  });
});

document.querySelector('#menu-burger-btn').addEventListener('click', function () {
  document.body.classList.add('menu-opened')
});

document.querySelector('#close-menu-burger-btn').addEventListener('click', function () {
  document.body.classList.remove('menu-opened')
});

document.querySelectorAll('.js-search-btn').forEach(function (item, i, arr) {
  item.addEventListener('click', function () {
    document.body.classList.add('search-opened');
  });
});


document.querySelectorAll('.js-close-mobile-search').forEach(function (item, i, arr) {
  item.addEventListener('click', function () {
    document.body.classList.remove('search-opened');
  });
});


document.querySelector('.aside__collections').addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.className.includes('collections-item') && e.target.parentNode.className.includes('aside__collections')) {
    e.target.classList.add('active');
  } else if (
    e.target.className.includes('subcollections__back-btn-icon')
  ) {
    e.target.parentNode.parentNode.parentNode.parentNode.classList.remove('active');
  }
});