const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

const renderProduct = (title = '', price = 0, img = 'img/no_image.png') => {
    return `<div class="products__item">
            <img src="${img}" width="50px" height="50px" alt="${title}">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="products__button">Добавить</button>
          </div>`;
};

const renderProducts = list => {
    const productList = list.map(item => renderProduct(item.title, item.price));
    document.querySelector('.products__wrap').innerHTML = productList.join('');
};

// Упрощение записи, но как по мне, лучше все разбивать на подблоки
// const renderProducts = list => {
//     document.querySelector('.products__wrap').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
// };

// const basket = {
//     products: [
//         {id: 1, title: 'Notebook', price: 1000},
//         {id: 2, title: 'Mouse', price: 100},
//         {id: 3, title: 'Keyboard', price: 250},
//         {id: 4, title: 'Gamepad', price: 150},
//     ],
//
//     renderProduct: (title = '', price = 0, img = 'img/no_image.png') => {
//         return `<div class="products__item">
//             <img src="${img}" width="50px" height="50px" alt="${title}">
//             <h3>${title}</h3>
//             <p>${price}</p>
//             <button class="products__button">Добавить</button>
//           </div>`;
//     },
//
//     renderProducts: list => {
//         // const productList = list.map((item) => {
//         //     this.renderProduct(item.title, item.price);
//         // });
//         document.querySelector('.products__wrap').innerHTML = list.map((item) =>
//         this.renderProduct(item.title, item.price).join(''));
//     },
// };
//
//
// basket.renderProducts(basket.products);

renderProducts(products);