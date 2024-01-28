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

*/

const API_KEY = "fVnFlkPl2O7QEU5uHvbOPg8n5l4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

/*
1. make a GET request to the api url with the api api key
2. pass the data to the display function
*/

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();
    //   console.log(e);
    // console.log(queryString);

    if (response.ok) {
        console.log(data);
        console.log(data.expiry);
    }
}

/*
const response = fetch("https://ci-jshint.herokuapp.com/api", {
                        method: "POST",
                        headers: {
                                    "Authorization": API_KEY,
                                 }
                        })
*/