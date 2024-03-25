"use strict";
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
//# sourceMappingURL=sortSection.js.map