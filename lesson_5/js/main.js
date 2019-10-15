const API = 'http://localhost:3000';

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     let error = new Error(this.statusText);
//                     error.code = this.status;
//                     reject(error);
//                 } else {
//                     resolve(this.response);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

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
        this._addToCart()
    }

    _getProducts() {
        return fetch(`${API}/catalog`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _render() {
        const $block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product, product.img);
            // this.endPrice = ProductList.priceCount(this.endPrice, productObject.price);
            this.allProducts.push(productObject);
            $block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    _addToCart() {
        const $block = document.querySelector(this.container);

        $block.addEventListener('click', (event) => {
            if (event.target.classList.contains('products__button')) {
                // const id = event.target.dataset.id;
                const basketObject = new BasketList();
                basketObject.add(event.target.dataset.id, event.target.dataset);
            }
        })
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
                  <p>${this.price} руб.</p>
                  <button class="products__button"
                    data-id="${this.id}" 
                    data-title="${this.title}" 
                    data-price="${this.price}">
                    Добавить
                  </button>
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
                this.goods = [...data];
                this.render();
            });
        this.change()

    }

    static priceCount(endPrice, price) {
        endPrice = endPrice + +price;
        return endPrice;
    }

    _getBasket() {
        return fetch(`${API}/basket`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _update(id, value) {
        if (value < 1) {
            if(confirm('Действительно хотите удалить последний товар из корзины?')) {
                fetch(`${API}/basket/${id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        const $item = document.querySelector(`.basket__wrap div[data-id="${id}"]`);
                        if ($item) {
                            $item.remove();
                        }
                    })
            }
        } else {
            fetch(`${API}/basket/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({count: +value}),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        }
    }

    add(id, item) {
        fetch(`${API}/basket`, {
            method: 'POST',
            body: JSON.stringify({...item, count: 1}),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
            .then(() => {
                const $item = document.querySelector(`.basket__wrap`);
                $item.innerHTML = '';
                this.render();
            });
    }

    change() {
        const $block = document.querySelector(this.container);

        $block.addEventListener('change', (event) => {
            if (event.target.classList.contains('basket__count')) {
                const $parant = event.target.parentElement;
                this._update($parant.dataset.id, event.target.value);
            }
        })
    }

    render() {
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
        this.count = basket.count;
    }

    render() {
        return `<div class="basket__item" data-id="${this.id}">
                  <img src="${this.img}" width="50px" height="50px" alt="${this.title}">
                  <h3>${this.title}</h3>
                  <input class="basket__count" type="number" value="${+this.count}">
                  <p>${this.price} руб.</p>
                  <button class="basket__button">Удалить</button>
                </div>`;
    }
}

const list = new ProductList();
const Basket = new BasketList();

