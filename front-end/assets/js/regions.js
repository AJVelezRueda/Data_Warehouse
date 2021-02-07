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
    const divSectionHeader = document.createElement('div');
    const divTittle = document.createElement('div');
    const divInput = document.createElement('div');
    const sectionCountry = document.createElement('section');

    contactsSection.classList.add('disable');
    regionSection.classList.remove('disable');
    regionSection.classList.add('enable');



}



regionsButton.addEventListener("click", () => {
    regionSectionAnable();
});