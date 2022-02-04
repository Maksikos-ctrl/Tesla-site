"use strict";

// #Website Tesla + FLask + DB JSON + FETCH API + Google Oauth2
// #Copyright (C) 2021 Maksikos-ctrl 

// #This program is free software: you can redistribute it and/or modify it under
// #the terms of the GNU General Public License as published by the Free Software
// #Foundation, either version 3 of the License, or any later version.

// #This program is distributed in the hope that it will be useful, but WITHOUT ANY
// #WARRANTY; without even the implied warranty of  MERCHANTABILITY or FITNESS FOR
// #A PARTICULAR PURPOSE. See the GNU General Public License for more details.

// #You should have received a copy of the GNU General Public License along with
// #this program. If not, see <http://www.gnu.org/licenses/>.

/* 
                               PLAN
------------------------------ FRONT-END ----------------------------------------------------------------                
1) Зробити макет сайту +
2) Зробити responsive під мобіли +
3) Додати фічі +
4) Зробити інші сторінки машин +
5) Зробити магазин +
6) Favicon Ico +
------------------------------  BACK-END ---------------------------------------------------------------- 
1) Додати Fetch API та DB.JSON щоб все зберігалося +
2) На вкладку Увійти приєднати Google Oauth2 else: просто створити сторінку для входу/реестрації що відкриватиметься при вході +

*/


/* Зоряний рейтинг */
// const ratings = document.querySelectorAll('.rating');
    

// if (ratings.length > 0) {
//     startRatings();
// }

// function startRatings() {  // Головна функція
//     let ratingActive,
//       ratingValue;

//     for (let main = 0; main < ratings.length; main++) { // Передивляемося усы рейтинги на сторінці
//         const rating = ratings[main];
//         startRating(rating); 
//     }

//     function startRating(rating) { // Ініціалізація якогось конкретного рейтингу

//         startRatingVars(rating);

//         changeRatingActiveWidth();

//         if (rating.classList.contains('rating_change')) {
//             changeRating(rating);
//         }
//     }

//     function startRatingVars(rating) { // Ініціалізація змінних
//         ratingActive = rating.querySelector('.rating__active');
//         ratingValue = rating.querySelector('.rating__value');
//     }

//     function changeRatingActiveWidth(main = ratingValue.innerHTML) {
//         const ratingActiveWidth = main / 0.05; // Тому що 5 зірок
//         ratingActive.style.width = `${ratingActiveWidth}%`; // Записуємо змінену ширину активного рейтингу і через інтерполіяцію виведемо + додаємо %
//     }

//     function changeRating(rating) { // Можливість вказувати оцінку
//         const ratingItems = rating.querySelectorAll('.rating__item');

//         for (let main = 0; main < ratingItems.length; main++) {

//             const ratingItem = ratingItems[main]; 

//             ratingItem.addEventListener("mouseenter", () => {
//                 startRatingVars(rating); // Оновлення змінних
//                 changeRatingActiveWidth(ratingItem.value); // Оновлення активних зірочок
//             });

//             ratingItem.addEventListener("mouseleave", () => { 
//                 changeRatingActiveWidth(); // Коли прибрали мышу,то оновлюємо активні зірочки
//             });

//             ratingItem.addEventListener("click", () => {
//                 startRatingVars(rating);

//                 if (rating.dataset.ajax) { // Відправити на сервер цю інфу
//                     changeRatingValue(ratingItem.value, rating);
//                 } else { // Відобразити вказану оцінку
//                     ratingValue.innerHTML = main + 1;
//                     changeRatingActiveWidth();
//                 }
//             });
//         }
//     }


//     async function changeRatingValue(value, rating) {
//         if (!rating.classList.contains('rating_sending')) {
//             rating.classList.add('rating_sending');

//             let response = await fetch('rating.json', { // Відправка данних(value) на сервер
//                 method: 'POST',

//                 // body: JSON.stringify({
//                 //     userRating: value,
//                 // }),
//                 // headers: {
//                 //     'Сontent-Type': 'application/json'
//                 // }
                
//             });

//             if (response.ok) { // Якщо сервер відповів що все за#БУМБА
//                 const result = await response.json();

//                 const newRating = result.newRating; // Отримуємо новий рейтинг

//                 ratingValue.innerHTML = newRating; // Вихід нового середнього результату

//                 changeRatingActiveWidth(); // Оновлення активних зірок

//                 rating.classList.remove('rating_sending');
//             } else {

//                 alert("Ошибка!!");

//                 rating.classList.remove('rating_sending');
//             }

//         }
//     }
// }


/* Бургер-меню */

function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger-menu__button');
    let links = menu.find('.burger-menu__links');
    let overlay = menu.find('.burger-menu__overlay');

    button.on('click', e => {
        e.preventDefault();
        toggleMenu();
    });

    links.on('click', e => {
        toggleMenu(); 
    });

    overlay.on('click', e => {
        toggleMenu(); 
    });

    function toggleMenu() {
        menu.toggleClass('burger-menu_active');

        if (menu.hasClass('burger-menu_active')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'visible');
        }
    }
}
burgerMenu('.burger__menu');

/* POST-инфа через Fetch API  */

const popUp = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}  

popUp.forEach(item => {
    item.addEventListener('click', openModal);
});

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modal.addEventListener('click', e => {
    const target = e.target;
    if (target === modal || target.getAttribute('data-close') == '') {
        closeModal();
    } 
});

document.addEventListener('keydown', e => {  
    const code = e.code;
    if (code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    } 
});

const forms = document.querySelectorAll('form');

const message = {
    loading: '../static/img/spinner.svg',
    success: 'Congrats...All is OK',
    error: 'Congrats...All is OK'
};

forms.forEach(item => {
    connectPostData(item);
});

const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data 
    });  

    return await result.json();
};

function connectPostData(form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        const statusOfMessage = document.createElement('div');

        statusOfMessage.src = message.loading;

        form.insertAdjacentElement('afterend', statusOfMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => data.text())
        .then(data => {
            console.log(data);
            showGratitudePopUp(message.success);
            statusOfMessage.remove();
        }).catch(() => {
           showGratitudePopUp(message.error);
        }).finally(() => {
            form.reset();
        });
    });
}

function showGratitudePopUp(message) {
    const prevPopUp = document.querySelector('.modal__body');

    prevPopUp.classList.add('hide');

    openModal();
    
    const gratitudePopUp = document.createElement('div');
    
    gratitudePopUp.classList.add('modal__body');

    gratitudePopUp.innerHTML = `
        <div class="modal__content">
                <div class="modal__close" data-close="modal__close">×</div> 
                <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(gratitudePopUp);
    setTimeout(() => {
        gratitudePopUp.remove();
        prevPopUp.classList.add('show');
        prevPopUp.classList.remove('hide');
        closeModal();
    }, 5000);

    fetch('db.json')
    .then(data => data.json())
    .then(result => console.log(result));
}

/* Scroll down button */

const links = document.querySelectorAll('.scroll__bottom');  

for (const link of links) {
    link.addEventListener('click', clickHandler);
}

function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
        top: offsetTop,
        behavior: 'smooth'
    });
}

/* Scroll up button */

window.addEventListener('scroll', () => {
    const scroll = document.querySelector('.scroll__top');
    scroll.classList.toggle('active', window.scrollY > 500);

    scroll.addEventListener('click', scrollTop);
});


function scrollTop() {
    window.scrollTo({
        top: 0
    });
}

/* Video button */
const clickButton = document.querySelector('.test__drive__title'),
    closeButton = document.querySelector('.close');

function toggle() {
    const trailer = document.querySelector('.trailer');
    const video = document.querySelector('video');

    trailer.classList.toggle('active');

   video.pause();
   video.currentTime = 0;
}

clickButton.addEventListener('click', toggle); 
closeButton.addEventListener('click', toggle); 

/* Google Oauth2.0 */


function getGoogle() {
    let ret = sessionStorage.getItem("google");
    if (ret == null || ret == "") {
        // window.location.href = "/account"; 
    }
    else
    {
        document.querySelector(".login").text = "";
        
    }
    return JSON.parse(ret); 
}


getGoogle();


function loadGoogle() {
    console.log(getGoogle());
    document.querySelector(".avatar").src = getGoogle().profile_pic;
    document.querySelector(".nick").innerHTML = getGoogle().name;
}


loadGoogle();

