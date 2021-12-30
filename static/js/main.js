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
2) Додати фічі
3) Зробити інші сторінки машин
4) Зробити магазин у вигляді слайдера
------------------------------  BACK-END ---------------------------------------------------------------- 
1) Додати Fetch API та DB.JSON щоб все зберігалося
2) На вкладку Увійти приєднати Google Oauth2 else: просто створити сторінку для входу/реестрації що відкриватиметься при вході

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


/* Бургер */




