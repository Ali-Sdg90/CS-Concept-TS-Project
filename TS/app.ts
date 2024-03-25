console.log("jello");

// fetch("https://fakestoreapi.com/products")
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error("There was a problem with the fetch operation:", error);
//     });

const getData = async () => {
    return new Promise(async (resolve, reject) => {
        const data = await fetch("https://fakestoreapi.com/products");

        try {
            resolve(data.json());
        } catch (err) {
            reject(err);
        }
    });
};

interface Iitem {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };

    createCard(): string;
}

class Items implements Iitem {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public description: string,
        public category: string,
        public image: string,
        public rating: {
            rate: number;
            count: number;
        }
    ) {}

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

const itemSection = document.querySelector(".items-section") as HTMLElement;

const itemClasses: Items[] = [];
let categoryItems: Items[] = [];

const addCards = async () => {
    const items: Iitem[] = (await getData()) as Iitem[];

    itemSection.innerHTML = "";

    items.map((item, index) => {
        itemClasses[index] = new Items(
            item.id,
            item.title,
            item.price,
            item.description,
            item.category,
            item.image,
            item.rating
        );

        itemSection.innerHTML += itemClasses[index].createCard();
    });

    categoryItems = itemClasses;
};

addCards();

// ICARUS Easter Egg :)
const ICARUSs = document.querySelectorAll(".ICARUS") as NodeListOf<HTMLElement>;

ICARUSs.forEach((ICARUS) => {
    ICARUS.addEventListener("click", () => {
        if (ICARUS.classList.contains("ICARUS")) {
            console.log("Aloha!");

            ICARUS.setAttribute(
                "href",
                "https://also-ali-sdg90.github.io/ICARUS/"
            );
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
        } else {
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
