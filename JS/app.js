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
const addCards = async () => {
    const items = (await getData());
    itemSection.innerHTML = "";
    items.map((item, index) => {
        itemClasses[index] = new Items(item.id, item.title, item.price, item.description, item.category, item.image, item.rating);
        itemSection.innerHTML += itemClasses[index].createCard();
    });
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
        const categoryItems = itemClasses.filter((itemClass) => {
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
//# sourceMappingURL=app.js.map