const functions = require("firebase-functions");
const admin = require("firebase-admin")

admin.initializeApp();

exports.createUser = functions.https.onCall(async (data, context) => {
  // Check if the request is authenticated and the user is an admin
  if (context.auth.token.admin !==true) {
    throw new functions.https.HttpsError(
        "permission-denied", "Only admins can creat users.",
    );
  }
  const {
    email,
    password,
    phoneNumber,
    displayName,
    emailVerified,
    disabled,
  } = data;

  try {
    // Create the user using Firebase Authentication
    const userRecord= await admin.auth().createUser({
      email,
      password,
      phoneNumber,
      displayName,
      emailVerified,
      disabled,
    });

    // Optionally, set custom claims for the user (if needed)

    return {
      success: true,
      uid: userRecord.uid,
    };
  } catch (error) {
    throw new functions.https.HttpsError(
        "unknown", "Error creating user", error,
    );
  }
});

exports.updateUser = functions.https.onCall(async (data, context) => {
  // Check if the request is authenticated and the user is an admin
  if (context.auth.token.admin !==true) {
    throw new functions.https.HttpsError(
        "permission-denied", "Only admins can creat users.",
    );
  }
  const {
    uid,
    email,
    emailVerified,
    password,
    disabled,
  } = data;

  try {
    const userRecord = await admin.auth().updateUser(uid, {
      email,
      emailVerified,
      password,
      disabled,
    });
    console.log("Successfully updated user", userRecord.toJSON());
    return {
      success: true,
      userRecord: userRecord.toJSON(),
    };
  } catch (error) {
    console.log("Error updating user:", error);
    throw new functions.https.HttpsError(
        "unknown", "Error updating user", error,
    );
  }
});

exports.makeAdmin = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !==true) {
    throw new functions.https.HttpsError(
        "permission-denied", "Only admins can creat users.",
    );
  }
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {admin: true})
        .then(()=>{
          return {
            message: `${data.email} is now an admin`,
          };
        }).catch((error) =>{
          return error;
        });
  });
});
