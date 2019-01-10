//Menu items

//Hamburgers
//Hamburger types of size
Hamburger.SIZE_SMALL = {name: "SMALL" , price: 50, calories: 20, type: "hamburger"};
Hamburger.SIZE_LARGE = {name: "SMALL" , price: 100, calories: 40, type: "hamburger"};

//Hamburger types of stuffing
Hamburger.STUFFING_CHEESE = {name: "CHEESE" , price: 10, calories: 20, type: "stuffing"};
Hamburger.STUFFING_SALAD = {name: "SALAD" , price: 20, calories: 5, type: "stuffing"};
Hamburger.STUFFING_POTATO = {name: "POTATO" , price: 15, calories: 10, type: "stuffing"};

//Salads
Salad.CESAR = {name: "CESAR" , price: 100, calories: 20};
Salad.OLIVIER = {name: "OLIVIER" , price: 50, calories: 80};

// Drinks
Drink.COLA = {name: "COLA" , price: 50, calories: 40};
Drink.COFFEE = {name: "COFFEE" , price: 80, calories: 20};


function MenuItem(price, calories) {
    this.price = price;
    this.calories = calories;
}

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
MenuItem.prototype.calculatePrice  = function () {
    return this.price;
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
MenuItem.prototype.calculateCalories = function() {
    return this.calories;
};


//Hamburger
function Hamburger(size, stuffing) {
    if (arguments.length > 2) {
        throw new Error ("You have provided too much information about the hamburger. Please specify size and stuffing only.");
    } else if (arguments.length === 0) {
        throw new Error ("You have not specified size and stuffing of hamburger.");
    } else if (arguments.length === 1) {
        let provided_info = Array.prototype.slice.call(arguments)[0];
        if (provided_info.type === "hamburger") {
            throw new Error ("You have not specified the information about the stuffing of hamburger!");
        } else {
            throw new Error ("You have not specified the information about the size of hamburger!");
        }
    } else {
        MenuItem.call(this);
        this.size = size.name;
        this.stuffing = stuffing.name;
        this.price = size.price + stuffing.price;
        this.calories = size.calories + stuffing.calories;
    }

}

//Methods inheritance
Hamburger.prototype = Object.create(MenuItem.prototype);

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function() {
    return this.size;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing  = function() {
    return this.stuffing;
};




//Salads
const ONE_UNIT_OF_SALAD_IN_GRAM = 100;

function Salad(salad, grams) {
    if (arguments.length > 2) {
        throw new Error ("You have provided too much information about the salad. Please specify salad and its weight in grams only.");
    } else if (arguments.length === 0) {
        throw new Error ("You have not specified salad and its weight in grams.");
    } else if (arguments.length === 1) {
        if (typeof Array.prototype.slice.call(arguments)[0] === "object") {
            throw new Error ("You have not specified the weight of the salad!")
        } else {
            throw new Error ("You have not specified the salad!")
        }
    } else {
        MenuItem.call(this);
        this.price = (salad.price * grams) / ONE_UNIT_OF_SALAD_IN_GRAM;
        this.calories = salad.calories;
        this.weight = grams;
        this.name = salad.name;
    }
}

Salad.prototype = Object.create(MenuItem.prototype);

/**
 * Узнать вес салата
 */
Salad.prototype.getWeight = function() {
    return this.weight;
};

/**
 * Узнать название салата
 */
Salad.prototype.getSaladName = function() {
    return this.name;
};

//Drinks
function Drink(drink) {
    if (arguments.length === 0) {
        throw new Error ("You have not provided any information about the drink!");
    } else {
        MenuItem.call(this);
        this.price = drink.price;
        this.calories = drink.calories;
        this.name = drink.name;
        this.paid = false;
    }
}

Drink.prototype = Object.create(MenuItem.prototype);

/**
 * Узнать название напитка
 */
Drink.prototype.getDrinkName = function() {
    return this.name;
};

function Order() {
    this.orderItems = Array.prototype.slice.call(arguments);
}

/**
 * Узнать цену заказа
 */
Order.prototype.getOrderPrice = function() {
    return this.orderItems.reduce(function(sum, currentItem) {return sum + currentItem.calculatePrice()}, 0);;
};

/**
 * Узнать калории заказа
 */
Order.prototype.getOrderCalories = function() {
    return this.orderItems.reduce(function(sum, currentItem) {return sum + currentItem.calculateCalories()}, 0);
};

/**
 * Добавить позицию в заказ
 */
Order.prototype.addItem = function(item) {
    if (arguments.length > 0) {
        if (!this.paid) {
            this.orderItems.push(item);
        } else {
            throw new Error("The order cannot be changed because it has been already paid!");
        }
    } else {
        throw new Error("You have not specified any item to add!");
    }
};

/**
 * Удалить позицию из заказа
 */
Order.prototype.removeItem = function(item) {
    if (!this.paid) {
        let indexItem = this.orderItems.indexOf(item);
        if (indexItem > -1) {
            this.orderItems.splice(indexItem, 1);
        } else {
            throw new Error("Your order does not include this item!");
        }
    } else {
        throw new Error("The order cannot be changed because it has been already paid!");
    }
};

/**
 * Оплатить заказ
 */
Order.prototype.pay = function() {
  if (!this.paid) {
      this.paid = true;
  } else {
      throw new Error("Your order has been already paid!");
  }
};

/**
 * Узнать, оплачен ли заказ
 */
Order.prototype.checkIfPaid = function() {
    if (this.paid) {
        return "Order is paid"
    } else {
        return "Order is not paid yet"
    }
};

//Tests
let hamburger1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
let hamburger2 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
let hamburger3 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);

hamburger1.getSize();
hamburger1.calculatePrice();
hamburger1.calculateCalories();
hamburger1.getStuffing();

let salad1 = new Salad(Salad.CESAR, 400);

salad1.getSaladName();
salad1.getWeight();

let drink1 = new Drink(Drink.COFFEE);

drink1.getDrinkName();

let order = new Order(hamburger1, salad1, drink1);
// order.addItem(); //"You have not specified the item to add!"
order.addItem(hamburger2);
order.getOrderPrice();
order.addItem(hamburger3);
order.removeItem(hamburger3);
order.checkIfPaid();
order.pay();
order.checkIfPaid();



