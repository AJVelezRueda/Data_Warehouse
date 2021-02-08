const regionSection = document.getElementById('region-section');
const contactsSection = document.getElementById('contacts-section');
const regionsButton = document.getElementById('region-nav-button');

function getRegions() {
    return getResource(createUrl('regions'));
}

async function createRegion(regionName) {
    const resourceData = {
        name: regionName
    };
    await createResource('regions', resourceData);
}

function createIconsSection(tittleText) {
    const iconSection = document.createElement('div');
    const tittle = document.createElement('h3');
    const deleteImg = creatImgObject("./assets/images/trash.png", "trash", "trash");
    const editImg = creatImgObject("./assets/images/pen.png", "pen", "pen");

    iconSection.className = "icons-section";
    tittle.innerHTML = `${ tittleText }`;

    iconSection.appendChild(tittle);
    iconSection.appendChild(deleteImg);
    iconSection.appendChild(editImg);

    return iconSection;
}

function regionHeaderRender(parent, tittleText, buttonText) {
    const divTittle = document.createElement('div');
    const divInput = document.createElement('div');
    const tittle = document.createElement('h2');
    const addButton = createButton('Agregar ' + buttonText, "add-" + buttonText);
    const label = createLabel(tittleText + "-name", buttonText + " name");
    const input = createInputTextType(tittleText + "-name", buttonText + " name...");


    divTittle.className = 'region-tittle';
    divInput.className = `region-input disable`;

    tittle.innerHTML = `${ tittleText }`;

    divTittle.appendChild(tittle);
    divTittle.appendChild(addButton);

    divInput.appendChild(label);
    divInput.appendChild(input);

    parent.appendChild(divTittle);
    parent.appendChild(divInput);


    addButton.addEventListener("click", () => {
        enableDomObject(divInput);
    });
}

function createCountrySection(countryName) {
    const countryRow = createSection("country-row", "country-row");
    const countryRowHead = createSection("country-section", "country-section");
    const countryTittleDiv = createDiv("region-tittle", "country-row-tittle");
    const countryInputDiv = createDiv("city-input disable", "city-input");
    const countryIconDiv = createIconsSection(countryName);
    const addButton = createButton('Agregar ciudad', "add-city");
    const label = createLabel("city-name", "Ciudad ");
    const input = createInputTextType("city-name", "City name...");

    countryTittleDiv.appendChild(countryIconDiv);
    countryTittleDiv.appendChild(addButton);
    countryInputDiv.appendChild(label);
    countryInputDiv.appendChild(input);

    countryRowHead.appendChild(countryTittleDiv);
    countryRowHead.appendChild(countryInputDiv);

    countryRow.appendChild(countryRowHead);

    addButton.addEventListener("click", () => {
        enableDomObject(countryInputDiv);
    });

    return countryRow;
}

function regionSectionAnable() {
    const sectionHeader = createSection("region-section-header", "region-section-header");
    const rowSection = createSection("region-row", "region-row");
    const rowHead = createSection("region-head", "region-head");
    const countryRow = createCountrySection('argentina');
    const closeButton = createCloseButton();

    objectBluringAndFocusing(contactsSection);
    enableDomObject(regionSection);

    regionHeaderRender(sectionHeader, 'region', 'Region');
    regionHeaderRender(rowHead, 'sudamerica', 'País');

    regionSection.appendChild(sectionHeader);
    rowSection.appendChild(rowHead);
    regionSection.appendChild(closeButton);
    regionSection.appendChild(rowSection);
    regionSection.appendChild(countryRow);


    closeButton.addEventListener("click", () => {
        regionSection.removeChild(sectionHeader);;
    })
}


regionsButton.addEventListener("click", () => {
    regionSectionAnable();
});