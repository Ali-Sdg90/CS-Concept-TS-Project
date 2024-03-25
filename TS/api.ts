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
//         console.error("ERROR >>", error);
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
