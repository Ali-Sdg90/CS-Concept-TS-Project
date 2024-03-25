"use strict";
const itemSection = document.querySelector(".items-section");
const addCards = async () => {
    const items = (await getData());
    itemSection.innerHTML = "";
    items.map((item, index) => {
        itemClasses[index] = new Items(item.id, item.title, item.price, item.description, item.category, item.image, item.rating);
        itemSection.innerHTML += itemClasses[index].createCard();
    });
    categoryItems = itemClasses;
};
addCards();
//# sourceMappingURL=initialAddCards.js.map