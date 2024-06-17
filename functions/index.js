const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createUser = functions.https.onCall(async (data, context) => {
  // Check if the request is authenticated and the user is an admin
  if (!context.auth || !context.auth.token.isAdmin) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "Only admins can create users.",
    );
  }

  const {email,
    phoneNumber,
    emailVerified,
    password,
    displayName,
    photoURL,
    disabled} = data;

  try {
    // Create the user using Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      phoneNumber,
      emailVerified,
      password,
      displayName,
      photoURL,
      disabled,
    });

    // Optionally, set custom claims for the user (if needed)

    return {success: true, uid: userRecord.uid};
  } catch (error) {
    throw new functions.https.HttpsError(
        "unknown",
        "Error creating user",
        error,
    );
  }
});

exports.updateUser = functions.https.onCall(async (data, context) => {
  // Check if the request is authenticated and the user is an admin
  if (!context.auth || !context.auth.token.isAdmin) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "Only admins can update users.",
    );
  }

  const {
    uid,
    email,
    phoneNumber,
    emailVerified,
    password,
    displayName,
    photoURL,
    disabled,
  } = data;

  try {
    const userRecord = await admin.auth().updateUser(uid, {
      email,
      phoneNumber,
      emailVerified,
      password,
      displayName,
      photoURL,
      disabled,
    });
    console.log("Successfully updated user", userRecord.toJSON());
    return {success: true, userRecord: userRecord.toJSON()};
  } catch (error) {
    console.log("Error updating user:", error);
    throw new functions.https.HttpsError(
        "unknown",
        "Error updating user",
        error,
    );
  }
});
