const moreOptionsIcon = document.getElementById("expand-options-img");
const moreOptionsSections = document.getElementById("more-options");

$(moreOptionsIcon).on("click", () => {
   $(moreOptionsSections).toggleClass(["disable", "enable"]);
})