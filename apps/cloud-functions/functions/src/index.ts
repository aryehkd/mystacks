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
    const userId = request.query.userId;

    // TODO: add type check and error handling for response

    if (!book?.id) {
      db.collection("users")
        .doc(String(userId))
        .collection("books")
        .add(book);
    } else {
      db.collection("users")
        .doc(String(userId))
        .collection("books")
        .doc(book.id)
        .set({
          id: book.id,
          ...book,
        }, {merge: true});
    }

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
    // TODO: query param for user ID?
    const userId = request.query.userId;

    if (!userId) return;

    const booksRef = db.collection("users")
      .doc(String(userId))
      .collection("books");

    const snapshot = await booksRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    // get types
    const responseData: any[] = [];

    snapshot.forEach((doc) => {
      responseData.push({id: doc.id, ...doc.data()});
    });


    response.json({"data": responseData});
  }
});

export const createUserAccount = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    const account = request.body.account;

    // TODO: add server side validation
    db.collection("users").add(account);

    response.send("Account Created!");
  }
});

export const login = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    const account = request.body.account;

    const accountRef = db.collection("users")
      .where("username", "==", account.username);
    const snapshot = await accountRef.get();
    if (snapshot.empty) {
      // TODO: Error for login handling
      console.log("No matching documents.");
      return;
    }

    // get types
    const responseData: any[] = [];

    snapshot.forEach((doc) => {
      responseData.push({...doc.data(), id: doc.id});
    });

    if (responseData[0].password == account.password) {
      response.json({"data": {"account": responseData[0].id}});
    } else {
      response.json({"error": "account not found"});
    }
  }
});
