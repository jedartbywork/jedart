export function toggleClassicMenu() {
    headerWrapper.classList.toggle("header__wrapper_classic");
    classicMenu.classList.toggle('header_flex');
    bodyEl.classList.toggle('body_classic')
    toggleContentBlocks();
}