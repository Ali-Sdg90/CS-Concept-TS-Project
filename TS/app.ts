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

const addCards = async () => {
    const items: Iitem[] = (await getData()) as Iitem[];

    const itemClasses: Items[] = [];

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
