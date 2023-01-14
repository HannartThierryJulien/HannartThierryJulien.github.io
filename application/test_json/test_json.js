
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

    var namebox = document.getElementById("Namebox");
    var rollbox = document.getElementById("Rollbox");
    var secbox = document.getElementById("Secbox");
    var genbox = document.getElementById("Genbox");

    var insBtn = document.getElementById("Insbtn");
    var selBtn = document.getElementById("Selbtn");
    var selAllBtn = document.getElementById("SelAllbtn");
    var updBtn = document.getElementById("Updbtn");
    var delBtn = document.getElementById("Delbtn");

    //-------------------- INSERT DATA FUNCTION ----------------------------------------------------------

    function InsertData() {
      set(ref(db, "StudentsList/" + rollbox.value), {
        NameOfStd: namebox.value,
        RollNo: rollbox.value,
        Section: secbox.value,
        Gender: genbox.value
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

      get(child(dbref, "StudentsList/" + rollbox.value)).then((snapshot) => {
        if (snapshot.exists()) {
          namebox.value = snapshot.val().NameOfStd;
          rollbox.value = snapshot.val().RollNo;
          secbox.value = snapshot.val().Section;
          genbox.value = snapshot.val().Gender;
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

      get(child(dbref, "StudentsList"))
        .then((snapshot) => {

          var students = [];

          snapshot.forEach(childSnapshot => {
            console.log("\n" + childSnapshot.val().Gender);
            students.push(childSnapshot.val());
          });

        });
    }

    //-------------------- UPDATE DATA FUNCTION ----------------------------------------------------------

    function UpdateData() {
      update(ref(db, "StudentsList/" + rollbox.value), {
        NameOfStd: namebox.value,
        Section: secbox.value,
        Gender: genbox.value
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
      remove(ref(db, "StudentsList/" + rollbox.value))
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
