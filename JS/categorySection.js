"use strict";
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
//# sourceMappingURL=categorySection.js.map