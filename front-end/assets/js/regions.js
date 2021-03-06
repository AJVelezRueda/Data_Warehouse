const regionSection = document.getElementById('region-section');
const regionsButton = document.getElementById('region-nav-button');

function getRegions() {
    return getResource(createUrl('regions'));
}

async function getListofRegions() {
    const regions = await getRegions();
    return regions.regions;
}

function getCountries() {
    return getResource(createUrl('countries'));
}

function getCities() {
    return getResource(createUrl('cities'));
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
    tittle.innerHTML = `${tittleText}`;

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
    const actions = createActionsDiv();
    const $actions = $(actions);
    
    divTittle.className = 'region-tittle';
    divInput.className = `region-input disable`;
    
    tittle.innerHTML = `${tittleText}`;
    
    divTittle.appendChild(actions);
    divTittle.appendChild(tittle);
    divTittle.appendChild(addButton);

    divInput.appendChild(label);
    divInput.appendChild(input);

    parent.appendChild(divTittle);
    parent.appendChild(divInput);


    addButton.addEventListener("click", () => {
        enableDomObject(divInput);
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            try {
                const regionId = input.closest(".region-row").dataset.regionId;
                createCountry(getingInputData(input), regionId);
                alert("El país se creó correctamente");
                window.location.href = 'index.html';
            } catch {
                createRegion(getingInputData(input));
                alert("La región se creó correctamente");
                window.location.href = 'index.html';
            }
        }
    });

    $actions.find(".trash").on("click", () => {
        const alertDiv = deleteActionAlert("Está a punto de eleminar una Region");
        const $alertDiv = $(alertDiv);
        objectBluringAndFocusing(regionSection);
                
        $alertDiv.on("click", () => {
            $("#alert-section").toggleClass(["enable","disable"])
            objectBluringAndFocusing(regionSection);
        });
    });
        
}

function createCountrySection(countryName, regionId, countryId) {
    const countryRow = createSection("country-row", "country-row-" + countryName);
    const countryRowHead = createSection("country-section", "country-section");
    const countryTittleDiv = createDiv("country-tittle", "country-row-tittle-" + countryName);
    const countryInputDiv = createDiv("city-input disable", "city-input");
    const countryIconDiv = createIconsSection(countryName);

    const addButton = createButton('Agregar ciudad', "add-city");
    const label = createLabel("city-name", "Ciudad ");
    const input = createInputTextType("city-name", "City name...");

    countryRow.dataset.regionId = regionId;
    countryRowHead.dataset.country = countryId;
    countryTittleDiv.appendChild(countryIconDiv);
    countryTittleDiv.appendChild(addButton);
    countryInputDiv.appendChild(label);
    countryInputDiv.appendChild(input);

    countryRowHead.appendChild(countryTittleDiv);
    countryRowHead.appendChild(countryInputDiv);

    countryRow.appendChild(countryRowHead);

    countryIconDiv.getElementsByClassName("trash")[0].addEventListener("click", () => {
        const alertSection = document.getElementById("alert-section");
        const $countryRow = $(countryIconDiv).find(".trash").closest(".country-section");
        const countryId = $countryRow.data("country");
        const alertDiv = deleteActionAlert("Está a punto de eleminar una Ciudad");
        objectBluringAndFocusing(regionSection);


        alertDiv.addEventListener("click", () => {
            objectBluringAndFocusing(regionSection);
            alertSection.classList.remove("enable");
            alertSection.classList.add("disable");
            deleteResource("countries", countryId).then(response => {
                if (response.message) {
                    canNotDeleteAlert(response.message, regionSection);
                }
            });
            $countryRow.remove();
        });

    });


    addButton.addEventListener("click", () => {
        enableDomObject(countryInputDiv);
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const countryId = input.closest(".country-section").dataset.country;
            createCity(getingInputData(input), countryId);
            alert("La ciudad se creó correctamente");
            window.location.href = 'index.html';
        }
    });

    return countryRow;
}

function createCitySection(cityName, countryId, cityId) {
    const cityRow = createSection("city-row", "city-row-" + cityName);
    const cityTittleDiv = createDiv("region-tittle", "city-row-tittle-" + cityName);
    const cityIconDiv = createIconsSection(cityName);

    cityTittleDiv.dataset.cityId = cityId;
    cityIconDiv.getElementsByClassName("trash")[0].addEventListener("click", () => {
        const alertSection = document.getElementById("alert-section");
        const $cityRow = $(cityIconDiv.getElementsByClassName("trash")[0].closest(".region-tittle"));
        const cityId = $cityRow.data("cityId");
        const alertDiv = deleteActionAlert("Está a punto de eleminar una Ciudad");
        objectBluringAndFocusing(regionSection);

        alertDiv.addEventListener("click", () => {
            objectBluringAndFocusing(regionSection);
            alertSection.classList.remove("enable");
            alertSection.classList.add("disable");
            console.log(cityId);
            deleteResource("cities", cityId)
                .then(response => {
                    if (response.message) {
                        alertSection.removeChild(alertDiv)
                        canNotDeleteAlert(response.message, regionSection);
                    }
                })
            
            $cityRow.remove(); 
        });
    });

    cityRow.dataset.country = countryId;
    cityRow.appendChild(cityTittleDiv);
    cityTittleDiv.appendChild(cityIconDiv);

    return cityRow;
}

async function regionSectionAnable() {
    const sectionHeader = createSection("region-section-header", "region-section-header");
    const regionListSection = createSection("region-list", "region-list");
    const countries = await getListofCountries();
    const regions = await getListofRegions();
    const cities = await getCities();
    const listOfCities = cities.cities;
    const closeButton = createCloseButton();

    objectBluringAndFocusing(contactsSection);
    enableDomObject(regionSection);

    regionHeaderRender(sectionHeader, '', 'Region');
    
    regions.forEach(region => {
        const regionRowSection = createSection("region-row", "region-row-" + region.name);
        const regionRowHead = createSection("region-head", "region-head");
        const countryList = createDiv("countries-list", "countries-list");
        regionHeaderRender(regionRowHead, region.name, 'País');
        
        regionRowSection.dataset.regionId = region.id;
        const regionId = region.id;
        
        
        countries.forEach(it => {
            const countryRow = createCountrySection(it.name, it.regions_id, it.id);
            const cityList = createDiv("cities-list", "cities-list");
            
            if (it.regions_id === regionId) {
                const country_id = it.id;
                
                countryList.appendChild(countryRow);
                countryRow.appendChild(cityList);
                
                listOfCities.forEach(city => {
                    if (city.countries_id === country_id) {
                        const cityRow = createCitySection(city.name, city.name, city.id);
                        
                        cityRow.dataset.countryId = country_id;
                        cityList.appendChild(cityRow);
                    }
                })
            }
        })
        
        regionRowSection.appendChild(regionRowHead);
        regionRowSection.appendChild(countryList);
        regionListSection.appendChild(regionRowSection);
    })
    
    regionSection.appendChild(sectionHeader);
    regionSection.appendChild(regionListSection);
    regionSection.appendChild(closeButton);
    
    
    closeButton.addEventListener("click", () => {
        regionSection.removeChild(sectionHeader);
        regionSection.removeChild(regionListSection);
        regionSection.removeChild(closeButton);
        
        disableDomObject(regionSection);
        objectBluringAndFocusing(contactsSection);
        
    });

    $(".region-section-header .contact-table-row .actions").addClass("disable")
}

regionsButton.addEventListener("click", () => {
    regionSectionAnable();
});