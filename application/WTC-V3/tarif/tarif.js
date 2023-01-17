import { Tarif } from "../javascript/classes/classeTarif.js";
import { insertTarif, getTarifById } from "../javascript/dataBase/dbTarif.js";

/*****************************************************************************
//
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
var champNom = document.getElementById("champNom");
var champDescription = document.getElementById("champDescription");
var champMontantParHeure = document.getElementById("champMontantParHeure");

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");
var selAllBtn = document.getElementById("SelAllbtn");
var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");

//-------------------- INSERT DATA FUNCTION ----------------------------------------------------------

function fctBtnInsert() {

  let tarif = new Tarif();
  tarif.setId(champId.value);
  tarif.setNom(champNom.value);
  tarif.setDescription(champDescription.value);
  tarif.setMontantParHeure(champMontantParHeure.value);

  insertTarif(tarif);

  getAllTarifs();
}

//-------------------- SELECT DATA FUNCTION ----------------------------------------------------------

function fctBtnSelectTarifById() {

  getTarifById(champId.value).then(function (tarif) {
    console.log("====\n" + tarif.toString() + "\n=====");

    champId.value = tarif.getId();
    champNom.value = tarif.getNom();
    champDescription.value = tarif.getDescription();
    champMontantParHeure.value = tarif.getMontantParHeure();
  });
}

//-------------------- SELECT All DATA FUNCTION ----------------------------------------------------------
function getAllTarifs() {

  const dbref = ref(db);

  get(child(dbref, "Tarifs"))
    .then((snapshot) => {
      var liste = document.getElementById("listeTarifs");
      liste.innerHTML = ""; //vider la div
      var table = document.createElement("table");
      var header = table.createTHead();
      var row = header.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = "Id";
      cell2.innerHTML = "Nom";
      cell3.innerHTML = "Description";
      cell4.innerHTML = "Montant par heure";

      snapshot.forEach(childSnapshot => {
        console.log("\n" + childSnapshot.val().nom + " " + childSnapshot.val().montantParHeure);

        let tarif = new Tarif();
        tarif.setId(childSnapshot.val().id);
        tarif.setNom(childSnapshot.val().nom);
        tarif.setDescription(childSnapshot.val().description);
        tarif.setMontantParHeure(childSnapshot.val().montantParHeure);

        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = tarif.getId();
        cell2.innerHTML = tarif.getNom();
        cell3.innerHTML = tarif.getDescription();
        cell4.innerHTML = tarif.getMontantParHeure();
      });

      liste.appendChild(table);

    });
}

/*
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
*/
//-------------------- UPDATE DATA FUNCTION ----------------------------------------------------------

function updateTarif() {
  update(ref(db, "Tarifs/" + champId.value), {
    id: champId.value,
    nom: champNom.value,
    description: champDescription.value,
    montantParHeure: champMontantParHeure.value
  })
    .then(() => {
      alert("data updated successfully");
    })
    .catch((error) => {
      alert("unsuccessful, error" + error);
    });

  getAllTarifs();
}

//-------------------- DELETE DATA FUNCTION ----------------------------------------------------------

function deleteTarif() {
  remove(ref(db, "Tarifs/" + champId.value))
    .then(() => {
      alert("data removed successfully");
    })
    .catch((error) => {
      alert("unsuccessful, error" + error);
    });

  getAllTarifs();
}



/*****************************************************************************
//
*****************************************************************************/


//-------------------- Assign Events to Btns ----------------------------------------------------------

insBtn.addEventListener('click', fctBtnInsert);
selBtn.addEventListener('click', fctBtnSelectTarifById);
selAllBtn.addEventListener("click", getAllTarifs);
updBtn.addEventListener('click', updateTarif);
delBtn.addEventListener('click', deleteTarif);
getAllTarifs();
