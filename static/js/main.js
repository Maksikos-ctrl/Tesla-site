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
2) Зробити "Зоряний рейтинг" с AJAX
3) На вкладку Увійти приєднати Google Oauth2 else: просто створити сторінку для входу/реестрації що відкриватиметься при вході

*/


/* Зоряний рейтинг */
const ratings = document.querySelectorAll('.rating');
    

if (ratings.length > 0) {
    startRatings();
}

function startRatings() {  // Головна функція
    let ratingActive, ratingValue;

    for (let main = 0; main < ratings.length; main++) { // Передивляемося усы рейтинги на сторінці
        const rating = ratings[main];
        startRating(rating); 
    }

    function startRating(rating) { // Ініціалізація якогось конкретного рейтингу

        startRatingVariables(rating);

        changeRatingActiveWidth();

        if (rating.classList.contains('rating__change')) {
            changeRating(rating);
        }
    }

    function startRatingVariables(rating) { // Ініціалізація змінних
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    function changeRatingActiveWidth(main = ratingValue.innerHTML) {
        const changeRatingActiveWidth = main / 0.05; // Тому що 5 зірок
        ratingActive.style.width = `${changeRatingActiveWidth}%`; // Записуємо змінену ширину активного рейтингу і через інтерполіяцію виведемо + додаємо %

    }

    function changeRating(rating) { // Можливість вказувати оцінку
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let m = 0; m < ratingItems.length; m++) {
            const ratingItem = ratingItems[m]; 
            ratingItem.addEventListener("mouseenter", () => {
                startRatingVariables(rating); // Оновлення змінних
                changeRatingActiveWidth(ratingItem.value); // Оновлення активних зірочок
            });
        }
    }
}


