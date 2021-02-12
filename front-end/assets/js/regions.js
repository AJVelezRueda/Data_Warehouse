const regionSection = document.getElementById('region-section');
const regionsButton = document.getElementById('region-nav-button');

function getRegions() {
    return getResource(createUrl('regions'));
}

async function getListofRegions() {
    const regions = await getRegions();
    return regions.countries;
}

function getCountries() {
    return getResource(createUrl('countries'));
}

async function getListofCountries() {
    const countries = await getCountries();
    return countries.countries;
}

function getCityById(id) {
    return getResource(createUrlById('cities', id));

}

function getRegionById(id) {
    return getResource(createUrlById('regions', id));
}

function getCountryById(id) {
    return getResource(createUrlById('countries', id));
}

async function createRegion(regionName) {
    const resourceData = {
        name: regionName
    };
    await createResource('regions', resourceData);
}

async function createCountry(CountryName, regions_id) {
    const resourceData = {
        name: CountryName,
        regions_id: regions_id
    };
    await createResource('countries', resourceData);
}

async function createCity(cityName, countries_id) {
    const resourceData = {
        name: cityName,
        countries_id: countries_id
    };
    await createResource('cities', resourceData);
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

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createRegion(getingInputData(input));
        }
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

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log(getingInputData(input));
        }
    });

    return countryRow;
}

function createCityySection(cityName) {
    const cityRow = createSection("city-row", "city-row");
    const cityTittleDiv = createDiv("region-tittle", "city-row-tittle");
    const cityIconDiv = createIconsSection(cityName);

    cityRow.appendChild(cityTittleDiv);
    cityTittleDiv.appendChild(cityIconDiv);

    return cityRow;
}




async function regionSectionAnable() {
    const sectionHeader = createSection("region-section-header", "region-section-header");
    const rowSection = createSection("region-row", "region-row");
    const rowHead = createSection("region-head", "region-head");
    const countries = await getListofCountries();
    const regions = await getListofRegions();
    ///Esta linea de abajo hay que agregarla despues del get a countries
    //const countryRow = createCountrySection('argentina');
    const countryList = createDiv("countries-list", "countries-list");
    const cityList = createDiv("cities-list", "cities-list");
    const cityRow = createCityySection('sandanga');
    const closeButton = createCloseButton();

    objectBluringAndFocusing(contactsSection);
    enableDomObject(regionSection);

    regionHeaderRender(sectionHeader, 'region', 'Region');
    regionHeaderRender(rowHead, 'sudamerica', 'País');

    countries.forEach(element => {
        const countryRow = createCountrySection(element.name);
        countryList.appendChild(countryRow);
        countryRow.appendChild(cityList);
    })

    regionSection.appendChild(sectionHeader);
    rowSection.appendChild(rowHead);
    rowSection.appendChild(countryList);
    cityList.appendChild(cityRow);
    regionSection.appendChild(closeButton);
    regionSection.appendChild(rowSection);


    closeButton.addEventListener("click", () => {
        regionSection.removeChild(sectionHeader);
        regionSection.removeChild(rowSection);
        rowSection.removeChild(countryList);
        regionSection.removeChild(closeButton);

        disableDomObject(regionSection);
        objectBluringAndFocusing(contactsSection);

    });
}

regionsButton.addEventListener("click", () => {
    regionSectionAnable();
});