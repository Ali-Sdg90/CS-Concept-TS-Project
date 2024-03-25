const sortFunc = (
    sortType: "name" | "price" | "rating",
    itemArray: (string | number | null)[]
) => {
    let sortedCardsItem: string[] | number[];

    if (sortType === "name") {
        sortedCardsItem = (itemArray as string[]).sort();
    } else {
        sortedCardsItem = (itemArray as number[]).sort(
            (a: number, b: number): number => {
                return a - b;
            }
        );
    }

    return sortedCardsItem;
};

const sortItemsFunc = (
    sortType: "name" | "price" | "rating",
    itemPosition: number
) => {
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

    let sortedCardsItem: (string | number | null)[];

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
    // console.log("sortedItems >>", sortedItems);

    const sortedItemOutputs = sortedItems.map((sortedCard) =>
        sortedCard[0].createCard()
    );
    // console.log("sortedItemOutputs >>", sortedItemOutputs);

    itemSection.innerHTML = "";
    sortedItemOutputs.map(
        (sortedItemOutput) => (itemSection.innerHTML += sortedItemOutput)
    );
};

const sortBtnPositionHandler = (
    itemPosition: number,
    sortArrowIndex: number
) => {
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

const sortBtns = document.querySelectorAll(
    ".sort-btn"
) as NodeListOf<HTMLElement>;
const sortBtnsArray = Array.from(sortBtns);

const sortArrow = document.querySelectorAll(
    ".sort-arrow"
) as NodeListOf<HTMLElement>;

sortBtnsArray.map((sortBtn, index) => {
    sortBtn.addEventListener("click", () => {
        switch (index) {
            case 0:
                console.log("=> Name");

                namePosition = sortBtnPositionHandler(namePosition, 0);
                pricePosition = sortBtnPositionHandler(2, 1);
                ratePosition = sortBtnPositionHandler(2, 2);

                // const cardsName = itemClasses.map((card) => card.title);
                // // console.log("cardsName >>", cardsName);

                // const sortedCardsName = cardsName.sort();
                // // console.log("sortedCardsName >>", sortedCardsName);

                // const sortedNames = sortedCardsName.map((sortedCardName) => {
                //     return itemClasses.filter(
                //         (itemClass) => itemClass.title === sortedCardName
                //     );
                // });
                // // console.log("sortedNames >>", sortedNames);

                // const sortedNameOutputs = sortedNames.map((sortedCard) =>
                //     sortedCard[0].createCard()
                // );
                // // console.log("sortedNameOutputs >>", sortedNameOutputs);

                // itemSection.innerHTML = "";
                // sortedNameOutputs.map(
                //     (sortedNameOutput) =>
                //         (itemSection.innerHTML += sortedNameOutput)
                // );

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
