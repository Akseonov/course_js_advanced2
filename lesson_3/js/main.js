const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                } else {
                    resolve(this.response);
                }
            }
        };
        xhr.send();
    })
};

class ProductList {
    constructor(container = '.products__wrap') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this._render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product, product.img);
            // this.endPrice = ProductList.priceCount(this.endPrice, productObject.price);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
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

class BasketList {
    constructor(container = '.basket__wrap') {
        this.container = container;
        this.goods = [];
        this.allBasket = [];
        this.endPrice = 0;
        this._getBasket()
            .then(data => {
                this.goods = [...data.contents];
                this._render();
            });
    }

    static priceCount(endPrice, price) {
        endPrice = endPrice + price;
        return endPrice;
    }

    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let basket of this.goods) {
            const basketObject = new BasketItem(basket);
            this.endPrice = BasketList.priceCount(this.endPrice, basketObject.price);
            this.allBasket.push(basketObject);
            block.insertAdjacentHTML('beforeend', basketObject.render())
        }

        block.insertAdjacentHTML('afterend', `<div class="products__price">
            <div>${this.endPrice} руб</div>
        </div>`);
    }
}

class BasketItem {
    constructor(basket, img = 'img/no_image.png') {
        this.title = basket.title;
        this.price = basket.price;
        this.id = basket.id;
        this.img = img;
    }

    render() {
        return `<div class="basket__item">
                  <img src="${this.img}" width="50px" height="50px" alt="${this.title}">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                  <button class="basket__button">Добавить</button>
                </div>`;
    }
}

const list = new ProductList();
const Basket = new BasketList();

