function createAutoComplete(srcFile, dataKeys, dynamicData, placeholder, selector, onSelection) {
    return new autoComplete({
        data: { // Data src [Array, Function, Async] | (REQUIRED)
            src: async() => {
                // Fetch External Data Source
                const source = await fetch(srcFile);
                // Format data into JSON
                const data = await source.json();
                // Return Fetched data
                return data;
            },
            key: dataKeys,
            cache: !dynamicData
        },
        sort: (a, b) => { // Sort rendered results ascendingly | (Optional)
            if (a.match < b.match) return -1;
            if (a.match > b.match) return 1;
            return 0;
        },
        placeHolder: placeholder, // Place Holder text                 | (Optional)
        selector: selector, // Input field selector              | (Optional)
        observer: true, // Input field observer | (Optional)
        threshold: 3, // Min. Chars length to start Engine | (Optional)
        debounce: 300, // Post duration for engine to start | (Optional)
        searchEngine: "strict", // Search Engine type/mode           | (Optional)
        resultsList: { // Rendered results list object      | (Optional)
            container: source => {
                source.setAttribute("id", "food_list");
            },
            destination: selector,
            position: "afterend",
            element: "ul",
            className: "list-group autocomplete-list"
        },
        maxResults: 5, // Max. number of rendered results | (Optional)
        highlight: true, // Highlight matching results      | (Optional)
        resultItem: { // Rendered result item            | (Optional)
            content: (data, source) => {
                source.innerHTML = data.match;
            },
            element: "li",
            className: "list-group-item autocomplete-item"
        },
        onSelection: onSelection
    });
}

createAutoComplete('/js/data/penalcodes.json', ['title', 'code'], false, "Penal Code...", '#violationDesc', (feedback) => {
    console.log(feedback.selection.value);
    // Because SONORAN DIDN'T SEPARATE THINGS OUT and just for testing
    // I need to split the code
    // This will NEED TO BE REMOVED at a later date when things are actually implemented
    let penalCode = {};
    penalCode.chapter = feedback.selection.value.code.split('.')[0];
    penalCode.section = feedback.selection.value.code.split('.')[1].split('(')[0];
    penalCode.sub = feedback.selection.value.code.split('.')[1].split('(')[1].replace(')', '');
    document.getElementById('violationDesc').value = feedback.selection.value.title
    document.getElementById('violationChap').value = penalCode.chapter;
    document.getElementById('violationSec').value = penalCode.section;
    document.getElementById('violationSub').value = penalCode.sub;
    document.getElementById('violationFine').value = feedback.selection.value.bondAmount
});

createAutoComplete('/js/data/fakeDLInfo.json', ['dlNumber', "fullName"], false, "Name or DL Number...", "#dlNumber", (feedback) => {
    console.log(feedback.selection.value);
    let personInfo = feedback.selection.value;
    const personInfoFields = ['firstName', 'middleName', 'lastName', 'dlExpire', 'addressPostal', 'addressStreet', 'addressSuffix', 'dateOfBirth', 'gender', 'race', 'bodyBuild', 'dlNumber']
    for (let index in personInfoFields) {
        let infoField = personInfoFields[index]
        document.getElementById(infoField).value = personInfo[infoField];
    }
    document.getElementById('validCDL').checked = personInfo.validCDL;
});

createAutoComplete('/js/data/faketags.json', ["vehicleTag"], false, "Vehicle Tag", "#vehicleTag", (feedback) => {
    console.log(feedback.selection.value);
    let vehicleInfo = feedback.selection.value;
    const vehicleInfoFields = ['vehicleTag', 'vehicleMake', 'vehicleModel', 'vehicleYear', 'vehicleColour'];
    for (let index in vehicleInfoFields) {
        let infoField = vehicleInfoFields[index]
        document.getElementById(infoField).value = vehicleInfo[infoField];
    }
});

createAutoComplete('/js/data/game/streets.json', ['name'], false, "Street Name", '#violationAddressStreet', (feedback) => {
    console.log(feedback.selection.value);
    document.getElementById('violationAddressStreet').value = feedback.selection.value.name;
})

document.querySelector('.personSearchResultItem').addEventListener('click', onPersonSearchResultClick)

function onPersonSearchResultClick(event) {
    let dlNumber = event.target.dataset.dlnumber;
    document.querySelector('#dlNumber').value = dlNumber;
    var personSearchModal = bootstrap.Modal.getInstance(document.getElementById("personSearchModal"));
    personSearchModal.hide();
}

// THIS IS FOR TESTING
// PLEASE DELETE LATER
function addPersonSearchRow() {
    var newRow = document.getElementById('personSearchResultsTable').insertRow(-1);
    newRow.insertCell(-1).appendChild(document.createTextNode('Crystal'));
    newRow.insertCell(-1).appendChild(document.createTextNode('Arituro'));
    newRow.insertCell(-1).appendChild(document.createTextNode('W'));
    newRow.insertCell(-1).appendChild(document.createTextNode('F'));
    var selectButton = document.createElement('button');
    selectButton.innerHTML = 'Select'
    selectButton.classList.add('btn');
    selectButton.classList.add('btn-primary');
    selectButton.classList.add('personSearchResultList');
    selectButton.dataset.dlnumber = 'CrystalDL';
    selectButton.addEventListener('click', onPersonSearchResultClick);
    newRow.insertCell(-1).appendChild(selectButton);
}