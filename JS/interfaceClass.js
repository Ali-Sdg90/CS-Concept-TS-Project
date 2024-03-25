"use strict";
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
//# sourceMappingURL=interfaceClass.js.map