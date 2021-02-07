const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MTI2NTI1NDF9.nsG7Opj5vPjXIVQSUzGM74zNUUH-gVgiK4q1DsajCms';

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


function getUser() {
    return getResource(createUrl('users'));
}