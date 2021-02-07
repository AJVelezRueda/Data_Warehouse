const regionSection = document.getElementById('region-section');
const contactsSection = document.getElementById('contacts-section');
const regiosnButton = document.getElementById('region-nav-button');

function getRegions() {
    return getResource(createUrl('regions'));
}


async function createRegion() {
    const resourceData = {
        name: "Latam"
    };
    createResource('regions', resourceData);
}