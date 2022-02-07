const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addToFirestore = functions.auth.user().onCreate(async (user) => {
  try {
    functions.logger.log("The function execution has begun");
    const docRef = await addDoc(collection(db, "users"), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
