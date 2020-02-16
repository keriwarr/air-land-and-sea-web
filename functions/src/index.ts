import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = admin.firestore();

// Create a new function which is triggered on changes to /users-online/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database
  .ref("/users-online/{uid}")
  .onWrite(async (change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val();

    // Then use other event data to create a reference to the
    // corresponding Firestore document.
    const userStatusFirestoreRef = firestore.doc(
      `users-online/${context.params.uid}`
    );

    if (eventStatus === null) {
      return userStatusFirestoreRef.delete();
    } else {
      return userStatusFirestoreRef.set(eventStatus);
    }
  });
