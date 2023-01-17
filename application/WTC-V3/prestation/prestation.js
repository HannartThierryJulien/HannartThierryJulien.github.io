import { Prestation } from "../javascript/classes/classePrestation.js";

/*****************************************************************************
 ****************************************************************************/

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

//-------------------- References ----------------------------------------------------------

var champId = document.getElementById("champId");
var champIdClient = document.getElementById("champIdClient");
var champDuree = document.getElementById("champDuree");
var champTarif = document.getElementById("champTarif");
var champDescription = document.getElementById("champDescription");

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");
var selAllBtn = document.getElementById("SelAllbtn");
var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");

//-------------------- INSERT DATA FUNCTION ----------------------------------------------------------

function InsertData() {
  set(ref(db, "Prestations/" + champId.value), {
    id: champId.value,
    idClient: champIdClient.value,
    duree: champDuree.value,
    tarif: champTarif.value,
    description: champDescription.value
  })
    .then(() => {
      alert("data stored successfully");
    })
    .catch((error) => {
      alert("unsuccessful, error" + error);
    });

  getAllPrestations();
}

//-------------------- SELECT DATA FUNCTION ----------------------------------------------------------

function SelectData() {
  const dbref = ref(db);

  get(child(dbref, "Prestations/" + champId.value)).then((snapshot) => {
    if (snapshot.exists()) {
      champId.value = snapshot.val().id;
      champIdClient.value = snapshot.val().idClient;
      champDuree.value = snapshot.val().duree;
      champTarif.value = snapshot.val().tarif;
      champDescription.value = snapshot.val().description;
    }

    else {
      alert("No data found");
    }
  })
    .catch((error) => {
      alert("unsuccessful, error" + error);
    })
}

//-------------------- SELECT All DATA FUNCTION ----------------------------------------------------------
function SelectAllData() {

  const dbref = ref(db);

  get(child(dbref, "Prestations"))
    .then((snapshot) => {

      var prestations = [];

      snapshot.forEach(childSnapshot => {
        console.log("\n" + childSnapshot.val().nomClient + " " + childSnapshot.val().duree);
        prestations.push(childSnapshot.val());
      });

    });
}

//-------------------- UPDATE DATA FUNCTION ----------------------------------------------------------

function UpdateData() {
  update(ref(db, "Prestations/" + champId.value), {
    id: champId.value,
    idClient: champIdClient.value,
    duree: champDuree.value,
    tarif: champTarif.value,
    description: champDescription.value
  })
    .then(() => {
      alert("data updated successfully");
    })
    .catch((error) => {
      alert("unsuccessful, error" + error);
    });

  getAllPrestations();
}

//-------------------- DELETE DATA FUNCTION ----------------------------------------------------------

function DeleteData() {
  remove(ref(db, "Prestations/" + champId.value))
    .then(() => {
      alert("data removed successfully");
    })
    .catch((error) => {
      alert("unsuccessful, error" + error);
    });

  getAllPrestations();
}


/*****************************************************************************
//
*****************************************************************************/


function getAllPrestations() {

  const dbref = ref(db);

  get(child(dbref, "Prestations"))
    .then((snapshot) => {
      var liste = document.getElementById("listePrestations");
      liste.innerHTML = ""; //vider la div
      var table = document.createElement("table");
      var header = table.createTHead();
      var row = header.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = "Id";
      cell2.innerHTML = "id du client";
      cell3.innerHTML = "Durée";
      cell4.innerHTML = "Tarif";
      cell5.innerHTML = "Description";

      snapshot.forEach(childSnapshot => {

        let prestation = new Prestation();
        prestation.setId(childSnapshot.val().id);
        prestation.setIdClient(childSnapshot.val().idClient);
        prestation.setDuree(childSnapshot.val().duree);
        prestation.setTarif(childSnapshot.val().tarif);
        prestation.setDescription(childSnapshot.val().description);

        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = prestation.getId();
        cell2.innerHTML = prestation.getIdClient();
        cell3.innerHTML = prestation.getDuree();
        cell4.innerHTML = prestation.getTarif();
        cell5.innerHTML = prestation.getDescription();

      });

      liste.appendChild(table);

    });
}



/*****************************************************************************
//
*****************************************************************************/


insBtn.addEventListener('click', InsertData);
selBtn.addEventListener('click', SelectData);
selAllBtn.addEventListener("click", SelectAllData);
updBtn.addEventListener('click', UpdateData);
delBtn.addEventListener('click', DeleteData);
getAllPrestations();
