"use strict";
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
//# sourceMappingURL=api.js.map