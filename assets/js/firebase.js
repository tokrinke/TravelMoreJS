const firebaseConfig = {
  apiKey: "AIzaSyAmZn51k_S8pwynIfFHcNzmEMDt9fBNJ7Q",
  authDomain: "travelmoredb.firebaseapp.com",
  projectId: "travelmoredb",
  databaseURL: "https://travelmoredb-default-rtdb.firebaseio.com/",
  storageBucket: "travelmoredb.appspot.com",
  messagingSenderId: "25562550851",
  appId: "1:25562550851:web:9dd8989f35776940177af6",
};

firebase.initializeApp(firebaseConfig);

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateFirebaseItem(ID, value) {
  return {
    userid: ID,
    data: value,
  };
}
function AddRefInFirebase(REF) {
  firebase.database().ref(REF).set(REF);
}

function AddElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getArrayFromFirebase(REF) {
  const arr = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        arr.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return arr;
}

function getElementFromFirebase(REF, id) {
  const arr = getArrayFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      arr.forEach((element) => {
        if ((element.id = id)) {
          resolve(element);
        }
      });
      reject("404");
    }, 2000);
  });
}

function updateElementInFirebase(REF, id, data) {
  firebase.database().ref(`${REF}/${id}`).set(data);
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
}
