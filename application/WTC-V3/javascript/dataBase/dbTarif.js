import { Tarif } from "../classes/classeTarif.js";


/***********************************************************************************************/
// 
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
// 
/***********************************************************************************************/


function insertTarif(objTarif) {

    set(ref(db, "Tarifs/" + objTarif.getId()), {
        id: objTarif.getId(),
        nom: objTarif.getNom(),
        description: objTarif.getDescription(),
        montantParHeure: objTarif.getMontantParHeure()
    })
        .then(() => {
            alert("data stored successfully");
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}


/***********************************************************************************************/
// 
/***********************************************************************************************/


function getTarifById(idTarifToFind) {
    const dbref = ref(db);

    return get(child(dbref, "Tarifs/" + idTarifToFind)).then((snapshot) => {
        if (snapshot.exists()) {
            let tarif = new Tarif();
            tarif.setId(snapshot.val().id);
            tarif.setNom(snapshot.val().nom);
            tarif.setDescription(snapshot.val().description);
            tarif.setMontantParHeure(snapshot.val().montantParHeure);

            return tarif;
        }

        else {
            alert("No data found");
            return null;
        }
    })
        .catch((error) => {
            alert("unsuccessful, error" + error);
            return null;
        })
}


/***********************************************************************************************/
// 
/***********************************************************************************************/

export { insertTarif, getTarifById };