

/***********************************************************************************************/
// Import de la base de données FireBase
/***********************************************************************************************/


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfQvIIZllw4Zjp-7aq95gkfMYe9Ecvu2k",
    authDomain: "waitingtimecount.firebaseapp.com",
    databaseURL: "https://waitingtimecount-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "waitingtimecount",
    storageBucket: "waitingtimecount.appspot.com",
    messagingSenderId: "554440718637",
    appId: "1:554440718637:web:24e4adfd0cd6f03be4fba4",
    measurementId: "G-STZBRFGLZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();


/***********************************************************************************************/
// Classe Prestation
/***********************************************************************************************/


class Prestation {
    constructor() {
        this.id = 0;
        this.idClient = 0;
        this.duree = 0;
        this.tarif = 0;
        this.description = "";
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setIdClient(idClient) {
        this.idClient = idClient;
    }

    getIdClient() {
        return this.idClient;
    }

    setDuree(duree) {
        this.duree = duree;
    }

    getDuree() {
        return this.duree;
    }

    setTarif(tarif) {
        this.tarif = tarif;
    }

    getTarif() {
        return this.tarif;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    toString() {
        return (this.id + " " + this.idClient + " " + this.duree + " " + this.tarif + " " + this.description);
    }
}


/***********************************************************************************************/
// Methode qui va chercher les clients de la DB et s'en sert pour remplir une combobox
/***********************************************************************************************/


function remplirComboBoxClients() {
    const dbref = ref(db);
    get(child(dbref, "Clients"))
        .then((snapshot) => {
            var selectComboBox = document.getElementById("comboBoxClients");
            snapshot.forEach(childSnapshot => {
                var optionComboBox = document.createElement("option");
                optionComboBox.text = childSnapshot.val().nom + " " + childSnapshot.val().prenom;
                optionComboBox.id = childSnapshot.val().id;
                selectComboBox.add(optionComboBox);
            });
        });
}


/***********************************************************************************************/
// Methode qui va chercher les tarifs de la DB et s'en sert pour remplir une combobox
/***********************************************************************************************/


function remplirComboBoxTarifs() {
    const dbref = ref(db);
    get(child(dbref, "Tarifs"))
        .then((snapshot) => {
            var selectComboBox = document.getElementById("comboBoxTarifs");
            snapshot.forEach(childSnapshot => {
                var optionComboBox = document.createElement("option");
                optionComboBox.text = childSnapshot.val().nom + " - " + childSnapshot.val().montantParHeure + "€/h";
                optionComboBox.id = childSnapshot.val().id;
                selectComboBox.add(optionComboBox);
            });
        });
}


/***********************************************************************************************/
/***********************************************************************************************/


let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;
let dureePrestation = "";

function startTimer() {
    timer = true;
    stopWatch();
}

function pauseTimer() {
    timer = false;
}

function stopTimer() {
    dureePrestation = hour + ":" + minute + ":" + second + ":" + count;
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
}

function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;

        if (hour < 10) {
            hrString = "0" + hrString;
        }

        if (minute < 10) {
            minString = "0" + minString;
        }

        if (second < 10) {
            secString = "0" + secString;
        }

        if (count < 10) {
            countString = "0" + countString;
        }

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}


/***********************************************************************************************/
// 
/***********************************************************************************************/

let nbrPrestations = 0;

function compterNbrPrestationsDansDB() {
    const dbref = ref(db);

    get(child(dbref, "Prestations"))
        .then((snapshot) => {
            snapshot.forEach(childSnapshot => {
                nbrPrestations++;
            });
        });
}


/***********************************************************************************************/
// Création d'un objet prestation suite à un click sur le bouton "enregistrer"
/***********************************************************************************************/


function enregistrerPrestation() {
    var prestation = new Prestation();
    prestation.setId("3");
    prestation.setIdClient(0);
    prestation.setDuree(dureePrestation);
    prestation.setTarif(15);
    prestation.setDescription(document.getElementById("descriptionPrestation").value);

    insererPrestationDansDB(prestation);
}


/***********************************************************************************************/
// Envoi de l'objet prestation dans la base de données
/***********************************************************************************************/


function insererPrestationDansDB(prestation) {
    //ya un soucis dans les lignes en dessous, elles devraient permettre de décortiquer le nom et le prenom
    var cbClients = document.getElementById("comboBoxClients");
    var selectedIndex = cbClients.selectedIndex;
    prestation.setIdClient(cbClients.options[selectedIndex].id);    

    set(ref(db, "Prestations/" + (nbrPrestations + 1)), {
        id: (nbrPrestations + 1),
        idClient: prestation.getIdClient(),
        duree: prestation.getDuree(),
        tarif: prestation.getTarif(),
        description: prestation.getDescription()
    })
        .then(() => {
            nbrPrestations++;
            alert("data stored successfully");
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}


/***********************************************************************************************/
/***********************************************************************************************/


window.onload = function main() {

    var startBtn = document.getElementById("startBtn");
    var pauseBtn = document.getElementById("pauseBtn");
    var stopBtn = document.getElementById("stopBtn");
    var saveBtn = document.getElementById("saveBtn");

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    stopBtn.addEventListener('click', stopTimer);
    saveBtn.addEventListener('click', enregistrerPrestation);

    remplirComboBoxClients();
    remplirComboBoxTarifs();
    compterNbrPrestationsDansDB();
};
