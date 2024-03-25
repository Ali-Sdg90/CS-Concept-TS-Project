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
