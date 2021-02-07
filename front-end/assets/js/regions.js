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


function regionHeaderRender(parent, tittleText, buttonText) {
    const divTittle = document.createElement('div');
    const divInput = document.createElement('div');
    const tittle = document.createElement('h2');
    const addButton = createButton('Agregar ' + buttonText, "add-" + buttonText)
    const label = document.createElement('label');
    const input = document.createElement('input');


    divTittle.className = 'region-tittle';
    divInput.className = `region-input disable`;

    input.type = "text";
    input.name = `${ tittleText }-name`;
    input.id = `${ tittleText }-name`;
    input.placeholder = `${ tittleText } name..`;

    label.htmlFor = `${ tittleText }-name`;
    label.innerHTML = `${ tittleText } name`;

    tittle.innerHTML = `${ tittleText }`;

    divTittle.appendChild(tittle);
    divTittle.appendChild(addButton);

    divInput.appendChild(label);
    divInput.appendChild(input);

    parent.appendChild(divTittle);
    parent.appendChild(divInput);
}

function createButton(buttonText, buttonId) {
    const button = document.createElement('button');

    button.id = `${ buttonId }`;
    button.innerHTML = `${ buttonText }`;

    return button;
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

function regionSectionAnable() {
    const sectionHeader = document.createElement('section');
    const rowSection = document.createElement('section');
    const rowHead = document.createElement('section');

    contactsSection.classList.add('disable');
    regionSection.classList.remove('disable');
    regionSection.classList.add('enable');

    sectionHeader.className = "region-section-header";
    rowSection.className = "region-row";
    rowHead.className = "country-head";

    regionHeaderRender(sectionHeader, 'region', 'Region');
    regionHeaderRender(rowHead, 'sudamerica', 'País');

    regionSection.appendChild(sectionHeader);
    rowSection.appendChild(rowHead);
    regionSection.appendChild(rowSection);

}



regionsButton.addEventListener("click", () => {
    regionSectionAnable();
});