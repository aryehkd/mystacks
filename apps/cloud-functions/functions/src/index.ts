/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

export const storeBook = onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    const book = request.body.book;

    // TODO: add type check and error handling for response
    db.collection("books").add(book);

    response.send("Book saved!");
  }
});

export const getStoredBooks = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "GET");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    const booksRef = db.collection("books");
    const snapshot = await booksRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    // get types
    const responseData: any[] = [];

    snapshot.forEach((doc) => {
      responseData.push(doc.data());
    });


    response.json({"data": responseData});
  }
});
