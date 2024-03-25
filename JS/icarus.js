"use strict";
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
//# sourceMappingURL=icarus.js.map