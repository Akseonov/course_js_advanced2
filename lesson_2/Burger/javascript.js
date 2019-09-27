class Hamburger {
    constructor(size, stuffing) {

    }
    addTopping(topping) {
        // Добавить добавку
    }
    removeTopping(topping) {
        // Убрать добавку
    }

    getToppings() {
        // Получить список добавок
        let checked = [];
        let count = 2;
        for (let i = 0; i < count; i++) {
            if(document.getElementById('checked' + i).checked) {
                checked.push({ price: ('checked' + i).getAttribute('data-price'),
                    cal: ('checked' + i).getAttribute('data-cal')})
            }
        }
        return checked;
    }

    getSize() {
        // Узнать размер гамбургера
    }
    getStuffing() {
        // Узнать начинку гамбургера
    }
    calculatePrice() {
        // Узнать цену
    }
    calculateCalories() {
        // Узнать калорийность
    }
}