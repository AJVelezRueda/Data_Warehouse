const regionSection = document.getElementById('region-section');
const contactsSection = document.getElementById('contacts-section');
const regionsButton = document.getElementById('region-nav-button');

function getRegions() {
    return getResource(createUrl('regions'));
}

async function createRegion() {
    const resourceData = {
        name: "Latam"
    };
    await createResource('regions', resourceData);
}

function regionSectionAnable() {
    contactsSection.classList.add('disable');
    regionSection.classList.remove('disable');
}



regionsButton.addEventListener("click", () => {
    regionSectionAnable();
});