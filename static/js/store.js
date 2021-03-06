"use strict";

const cartIcon = document.querySelector('#cart-icon'),
    cart = document.querySelector('.cart'),
    closeCart = document.querySelector('#close-cart');

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});    

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});    

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName('cart-remove'); 
    console.log(removeCartButtons);
    for (let r = 0; r < removeCartButtons.length; r++) {
        let button = removeCartButtons[r];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let r = 0; r < removeCartButtons.length; r++) {
        let input = quantityInputs[r];
        input.addEventListener('change', quantityChanged);
    }

    let addCart = document.getElementsByClassName('add-cart');
    for (let r = 0; r < addCart.length; r++) {
        let btn = addCart[r];
        btn.addEventListener('click', addCartAlreadySelected);
    } 

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonSelected);
}

function buyButtonSelected() {
    // alert('Ваш заказ уже вибран');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function addCartAlreadySelected(e) {
    let btn = e.target,
    storeProducts = btn.parentElement,
    title = storeProducts.getElementsByClassName('car-title')[0].innerText,
    price = storeProducts.getElementsByClassName('price')[0].innerText,
    productImg = storeProducts.getElementsByClassName('cars-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    let cartStoreBox = document.createElement('div');
    cartStoreBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('car-content')[0],
     cartItemNames = cartItems.getElementsByClassName('cart-product-title');
   
    for (let r = 0; r < cartItemNames.length; r++) {
      if (cartItemNames[r].innerText == title) {
        alert('Ты уже добавил этот товар к покупке!');
        return;
      }  
        
    }

    let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div> 
    <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartStoreBox.innerHTML = cartBoxContent;
    cartItems.append(cartStoreBox);
    cartStoreBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);   
    cartStoreBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);  
}




function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function removeCartItem(e) {
    let btnClicked = e.target;
    btnClicked.parentElement.remove();
    updateTotal();
}

function updateTotal() {
    let carContent = document.getElementsByClassName('car-content')[0],
        carBoxes = carContent.getElementsByClassName('cart-box'),
        total = 0;
    for (let r = 0; r < carBoxes.length; r++) {
        let cartBox = carBoxes[r],
            priceElem = cartBox.getElementsByClassName('cart-price')[0],
            quantityElem = cartBox.getElementsByClassName('cart-quantity')[0],
            price = parseFloat(priceElem.innerText.replace('$', '')),
            quantity = quantityElem.value;
            total = total + price * quantity; 
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
} 

/* Для PopUp */

const popUpRef = document.querySelectorAll('[data-modal]'),
    popUp = document.querySelector('.popUp');

function popUpOpen() {
    popUp.classList.add('show');
    popUp.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

popUpRef.forEach(item => {
    item.addEventListener('click', popUpOpen);
});

function popUpClose() {
    popUp.classList.add('hide');
    popUp.classList.remove('show');
    document.body.style.overflow = '';
}

popUp.addEventListener('click', e => {
    const t = e.target;
    if (t === popUp || t.getAttribute('data-close') == '') {
        popUpClose();
    }
});

document.addEventListener('keydown', e => {  
    const code = e.code;
    if (code === 'Escape' && popUp.classList.contains('show')) {
        popUpClose();
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

    popUpOpen();
    
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
        popUpClose();
    }, 5000);

    fetch('db.json')
    .then(data => data.json())
    .then(result => console.log(result));
}

