const moreOptionsIcon = document.getElementById("expand-options-img");
const moreOptionsSections = document.getElementById("more-options");

moreOptionsIcon.addEventListener("click", () => {
    enableDomObject(moreOptionsSections);
})