const itemSection = document.querySelector(".items-section") as HTMLElement;

const addCards = async () => {
    const items: Iitem[] = (await getData()) as Iitem[];

    itemSection.innerHTML = "";

    items.map((item, index) => {
        // Add classes into itemClasses array
        itemClasses[index] = new Items(
            item.id,
            item.title,
            item.price,
            item.description,
            item.category,
            item.image,
            item.rating
        );

        // Add Initial items to HTML
        itemSection.innerHTML += itemClasses[index].createCard();
    });

    categoryItems = itemClasses;
};

addCards();
