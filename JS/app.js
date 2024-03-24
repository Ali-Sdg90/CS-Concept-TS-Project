"use strict";
console.log("jello");
const getData = async () => {
    return new Promise(async (resolve, reject) => {
        const data = await fetch("https://fakestoreapi.com/products");
        try {
            resolve(data.json());
        }
        catch (err) {
            reject(err);
        }
    });
};
class Items {
    id;
    title;
    price;
    description;
    category;
    image;
    rating;
    constructor(id, title, price, description, category, image, rating) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
    }
    createCard = () => {
        return `
            <div class="item-box">
                <img class="item-image" src="${this.image}" alt="item-image" />

                <div class="item-title" title=${this.title}>${this.title}</div>

                <div class="item-info">
                    <div class="item-price">${this.price} $</div>
                    <div class="item-rating">${this.rating.rate}/5</div>
                </div>

                <div class="item-category">${this.category}</div>
            </div>
        `;
    };
}
const itemSection = document.querySelector(".items-section");
const addCards = async () => {
    const items = (await getData());
    const itemClasses = [];
    itemSection.innerHTML = "";
    items.map((item, index) => {
        itemClasses[index] = new Items(item.id, item.title, item.price, item.description, item.category, item.image, item.rating);
        itemSection.innerHTML += itemClasses[index].createCard();
    });
};
addCards();
//# sourceMappingURL=app.js.map