const mainSection = document.getElementById('contacts-section');
const contactTable = document.getElementById('contacts-table');
const newContactForm = document.getElementById('new-contact-section');
const newContactButton = document.getElementById('add');
const newContactSection = document.getElementById('new-contact-section');

async function getContacts() {
    const result = await getResource(createUrl('contacts'));
    return result.contacts;
}

function createSelectedContactsSection() {
    const selectionInfoSection = document.getElementById('selected-contacts');
    const selectedInfoDiv = createDiv('selected-contacts-div', 'selected-contacts-div');
    const selectedIfoDivText = document.createElement('p');
    const deleteContactDiv = createDiv('delete-contacts', 'delete-contacts');
    addFigureWithCaption(deleteContactDiv, "./assets/images/trash.png", 'Eliminar contactos');

    selectedIfoDivText.id = 'checkbox-counter';
    selectedIfoDivText.innerText = String(checkedCheckBoCounter()) + " Contacto seleccionado";
    selectedInfoDiv.appendChild(selectedIfoDivText);
    selectionInfoSection.appendChild(selectedInfoDiv);
    selectionInfoSection.appendChild(deleteContactDiv);

    enableDomObject(selectionInfoSection);
}


function filterCitiesByCountryId(countryId,listCities){
    const cities = [];
    listCities.forEach(city => {
        if( city.id === countryId){
                cities.push(city.name);
        }
    });
}

function renderListOfCities(list, parentDiv){
    list.forEach( element => {
        const option = document.createElement('option');
        
        option.value = element;
        option.innerHTML = element;  

        parentDiv.appendChild(option);
    })
}


function newContactCreate(fnameInput,lnameInput, emailInput, telehoneInput, addressInput, channelSelect, preferenceSelect, cityIput, listCities) {
    
    try{
        const firstName = getingInputData(fnameInput);
        const lastName = getingInputData(lnameInput);
        const email = getingInputData(emailInput);
        const telephone = getingInputData(telehoneInput);
        const address = getingInputData(addressInput);
        const channel = channelSelect.options[channelSelect.selectedIndex].value;
        const preference = preferenceSelect.options[preferenceSelect.selectedIndex].value;
        const cityValue = cityIput.options[cityIput.selectedIndex].value; 
        const city = listCities.filter(city => city.name === cityValue)[0]
        const cityId = city.id;
    
        const newContact = {
            preferences: [{ channel:channel , intrest: Number(preference) }],
            contact_name: firstName + " "+ lastName,
            cities_id: cityId,
            contact_email: email,
            contact_adress: address,
            contact_phone: telephone,
        };
        return newContact;
    }catch{
        alert("*Required fields")
    }

}



async function renderNewContactSection() {
    const sectionFormHeader = createSection('new-contact-header', 'new-contact-header');
    const formHeader = document.createElement('form');
    const formTail = document.createElement('form');
    const fnameLabel = createLabel("fname", "*Nombre");
    const inputFname = createInputTextType("namef", "Nombre...");
    const lnameLabel = createLabel("lname", "*Apellido");
    const inputLname = createInputTextType("lname", "Apellido...");
    const emailLabel = createLabel("emailf", "*Mail");
    const emailInput = createInputTextType("mailf", "Mail...");
    const addressLabel = createLabel("addressf", "*Dirección");
    const addressInput = createInputTextType("adressf", "Dirección...");
    const telephoneLabel = createLabel("telephonef", "*Telefono");
    const telephoneInput = createInputTextType("telephonef", "Telefono...");
    //hacer get de los paises
    const countrySelectLabel = createLabel("citySeleLabelF", "*País");
    const countrySelect = createSelect('pais', 'pais', 'Paises');
    const citySelect = createSelect('ciudad', 'ciudad', 'Ciudades');
    const citySelectLabel = createLabel("citySeleLabelF", "*Ciudad");
    const preferenceSelect = createSelect('preferenceabel', 'preferenceSelect', 'Preferencia');
    const preferenceInput = createLabel("preferenceF", "*Preferencia");
    const channelLabel = createLabel("fchannel", "*Canal");
    const channelSelect = createSelect('channelabel', 'channelSelect', 'Canales');
    const cvLabel = createLabel("fname", "Cargar CV");
    const cvButton = createButton('Cargar CV', 'upload-button-cv');
    const contactButton = createButton('Cargar contacto', 'upload-button-contact');
    const closeButton = createCloseButton();
    const countriesList = await getListofCountries();
    const cities = await getCities();
    const listOfCities = cities.cities;
    const countriesNames = [];
    
    inputFname.id = "fname";
    inputFname.required = true;
    inputLname.id = "flname";
    inputLname.required = true;
    emailInput.id = "femail";
    emailInput.required = true;
    telephoneInput.id = "fteephone";
    telephoneInput.required = true;
    channelSelect.id = "channelF";
    channelSelect.required = true;
    preferenceSelect.id = "preference";
    preferenceSelect.required = true;
    addressInput.id = "addressF";
    addressInput.required = true;

    contactButton.classList.add("upload-button");
    cvButton.classList.add("upload-button");
    formHeader.classList.add('header-form');
    formTail.classList.add('tail-form');

    countriesList.forEach( country  => { countriesNames.push(country.name)})
    renderListOfCities(countriesNames, countrySelect);

    createOptionForLabel(preferenceSelect, [100,70,50,20]);
    createOptionForLabel(channelSelect, ["Whatsapp","Facebook","Mail","Telefono"]);


    formHeader.appendChild(fnameLabel);
    formHeader.appendChild(inputFname);
    formHeader.appendChild(lnameLabel);
    formHeader.appendChild(inputLname);
    formHeader.appendChild(emailLabel);
    formHeader.appendChild(emailInput);
    formHeader.appendChild(telephoneLabel);
    formHeader.appendChild(telephoneInput);

    formTail.appendChild(channelLabel);
    formTail.appendChild(channelSelect);
    formTail.appendChild(preferenceInput);
    formTail.appendChild(preferenceSelect);
    formTail.appendChild(countrySelectLabel);
    formTail.appendChild(countrySelect);
    formTail.appendChild(citySelectLabel);
    formTail.appendChild(citySelect);
    formTail.appendChild(addressLabel);
    formTail.appendChild(addressInput);
    formTail.appendChild(cvLabel);
    formTail.appendChild(cvButton);
    formTail.appendChild(contactButton);

    sectionFormHeader.appendChild(formHeader);
    sectionFormHeader.appendChild(formTail);
    newContactSection.appendChild(closeButton);
    newContactSection.appendChild(sectionFormHeader);

    enableDomObject(newContactSection);
    objectBluringAndFocusing(contactsSection);

    closeButton.addEventListener("click", () => {
        newContactSection.removeChild(sectionFormHeader);
        newContactSection.removeChild(closeButton);

        disableDomObject(newContactSection);
        objectBluringAndFocusing(contactsSection);

    });

    countrySelect.addEventListener('change', () => {
        const value = countrySelect.options[countrySelect.selectedIndex].value; 
        const selectedCountry = countriesList.find(element => element.name === value);
        const citiesToRender = [];
 
        listOfCities.forEach(city =>{
            if(city.countries_id === selectedCountry.id){
                citiesToRender.push(city.name);
            }
        });
        removeAllOptions(citySelect)
        renderListOfCities(citiesToRender, citySelect);
    });

    contactButton.addEventListener('click', (event) => {
        event.preventDefault();
        newContactCreate(inputFname,inputLname, emailInput, telephoneInput, addressInput, channelSelect, preferenceSelect, citySelect, listOfCities);
    });
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
    const tableRow = createSection("contacts-grid row");
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
        if (document.getElementById('checkbox-counter')) {
            const text = document.getElementById('checkbox-counter')
            text.innerHTML = String(checkedCheckBoCounter()) + " contactos seleccionados";
        } else {
            createSelectedContactsSection(checkedCheckBoCounter());
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

    mainSection.appendChild(mainDiv);
}

async function renderContactDataRow() {
    const contacts = await getContacts();
    contacts.forEach(element => contactRow(element));
    pagesDisplayer(contacts.length);
}

newContactButton.addEventListener('click', () => {
    renderNewContactSection();
})

createContactTableHeader();
renderContactDataRow();