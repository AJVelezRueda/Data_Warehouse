const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MTI2NTI1NDF9.nsG7Opj5vPjXIVQSUzGM74zNUUH-gVgiK4q1DsajCms'
const contactsSection = document.getElementById('contacts-section');


function createUrl(resource) {
    return `http://localhost:3000/${resource}`;
}

function createUrlById(resource, id) {
    return `http://localhost:3000/${resource}/${id}`;
}

function getResource(url) {
    return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json());
}

function createResource(resource, resourceData) {
    const url = createUrl(resource);

    return fetch(url, {
            method: 'POST',
            body: JSON.stringify(resourceData),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}


function deleteResource(resource, id) {
    const url = createUrlById(resource, id);

    return fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

function creatImgObject(imgSrc, imgClassName, imgAltName) {
    const img = document.createElement('img');
    img.className = imgClassName;
    img.alt = imgAltName;
    img.src = imgSrc;
    img.className = imgAltName;
    return img
}

function disableDomObject(object) {
    object.classList.remove('enable');
    object.classList.add('disable');
}

function enableDomObject(object) {
    object.classList.add('enable');
    object.classList.remove('disable');
}

function objectBluringAndFocusing(object) {
    if (!object.classList.contains('blur')) {
        object.classList.add('blur');
    } else {
        object.classList.remove('blur');
    }
}

function checkingRow(object) {
    if (!object.classList.contains('selected')) {
        object.classList.add('selected');
    } else {
        object.classList.remove('selected');
    }
}

function createCloseButton() {
    const closeIcon = document.createElement('img');

    closeIcon.src = "./assets/images/close.png";
    closeIcon.className = "close-img";
    closeIcon.alt = "close";

    return closeIcon;
}

function createButton(buttonText, buttonId) {
    const button = document.createElement('button');

    button.id = `${ buttonId }`;
    button.innerHTML = `${ buttonText }`;

    return button;
}

function createInputTextType(inputId, placeholderText) {
    const input = document.createElement('input');

    input.type = "text";
    input.name = `${ inputId }-name`;
    input.placeholder = `${ placeholderText }`;

    return input;
}

function createSelect(selectId, selectName, values) {
    const select = document.createElement('select');
    const option = document.createElement('option');

    select.id = selectId;
    select.name = selectName;

    option.value = values;
    option.innerHTML = values;
    select.appendChild(option);

    return select;
}

function addValuesToaSelect(selectParent, listOfvalues) {

}

function checkedCheckBoCounter() {
    return document.querySelectorAll('input[type="checkbox"]:checked').length;
}

function createACheckBox() {
    const input = document.createElement('input');

    input.type = "checkbox";
    input.name = `contact-check`;
    input.className = `contact-check`;

    return input;
}

function checkedCheckBoCounter() {
    return document.querySelectorAll('input[type="checkbox"]:checked').length;
}

function createLabel(labelFor, labelText) {
    const label = document.createElement('label');

    label.htmlFor = `${ labelFor }`;
    label.innerHTML = `${ labelText}`;

    return label;
}

function createDiv(className, idName) {
    const div = document.createElement('div');

    div.className = className;
    div.id = idName;

    return div;
}

function createProgressDiv(className, progressmount) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const progress = document.createElement('progress');

    div.className = className;

    p.className = "principal-text";
    p.innerHTML = String(progressmount) + '%';

    progress.className = 'progress-bar';
    progress.max = '100';
    progress.value = String(progressmount);

    div.appendChild(p);
    div.appendChild(progress);

    return div;
}

function deleteActionAlert() {
    const alertDiv = createDiv('alert-div', 'alert-div');
    const confirmButton = createButton("¿Desea continuar?", 'alert-button');
    const alertTittle = document.createElement('h2');
    const closeButton = createCloseButton();
    const alertSection = document.getElementById('alert-section');

    objectBluringAndFocusing(contactsSection);
    enableDomObject(alertSection);

    alertTittle.innerHTML = 'Está a punto de elminar un contacto';

    alertDiv.appendChild(closeButton);
    alertDiv.appendChild(alertTittle);
    alertDiv.appendChild(confirmButton);
    alertSection.appendChild(alertDiv)

    closeButton.addEventListener("click", () => {
        alertSection.removeChild(alertDiv);

        disableDomObject(alertSection);
        objectBluringAndFocusing(contactsSection);
    })

}

function createActionsDiv() {
    const mainDiv = document.createElement('div');
    const div = document.createElement('div');
    const imgActions = document.createElement('img');
    const imgTrash = document.createElement('img');
    const imgPen = document.createElement('img');

    mainDiv.className = "contact-table-row";

    div.className = "allowed-actions";

    imgActions.src = "./assets/images/actions.png";
    imgActions.alt = "actions";

    imgTrash.src = "./assets/images/trash.png";
    imgTrash.alt = "trash";
    imgTrash.classList.add('disable');

    imgPen.src = "./assets/images/pen.png";
    imgPen.alt = "pen";
    imgPen.classList.add('disable');

    mainDiv.appendChild(imgActions);
    div.appendChild(imgTrash);
    div.appendChild(imgPen);
    mainDiv.appendChild(div);

    imgActions.addEventListener('click', () => {
        imgActions.classList.add('disable');
        imgTrash.classList.remove('disable');
        imgPen.classList.remove('disable');
    })
    return mainDiv;
}

function createSection(className, idName) {
    const section = document.createElement('section');

    section.className = className;
    section.id = idName;

    return section;
}

function addFigureWithCaption(parent, src, figcaptionText) {
    const figure = document.createElement('figure');
    const figurecaption = document.createElement('figcaption');
    const img = document.createElement('img');

    img.src = src;
    img.alt = 'figure-Img';
    figure.appendChild(img);
    figurecaption.innerHTML = figcaptionText;

    parent.appendChild(figure);
    parent.appendChild(figurecaption);
}


function headerFigures(parent, src, imgClass, figcaptionText) {
    const figure = document.createElement('figure');
    const figurecaption = document.createElement('figcaption');
    const img = document.createElement('img');

    img.src = src;
    img.classList = imgClass;
    img.alt = 'figure-Img';
    figure.appendChild(img);
    figurecaption.innerHTML = figcaptionText;

    parent.appendChild(figurecaption);
    parent.appendChild(figure);
}


function createPrincipalText(text) {
    const p = document.createElement('p');

    p.className = "principal-text";
    p.innerHTML = text;

    return p;
}

function createSecondaryText(text) {
    const p = document.createElement('p');

    p.className = "secondary-text";
    p.innerHTML = text;

    return p;
}

function getingInputData(input) {
    return input.value;
}

function removeAllOptions(select){
    Array.from(select.options).slice(1).forEach(it => select.removeChild(it))
 }
 

 function createOptionForLabel(select, listOfOptions){
    listOfOptions.forEach( element => {
        const option = document.createElement("option");

        option.innerHTML = element;
        select.appendChild(option);
    });
}