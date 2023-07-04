// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('.header__wrapper')
  const breakpoint = 50;
  if ( window.scrollY >= breakpoint) {
    nav.classList.add('header_fixed')
  } else {
    nav.classList.remove('header_fixed')
  }
}
window.addEventListener('scroll', fixedNav)


