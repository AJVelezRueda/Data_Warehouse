const contactsSection = document.getElementById('contacts-section');

async function createUser() {
    const url = createUrl('users');
    const userData = {
        name: "Rita Segato",
        email: "laGranRita@gmail.com",
        username: "laritadelpueblo",
        password: "sevaacaer"
    };

    return fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}


function getContacts() {
    return getResource(createUrl('contacts'));
}


function createSelectedContactsSection(contactsSelectedNumber) {
    const selectionInfoSection = createSection("selected-contacts enable", "selected-contacts enable");
    const selectedInfoDiv = createDiv('selected-contacts-div', 'selected-contacts-div');
    const selectedIfoDivText = document.createElement('p');
    const deleteContactDiv = createDiv('delete-contacts', 'delete-contacts');
    const trashFig = addFigureWithCaption(deleteContactDiv, "./assets/images/trash.png", 'Eliminar contactos');

    if (ontactsSelectedNumber === 1) {
        selectedIfoDivText.innerText = "1 Contacto seleccionado";
    } else {
        selectedIfoDivText.innerText = String(contactsSelectedNumber) + " Contacto seleccionado";
    };

    selectedInfoDiv.appendChild(selectedIfoDivText);
    selectionInfoSection.appendChild(selectedInfoDiv);
    selectionInfoSection.appendChild(trashFig);

    return selectionInfoSection;
}