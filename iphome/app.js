const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

const products = [
    {
        id: 1,
        name: 'Pizza Margherita',
        image: '1.PNG',
        variationImage: 'fatia 1.png',
        price: 'R$60,00'
    },
    {
        id: 2,
        name: 'Pizza Cogumelos',
        image: '2.PNG',
        price: 'R$75,00'
    },
    {
        id: 3,
        name: 'Pizza Calabresa',
        image: '3.PNG',
        price: 'R$45,00'
    },
    {
        id: 4,
        name: 'Pizza Brigadeiro',
        image: '4.PNG',
        price: 'R$55,00'
    },
    {
        id: 5,
        name: 'Pizza Banana Caramelizada',
        image: '5.PNG',
        price: 'R$60,00'
    },
    {
        id: 6,
        name: 'Pizza Doce de Leite com Avelã',
        image: '6.PNG',
        price: 'R$80,00'
    }
];

const listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div class="image-container" onmouseover="showVariation(${value.id})" onmouseout="hideVariation(${value.id})">
                <img src="image/${value.image}" id="productImage${value.id}">
                <img src="image/${value.variationImage}" class="variation" id="variationImage${value.id}">
            </div>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Adicionar</button>`;
        list.appendChild(newDiv);
    });
};

initApp();

const addToCard = (key) => {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
};

const reloadCard = () => {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        count += value.quantity;

        if (value != null) {
            const productPrice = parseFloat(value.price.replace('R$', '').replace(',', '.'));
            totalPrice += value.quantity * productPrice;

            const newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>R$${(value.quantity * productPrice).toFixed(2).replace('.', ',')}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = `R$${totalPrice.toFixed(2).replace('.', ',')}`;
    quantity.innerText = count;
};

const changeQuantity = (key, quantity) => {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        const productPrice = parseFloat(products[key].price.replace('R$', '').replace(',', '.'));
        listCards[key].price = `R$${(quantity * productPrice).toFixed(2).replace('.', ',')}`;
    }
    reloadCard();
};

const showVariation = (productId) => {
    const variationImage = document.getElementById(`variationImage${productId}`);
    if (productId === 1 && variationImage) {
        variationImage.style.display = 'block';
    }
};

const hideVariation = (productId) => {
    const variationImage = document.getElementById(`variationImage${productId}`);
    if (productId === 1 && variationImage) {
        variationImage.style.display = 'none';
    }
};
