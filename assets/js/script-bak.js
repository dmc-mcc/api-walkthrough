/*
const API_KEY = "fVnFlkPl2O7QEU5uHvbOPg8n5l4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        console.log(data.expiry);

    }

}
*/

/* 
https://ci-jshint.herokuapp.com/api?api_key=fVnFlkPl2O7QEU5uHvbOPg8n5l4
https://getbootstrap.com/docs/5.0/components/modal/#via-javascript

https://developer.mozilla.org/en-US/docs/Web/API/FormData

*/

const API_KEY = "fVnFlkPl2O7QEU5uHvbOPg8n5l4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

/*
1. make a GET request to the api url with the api api key
2. pass the data to the display function
*/

function processOptions(form) {
    let optArray = [];

    for (let e of form.entries()) {
        if (e[0] === "options") {
            optArray.push(e[1]);
        }
    }

    form.delete("options");

    form.append("options", optArray.join());

    return form;
}


async function postForm(e) {

    const form = processOptions(new FormData(document.getElementById("checksform")));
//    const form = new FormData(document.getElementById("checksform"));
 //   const form = new FormData(document.getElementById("checksform"));

  /*  
    for ( let y of form.entries()){
        console.log(y);
    }
*/
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    
    //const response = await fetch(queryString,
    const response = await fetch("https://ci-jshint.herokuapp.com/api", 
        { method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form
    });

/*

const response = await fetch(API_URL, {
    method: "POST",
    headers: {
        "Authorization": API_KEY,
    },
    body: form,
});
*/
    const data = await response.json();
    if (response.ok) {
        displayErrors(data);
    }
    else {
        throw new Error(data.error);
    }

    
}




async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();
    //   console.log(e);
    // console.log(queryString);

    if (response.ok) {
        //        console.log(data);
        //      console.log(data.expiry);
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Key valid through to: </div>`
    results += `<div class="key-status">${data.expiry}</div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultModal.show();

}

function displayErrors(data) {

    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}


function displayStatus(data) {

    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();

}

