const contactsSection = document.getElementById('contacts-section');


function getContacts() {
    return getResource(createUrl('contacts'));
}


function createSelectedContactsSection() {
    const selectionInfoSection = createSection("selected-contacts enable", "selected-contacts enable");
    const selectedInfoDiv = createDiv('selected-contacts-div', 'selected-contacts-div');
    const selectedIfoDivText = document.createElement('p');
    const deleteContactDiv = createDiv('delete-contacts', 'delete-contacts');
    const trashFig = addFigureWithCaption(deleteContactDiv, "./assets/images/trash.png", 'Eliminar contactos');

    if (checkedCheckBoCounter() === 1) {
        selectedIfoDivText.innerText = "1 Contacto seleccionado";
    } else {
        selectedIfoDivText.innerText = String(checkedCheckBoCounter()) + " Contacto seleccionado";
    };

    selectedInfoDiv.appendChild(selectedIfoDivText);
    selectionInfoSection.appendChild(selectedInfoDiv);
    selectionInfoSection.appendChild(trashFig);

    return selectionInfoSection;
}


function contactRow(contactObject) {
    const contactId = contactObject.id;
    const tableRow = createSection("contacts-grid", "contacts-grid" + String(contactId));
    const selecColumn = createDiv('select-column', 'select-column-row' + String(contactId));
    const nameColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const countryColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const companyColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const roleColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const channelColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const intrestColumn = createProgressDiv("contact-table-row progress", 70);
    const actionColumn = createActionsDiv();
    const contactName = createPrincipalText(contactObject.contact_name);
    const contactEmail = createSecondaryText(contactObject.contact_email);
    const contactCity = createPrincipalText(cityName);
    const contactRegion = createSecondaryText(regionName);
    const contactRole = createPrincipalText('Student');


}