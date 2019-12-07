
// Select DOM Items 
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');
const birthdayBtn = document.querySelector('.birthday-btn');
const birthdayDiv = document.querySelector('.bday-div');
const birthdayWrapper = document.querySelector('.bday-wrapper');
const menuPw = document.querySelector('.menu-pw');
const pwBtn = document.querySelector('.pwBtn');
const pwBtn2 = document.querySelector('.pwBtn2');
const pwInput = document.getElementById('pw');
const pwInput2 = document.getElementById('pw2');
const pwWrapper = document.querySelector('.pw-wrapper');
const pwWrapper2 = document.querySelector('.pw-wrapper2');
const wrongPwNotification = document.querySelector('.wrongPwNotification');
const wrongPwNotification2 = document.querySelector('.wrongPwNotification2');

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);
// add password check if user releases enter key 
pwInput.addEventListener('keyup', function (event) {
    // number 13 = Enter
    if (event.keyCode === 13) {
        event.preventDefault(); // just in case
        pwBtn.click();
    } else {
        if (wrongPwNotification.classList.contains('show')) {
            wrongPwNotification.classList.remove('show');
        }
    }
});

if (pwInput2) {
    pwInput2.addEventListener('keyup', function (event) {
        // number 13 = Enter
        if (event.keyCode === 13) {
            event.preventDefault(); // just in case
            pwBtn2.click();
        } else {
            if (wrongPwNotification2.classList.contains('show')) {
                wrongPwNotification2.classList.remove('show');
            }
        }
    });
}

function toggleMenu() {

    if (!showMenu) {
        // Set Menu State 
        showMenu = true;

        if (birthdayBtn) {
            birthdayBtn.classList.add('close');

            if (birthdayBtn.classList.contains('show')) {
                toggleBdayDiv();
            }
        }
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuBranding.classList.add('show');


        if (getCookie('pw') == 'true') {
            menuPw.classList.add('show');
            pwWrapper.classList.add('show');
            return;
        }

        menuNav.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

    } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuBranding.classList.remove('show');
        menuNav.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));
        menuPw.classList.remove('show');
        pwWrapper.classList.remove('show');
        if (birthdayBtn) {
            birthdayBtn.classList.remove('close');
        }

        // Set Menu State 
        showMenu = false;
    }
}

function getConfig() {
    // check for Cookies
    theme = getCookie('css');
    pw = getCookie('pw');

    if (theme) {
        let pagestyle = document.getElementById('pagestyle');
        pagestyle.setAttribute('href', theme);
    }

    // set pw to true if no cookie exists at all
    if (!pw) {
        setCookie('pw', 'true');
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
    if (exDays) {
        let d = new Date();
        d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));

        let expires = 'expires=' + d.toUTCString();
        document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
    } else {
        document.cookie = cName + '=' + cValue + ';path=/';
    }
}

function showQuote(text, element) {
    const textBox = document.querySelector('.textBox');
    const textContent = document.querySelector('.textContent');
    const quote = 'text/quotes/' + text;
    const parentTop = element.parentNode.offsetTop;

    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            textContent.textContent = this.responseText;
        } else {
            textContent.textContent = "Sorry, Fehler beim Laden des Zitats aufgetreten..."
        }
    };

    textBox.style.top = parentTop + "px";
    textBox.classList.add('show');
    http.open("GET", quote, true);
    http.send();
}

function closeQuote() {
    document.querySelector('.textBox').classList.remove('show');
}

function checkPw() {
    let password = pwInput.value;
    let code = 0;
    for (let i = 0; i < password.length; i++) {
        code += password.charCodeAt(i);
    }

    if (code == 1035) {
        setCookie('pw', 'false');
        menuPw.classList.remove('show');
        pwWrapper.classList.remove('show');
        menuNav.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));
    } else {
        wrongPwNotification.classList.add('show');
    }
}

function checkPw2() {
    let password = pwInput2.value;
    let code = 0;
    for (let i = 0; i < password.length; i++) {
        code += password.charCodeAt(i);
    }

    if (code == 1035) {
        setCookie('pw', 'false');
        pwWrapper2.classList.remove('show');
        pwWrapper2.style.display = "none";
        birthdayWrapper.classList.add('show');
    } else {
        wrongPwNotification2.classList.add('show');
    }
}

function toggleInfotext(img, infoparam, infotext) {
    let infoParam = document.querySelector(infoparam);

    if (!infoParam.classList.contains('show')) {
        let http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                infoParam.innerHTML = this.response;
            } else {
                infoParam.innerHTML = "Sorry, Fehler beim Laden des Infotexts aufgetreten..."
            }
        };
        const infoText = 'text/infotexts/' + infotext;
        http.open("GET", infoText, true);
        http.send();
        img.classList.add('active');
        infoParam.classList.add('show');
    }

    else {
        //infoParam.innerHTML = "";
        img.classList.remove('active');
        infoParam.classList.remove('show');
    }

}

function toggleBdayDiv() {

    if (birthdayBtn.classList.contains('show')) {
        birthdayBtn.classList.remove('show');
        birthdayDiv.classList.remove('show');
    } else {
        birthdayBtn.classList.add('show');
        birthdayDiv.classList.add('show');
    }

    if (getCookie('pw') == 'true') {
        pwWrapper2.classList.add('show');
    } else {
        // pwWrapper2.classList.remove('show');
        // pwWrapper2.style.height = "0";
        pwWrapper2.style.display = "none";
        birthdayWrapper.classList.add('show');
        // toggleBdayDiv();
    }
}

function showBdayPic(imageId) {
    let image = document.getElementById(imageId);
    if (image.classList.contains('show')) {
        image.classList.remove('show');
    } else {
        image.classList.add('show');
    }

}
