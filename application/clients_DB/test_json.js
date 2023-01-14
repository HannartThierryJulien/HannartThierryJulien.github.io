
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
    var champPrenom = document.getElementById("champPrenom");
    var champAdresse = document.getElementById("champAdresse");
    var champDescription = document.getElementById("champDescription");

    var insBtn = document.getElementById("Insbtn");
    var selBtn = document.getElementById("Selbtn");
    var selAllBtn = document.getElementById("SelAllbtn");
    var updBtn = document.getElementById("Updbtn");
    var delBtn = document.getElementById("Delbtn");

    //-------------------- INSERT DATA FUNCTION ----------------------------------------------------------

    function InsertData() {
      set(ref(db, "Clients/" + champId.value), {
        id: champId.value,
        nom: champNom.value,
        prenom: champPrenom.value,
        adresse: champAdresse.value,
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

      get(child(dbref, "Clients/" + champId.value)).then((snapshot) => {
        if (snapshot.exists()) {
          champId.value = snapshot.val().id;
          champNom.value = snapshot.val().nom;
          champPrenom.value = snapshot.val().prenom;
          champAdresse.value = snapshot.val().adresse;
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

      get(child(dbref, "Clients"))
        .then((snapshot) => {

          var clients = [];

          snapshot.forEach(childSnapshot => {
            console.log("\n" + childSnapshot.val().nom);
            clients.push(childSnapshot.val());
          });

        });
    }

    //-------------------- UPDATE DATA FUNCTION ----------------------------------------------------------

    function UpdateData() {
      update(ref(db, "Clients/" + champId.value), {
        id: champId.value,
        nom: champNom.value,
        prenom: champPrenom.value,
        adresse: champAdresse.value,
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
      remove(ref(db, "Clients/" + champId.value))
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
