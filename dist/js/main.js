
// Select DOM Items 
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');
const birthdayBtn = document.querySelector('.birthday-btn');

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuBranding.classList.add('show');
        menuNav.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));
        if (birthdayBtn) {
            birthdayBtn.classList.add('close');
        }

        // Set Menu State 
        showMenu = true;
    } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuBranding.classList.remove('show');
        menuNav.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));
        if (birthdayBtn) {
            birthdayBtn.classList.remove('close');
        }

        // Set Menu State 
        showMenu = false;
    }
}

function getConfig() {
    // check for Cookies
    let cookies = document.cookie;
    theme = getCookie('css');
    if (theme) {
        console.log(theme);
        let pagestyle = document.getElementById('pagestyle');
        pagestyle.setAttribute('href', theme);
    } else {
        console.log('No cookies found');
    }
}

function changeTheme(theme) {
    let pagestyle = document.getElementById('pagestyle');
    pagestyle.setAttribute('href', theme);

    setCookie('css', theme, 10000);
}

function getCookie(cName) {
    let name = cName + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let cArray = decodedCookie.split(';');
    for (let i = 0; i < cArray.length; i++) {
        let cookie = cArray[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}

function setCookie(cName, cValue, exDays) {
    let d = new Date();
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));

    let expires = 'expires=' + d.toUTCString();
    document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
}
