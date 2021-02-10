const mainSection = document.getElementById('contacts-section');

function getContacts() {
    return getResource(createUrl('contacts'));
}

function createSelectedContactsSection() {
    const selectionInfoSection = createSection("selected-contacts enable", "selected-contacts");
    const selectedInfoDiv = createDiv('selected-contacts-div', 'selected-contacts-div');
    const selectedIfoDivText = document.createElement('p');
    const deleteContactDiv = createDiv('delete-contacts', 'delete-contacts');
    const trashFig = addFigureWithCaption(deleteContactDiv, "./assets/images/trash.png", 'Eliminar contactos');

    selectedIfoDivText.id = 'checkbox-counter';
    selectedIfoDivText.innerText = "1 Contacto seleccionado";

    selectedInfoDiv.appendChild(selectedIfoDivText);
    selectionInfoSection.appendChild(selectedInfoDiv);
    selectionInfoSection.appendChild(trashFig);

    return selectionInfoSection;
}


function contactRow(contactObject) {
    const contactId = contactObject.id;
    const city = getCityById(contactObject.cities_id);
    const tableRow = createSection("contacts-grid", "contacts-grid" + String(contactId));
    const selecColumn = createDiv('select-column', 'select-column-row' + String(contactId));
    const nameColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const countryColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const roleColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const channelColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const intrestColumn = createProgressDiv("contact-table-row progress", contactObject.preferences[0].intrest);
    const contactRole = createPrincipalText('Student');
    const actionColumn = createActionsDiv();
    const contactName = createPrincipalText(contactObject.contact_name);
    const contactEmail = createSecondaryText(contactObject.contact_email);
    const contactCity = createPrincipalText(city.name);
    const contactRegion = createSecondaryText(city.countries_name);
    const checkbox =  createACheckBox();

    nameColumn.appendChild(contactName);
    nameColumn.appendChild(contactEmail);
    countryColumn.appendChild(contactCity);
    countryColumn.appendChild(contactRegion);
    selecColumn.appendChild(checkbox);
    roleColumn.appendChild(contactRole);

    contactObject.preferences.forEach(element => {
        channelColumn.appendChild(createPrincipalText(element.channel));
    });

    tableRow.appendChild(selecColumn);
    tableRow.appendChild(nameColumn);
    tableRow.appendChild(countryColumn);
    tableRow.appendChild(channelColumn);
    tableRow.appendChild(intrestColumn);
    tableRow.appendChild(actionColumn);

    checkbox.addEventListener('click', () => {
        checkingRow(tableRow);
        if(checkedCheckBoCounter() === 0){
            createSelectedContactsSection();
        }else{
            const counter = document.getElementById('checkbox-counter');
            selectedIfoDivText.innerText = String(checkedCheckBoCounter()) + " Contactos seleccionados";
        }
    });
}