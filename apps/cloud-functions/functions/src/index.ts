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
  const book = request.body.book;

  // TODO: add type check and error handling for response
  db.collection("books").add(book);

  response.send("Book saved!");
});

export const getStoredBooks = onRequest(async (request, response) => {
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
});
