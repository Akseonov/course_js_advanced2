class ProductList {
    constructor(container = '.products__wrap') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.endPrice = 0;
        this._getProducts();
        this._render();
    }

    static priceCount(endPrice, price) {
        endPrice = endPrice + price;
        return endPrice;
    }

    _getProducts() {
        this.goods = [
            {id: 1, title: 'Laptop', price: 1000, img: 'img/laptop.jpg'},
            {id: 2, title: 'Mouse', price: 100},
            {id: 3, title: 'Keyboard', price: 250},
            {id: 4, title: 'Gamepad', price: 150},
        ]
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product, product.img);
            this.endPrice = ProductList.priceCount(this.endPrice, productObject.price);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }

        block.insertAdjacentHTML('afterend', `<div class="products__price">
            <div>${this.endPrice} руб</div>
        </div>`);
    }
}

class ProductItem {
    constructor(product, img = 'img/no_image.png') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="products__item">
                  <img src="${this.img}" width="50px" height="50px" alt="${this.title}">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                  <button class="products__button">Добавить</button>
                </div>`;
    }
}

// class CartList {
//     constructor(cart = '.cart__wrap') {
//         this.cart = cart;
//         this.goods = [];
//     }
//
//
//
//     /**
//      * Добавляет товар в корзину, вызывается в классе продукт лист с помощью события.
//      * добавляет информацию о товаре в массив goods
//      */
//     addProduct() {
//
//     }
//
//     /**
//      * Удаляет товар из корзины и массива goods
//      */
//     removeProduct() {
//
//     }
//
//     /**
//      * проверяет имеется ли такой же товар в корзине, если да, до добавлет к массиву элемент счетчика и увеличивает его.
//      */
//     checkCount() {
//
//     }
//
//     /**
//      * Метод вывода всех товаров корзины. так же в конце добавлет итоговую стоимость товаров.
//      */
//     render() {
//
//     }
// }
//
// class CartItem {
//     constructor (product, img = 'img/no_image.png') {
//         this.title = product.title;
//         this.price = product.price;
//         this.id = product.id;
//         this.img = img;
//     }
//
//     /**
//      * Выводит блоки в DOM с информацией о товарах
//      */
//     render() {
//         return `<div class="cart__item">
//                   <img src="${this.img}" width="50px" height="50px" alt="${this.title}">
//                   <h3>${this.title}</h3>
//                   <p>${this.price}</p>
//                   <button class="cart__button">Добавить</button>
//                 </div>`;
//                 //<p>Count</p> - так же добавляется счетчик товара.
//     }
// }

const list = new ProductList();

