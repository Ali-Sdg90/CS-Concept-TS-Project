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
