const mainSection = document.getElementById('contacts-section');
const contactTable = document.getElementById('contacts-table')

async function getContacts() {
    const result = await getResource(createUrl('contacts'));
    return result.contacts;
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


function createContactTableHeader() {
    const headerSection = createSection("contacts-grid", "contact-grid-header");
    const selecColumn = createDiv('select-column', 'select-column-header');
    const nameColumn = createDiv("contact-table-header", 'contact-table-header');
    const countryColumn = createDiv("contact-table-header", "contact-table-country");
    const companyColumn = createDiv("contact-table-header", "contact-table-country");
    const roleColumn = createDiv("contact-table-header", "contact-table-role");
    const channelColumn = createDiv("contact-table-header", "contact-table-channel");
    const intrestColumn = createDiv("contact-table-header", "contact-table-interest");
    const actionColumn = createDiv("contact-table-header", "contact-table-actions");
    const checkbox = createACheckBox();
    const p = document.createElement('p');

    headerFigures(nameColumn, "./assets/images/sort.png", "sort-img", "Contacto");
    headerFigures(countryColumn, "./assets/images/sort.png", "sort-img", "Ciudad/País");
    headerFigures(companyColumn, "./assets/images/sort.png", "sort-img", "Compañia");
    headerFigures(roleColumn, "./assets/images/sort.png", "sort-img", "Cargo");
    headerFigures(channelColumn, "./assets/images/sort.png", "sort-img", "Canal");
    headerFigures(intrestColumn, "./assets/images/sort.png", "sort-img", "Interes");

    p.innerText = "Acciones";

    actionColumn.appendChild(p);

    selecColumn.appendChild(checkbox);
    headerSection.appendChild(selecColumn);
    headerSection.appendChild(nameColumn);
    headerSection.appendChild(countryColumn);
    headerSection.appendChild(companyColumn);
    headerSection.appendChild(roleColumn);
    headerSection.appendChild(channelColumn);
    headerSection.appendChild(intrestColumn);
    headerSection.appendChild(actionColumn);

    contactTable.appendChild(headerSection);
}


async function contactRow(contactObject) {
    const contactId = contactObject.id;
    const city = await getCityById(contactObject.cities_id);
    const preferences = [{ channel: 'Whatsapp', intrest: 70 }];
    const tableRow = createSection("contacts-grid", "contacts-grid" + String(contactId));
    const selecColumn = createDiv('select-column', 'select-column-row' + String(contactId));
    const nameColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const contactName = createPrincipalText(contactObject.contact_name);
    const contactEmail = createSecondaryText(contactObject.contact_email);
    const countryColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const roleColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const channelColumn = createDiv("contact-table-row", "contact-table-row" + String(contactId));
    const intrestColumn = createProgressDiv("contact-table-row progress", preferences[0].intrest);
    const actionColumn = createActionsDiv();
    const contactCity = createPrincipalText(city.name);
    const contactRegion = createSecondaryText(city.countries_name);
    const checkbox = createACheckBox();
    const contactRole = createPrincipalText('Student');
    const contactCompany = createPrincipalText('CONICET');;
    //const preferences = contactObject.preferences;
    //const contactRole = contactObject.role;
    //const contactCompany = contactObject.company;

    nameColumn.appendChild(contactName);
    nameColumn.appendChild(contactEmail);
    countryColumn.appendChild(contactCity);
    countryColumn.appendChild(contactRegion);
    selecColumn.appendChild(checkbox);
    roleColumn.appendChild(contactRole);

    preferences.forEach(element => {
        channelColumn.appendChild(createPrincipalText(element.channel));
    });

    tableRow.appendChild(selecColumn);
    tableRow.appendChild(nameColumn);
    tableRow.appendChild(countryColumn);
    tableRow.appendChild(contactRole);
    tableRow.appendChild(contactCompany);
    tableRow.appendChild(channelColumn);
    tableRow.appendChild(intrestColumn);
    tableRow.appendChild(actionColumn);

    checkbox.addEventListener('click', () => {
        checkingRow(tableRow);
        if (checkedCheckBoCounter() === 0) {
            createSelectedContactsSection();
        } else {
            const counter = document.getElementById('checkbox-counter');
            selectedIfoDivText.innerText = String(checkedCheckBoCounter()) + " Contactos seleccionados";
        }
    });

    contactTable.appendChild(tableRow);
}

function pagesDisplayer(contactsTotal) {
    const mainDiv = createDiv("pages-displayer", "pages-displayer");
    const pagesDiv = createDiv("add-rows", "add-rows");
    const pagesDetail = createDiv("pages-detail", "pages-detail");
    const p = document.createElement('p');

    p.innerHTML = `1 - ${contactsTotal} de ${contactsTotal}`;
    pagesDetail.appendChild(p)

    headerFigures(pagesDiv, "./assets/images/expand-button.png", "expand-button", "Filas por página " + contactsTotal);

    mainDiv.appendChild(pagesDiv);
    mainDiv.appendChild(pagesDetail);

    contactTable.appendChild(mainDiv);
}

async function renderContactDataRow() {
    const contacts = await getContacts();
    contacts.forEach(element => contactRow(element));
    pagesDisplayer(contacts.length);
}

createContactTableHeader();
renderContactDataRow();