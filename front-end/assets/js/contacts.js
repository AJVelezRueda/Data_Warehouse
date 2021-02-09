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


function selectingContacts() {
    const selectionInfoSection = createSection("selected-contacts enable", "selected-contacts");


}