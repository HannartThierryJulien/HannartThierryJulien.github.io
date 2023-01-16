class Prestation {
  constructor() {
    this.id = 0;
    this.nomClient = "";
    this.prenomClient = "";
    this.duree = 0;
    this.tarif = 0;
    this.description = "";
  }

  setId(id) {
    this.id = id;
  }

  setNomClient(nomclient) {
    this.nomclient = nomclient;
  }

  setPrenomClient(prenomclient) {
    this.prenomclient = prenomclient;
  }

  setDuree(duree) {
    this.duree = duree;
  }

  setTarif(tarif) {
    this.tarif = tarif;
  }

  setDescription(description) {
    this.description = description;
  }

  toString() {
    return (this.client + " " + this.duree + " " + this.tarif + " " + this.description);
  }
}

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
var champNomClient = document.getElementById("champNomClient");
var champPrenomClient = document.getElementById("champPrenomClient");
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
    nomClient: champNomClient.value,
    prenomClient: champPrenomClient.value,
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
}

//-------------------- SELECT DATA FUNCTION ----------------------------------------------------------

function SelectData() {
  const dbref = ref(db);

  get(child(dbref, "Prestations/" + champId.value)).then((snapshot) => {
    if (snapshot.exists()) {
      champId.value = snapshot.val().id;
      champNomClient.value = snapshot.val().nomClient;
      champPrenomClient.value = snapshot.val().prenomClient;
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
    nomClient: champNomClient.value,
    prenomClient: champPrenomClient.value,
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
}

//-------------------- Assign Events to Btns ----------------------------------------------------------

insBtn.addEventListener('click', InsertData);
selBtn.addEventListener('click', SelectData);
selAllBtn.addEventListener("click", SelectAllData);
updBtn.addEventListener('click', UpdateData);
delBtn.addEventListener('click', DeleteData);
