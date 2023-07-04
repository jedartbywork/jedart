// Common variables
const locationList = [17, 54, 90, 128, 163];
// DOM items
const rouletteMenu = document.querySelector(`.nav-wrapper`);
const contentBlocks = document.querySelectorAll('.content');
const classicMenu = document.querySelector(`header`);
const headerWrapper = document.querySelector(`.header__wrapper`);
const mainRoulette = document.querySelector('.main-roulette');
const bodyEl = document.getElementsByTagName('body')[0];
const switchBlock = document.querySelector('.switch-block');
const menuTrigger = document.querySelector('.switch-block-btn');
const filterBlock = document.querySelector('.block');
// String Classes
const menuItemActiveClass = 'nav__menu-item_active';
const switchBtnActiveClass = 'switch_on';
const switchBtnHiddenClass = 'switch_off'
const contentActiveClass = 'content_active';
const navWrapperClassicClass = 'nav-wrapper_classic';
const contentClassicLCass = 'content_classic';
const bodyClassicClass = 'body_classic';
const mainClassicClass = 'main_classic';
const headerWrapperClassicClass = 'header__wrapper_classic';
const headerFlexClass = 'header_flex';

/**
 * @param {string} menuItems
 */
function scrollMenu(menuItems) {
    const items = document.querySelectorAll(`.${menuItems}`);
    document.addEventListener('wheel', (e) => {
        if (!rouletteMenu.classList.contains(navWrapperClassicClass) && !e.ctrlKey) {
            const activeItem = document.querySelector(`.${menuItemActiveClass}`);
            let activeItemIndex = Array.prototype.indexOf.call(items, activeItem);
            if (!(e.deltaY > 0 && activeItemIndex === items.length - 1) && !(e.deltaY < 0 && activeItemIndex === 0)) {
                toggleActiveItem(activeItemIndex, items, menuItemActiveClass);
                activeItemIndex += e.deltaY > 0 ? 1 : -1;
                toggleActiveItem(activeItemIndex, items, menuItemActiveClass);
            }
        }
    });
}

/**
 * Устанавливает темный фильтр для элементов меню рулетки
 * @param {number} index
 */
function setFilterForItem(index) {
    filterBlock.style.transform = `rotate(${locationList[index]}deg)`
}

/**
 * Переключает активный класс у элементов меню рулетки
 * @param {number} index
 * @param {NodeListOf<Element>} items
 * @param {string} menuItemActiveClass
 */
function toggleActiveItem(index, items, menuItemActiveClass) {
    if (index > -1 && index < items.length) {
        items[index].classList.toggle(menuItemActiveClass)
        toggleContentBlock(index);
        setFilterForItem(index);
    }
}

/**
 * Устанавливает активный блок с контентом (в меню рулетки)
 * @param {number} index
 */
function toggleContentBlock(index) {
    contentBlocks[index].classList.toggle(contentActiveClass);
}

/**
 * Управление включением и выключением классического меню.
 */
function classicMenuManage() {
    menuTrigger.addEventListener('click', () => {
        menuTrigger.classList.contains(switchBtnActiveClass) ? showRouletteMenu() : hideRouletteMenu();
        menuTrigger.classList.toggle(switchBtnActiveClass);
    })
}

/**
 * Управление включением и выключением классического меню
 */
function toggleClassicMenu() {
    headerWrapper.classList.toggle(headerWrapperClassicClass);
    classicMenu.classList.toggle(headerFlexClass);
    bodyEl.classList.toggle(bodyClassicClass);
    toggleContentBlocks();
};

/**
 * При появлении классического меню устанавливаем всем блокам с контентом класс для отображения
 */
function toggleContentBlocks() {
    mainRoulette.classList.toggle(mainClassicClass)
    contentBlocks.forEach((contentBlock) => {
        contentBlock.classList.toggle(contentClassicLCass)
    })
}

/**
 * Отобразить меню рулетку
 */
function showRouletteMenu() {
    rouletteMenu.classList.remove(navWrapperClassicClass)
    toggleClassicMenu();
    setTimeout(() => {
        rouletteMenu.style.transform = 'translateX(0)';
    }, 200)
}

/**
 * Скрыть меню рулетку
 */
function hideRouletteMenu() {
    rouletteMenu.style.transform = 'translateX(-500px)';
    rouletteMenu.classList.add(navWrapperClassicClass)
    toggleClassicMenu();
}

/**
 * Проверка ширины экрана для скрытия меню рулетки и управления кнопкой его включения и выключения
 */
function checkWindowSize() {
    if (window.innerWidth < 1200 && (!rouletteMenu.classList.contains(navWrapperClassicClass))) {
        hideRouletteMenu();
        switchBlock.classList.add(switchBtnHiddenClass)
        menuTrigger.classList.toggle(switchBtnActiveClass);
    } else {
        switchBlock.classList.remove(switchBtnHiddenClass)
    }
}

/**
 * Проверка при скролле на изменение размера экрана
 */
function handlerCheckWindowSize() {
    checkWindowSize();
    window.addEventListener('resize', () => {
        checkWindowSize();
    })
}

