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
const itemClasses = [];
let categoryItems = [];
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
const ICARUSs = document.querySelectorAll(".ICARUS");
ICARUSs.forEach((ICARUS) => {
    ICARUS.addEventListener("click", () => {
        if (ICARUS.classList.contains("ICARUS")) {
            console.log("Aloha!");
            ICARUS.setAttribute("href", "https://also-ali-sdg90.github.io/ICARUS/");
            ICARUS.classList.remove("ICARUS");
            setTimeout(() => {
                ICARUS.removeAttribute("href");
            }, 0);
        }
    });
});
const catBtns = document.querySelectorAll(".category-item");
const catBtnsArray = Array.from(catBtns);
catBtnsArray.map((catBtn) => {
    catBtn.addEventListener("click", () => {
        console.log("=>", catBtn.textContent);
        namePosition = sortBtnPositionHandler(2, 0);
        pricePosition = sortBtnPositionHandler(2, 1);
        ratePosition = sortBtnPositionHandler(2, 2);
        categoryItems = itemClasses.filter((itemClass) => {
            if (catBtn.classList.contains("selected-catbtn")) {
                return itemClass.category;
            }
            return itemClass.category === catBtn.textContent?.toLowerCase();
        });
        if (!catBtn.classList.contains("selected-catbtn")) {
            catBtnsArray.map((catBtn) => {
                catBtn.classList.remove("selected-catbtn");
            });
            catBtn.classList.add("selected-catbtn");
        }
        else {
            catBtnsArray.map((catBtn) => {
                catBtn.classList.remove("selected-catbtn");
            });
        }
        itemSection.innerHTML = "";
        for (let categoryItem in categoryItems) {
            itemSection.innerHTML += categoryItems[categoryItem].createCard();
        }
    });
});
const sortFunc = (sortType, itemArray) => {
    let sortedCardsItem;
    if (sortType === "name") {
        sortedCardsItem = itemArray.sort();
    }
    else {
        sortedCardsItem = itemArray.sort((a, b) => {
            return a - b;
        });
    }
    return sortedCardsItem;
};
const sortItemsFunc = (sortType, itemPosition) => {
    const itemArray = categoryItems.map((card) => {
        card.title;
        switch (sortType) {
            case "name":
                return card.title;
            case "price":
                return card.price;
            case "rating":
                return card.rating.rate;
            default:
                return null;
        }
    });
    let sortedCardsItem;
    console.log(">>", itemPosition);
    switch (itemPosition) {
        case 1:
            sortedCardsItem = sortFunc(sortType, itemArray);
            break;
        case 2:
            sortedCardsItem = sortFunc(sortType, itemArray).reverse();
            break;
        default:
            sortedCardsItem = itemArray;
            break;
    }
    console.log("sortedCardsItem >>", sortedCardsItem);
    const sortedItems = sortedCardsItem.map((sortedCardItem) => {
        return categoryItems.filter((itemClass) => {
            switch (sortType) {
                case "name":
                    return itemClass.title === sortedCardItem;
                case "price":
                    return itemClass.price === sortedCardItem;
                case "rating":
                    return itemClass.rating.rate === sortedCardItem;
                default:
                    return null;
            }
        });
    });
    const sortedItemOutputs = sortedItems.map((sortedCard) => sortedCard[0].createCard());
    itemSection.innerHTML = "";
    sortedItemOutputs.map((sortedItemOutput) => (itemSection.innerHTML += sortedItemOutput));
};
const sortBtnPositionHandler = (itemPosition, sortArrowIndex) => {
    if (itemPosition === 3) {
        itemPosition = 0;
    }
    switch (++itemPosition) {
        case 1:
            sortArrow[sortArrowIndex].textContent = "⇓";
            break;
        case 2:
            sortArrow[sortArrowIndex].textContent = "⇑";
            break;
        case 3:
            sortArrow[sortArrowIndex].textContent = " ";
            break;
        default:
            break;
    }
    return itemPosition;
};
const sortBtns = document.querySelectorAll(".sort-btn");
const sortBtnsArray = Array.from(sortBtns);
const sortArrow = document.querySelectorAll(".sort-arrow");
let namePosition = 0;
let pricePosition = 0;
let ratePosition = 0;
sortBtnsArray.map((sortBtn, index) => {
    sortBtn.addEventListener("click", () => {
        switch (index) {
            case 0:
                console.log("=> Name");
                namePosition = sortBtnPositionHandler(namePosition, 0);
                pricePosition = sortBtnPositionHandler(2, 1);
                ratePosition = sortBtnPositionHandler(2, 2);
                sortItemsFunc("name", namePosition);
                break;
            case 1:
                console.log("=> Price");
                namePosition = sortBtnPositionHandler(2, 0);
                pricePosition = sortBtnPositionHandler(pricePosition, 1);
                ratePosition = sortBtnPositionHandler(2, 2);
                sortItemsFunc("price", pricePosition);
                break;
            case 2:
                console.log("=> Rating");
                namePosition = sortBtnPositionHandler(2, 0);
                pricePosition = sortBtnPositionHandler(2, 1);
                ratePosition = sortBtnPositionHandler(ratePosition, 2);
                sortItemsFunc("rating", ratePosition);
                break;
            default:
                break;
        }
    });
});
//# sourceMappingURL=app.js.map