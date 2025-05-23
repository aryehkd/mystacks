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
import {bookRecomendationPrompt, promptOpenAI} from "./gpt";


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
        .add(book).then((docRef) => {
          response.status(200).json(
            {
              "message": "success",
              "data": {
                "bookId": docRef.id,
              },
            });
        })
        .catch((error) => {
          response.status(500).json(
            {
              "message": "book not stored",
              "error": error,
            });
        });
    } else {
      db.collection("users")
        .doc(String(userId))
        .collection("books")
        .doc(book.id)
        .set({
          id: book.id,
          ...book,
        }, {merge: true}).then(() => {
          response.status(200).json(
            {
              "message": "success",
              "data": {
                "bookId": book.id,
              },
            });
        })
        .catch((error) => {
          response.status(500).json(
            {
              "message": "book not stored",
              "error": error,
            });
        });
    }
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

export const getStoredBook = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "GET");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    const userId = request.query.userId;
    const bookId = request.query.bookId;

    if (!userId) return;

    const booksRef = db.collection("users")
      .doc(String(userId))
      .collection("books")
      .doc(String(bookId));
    const doc = await booksRef.get();

    if (!doc.exists) {
      console.log("No such document!");
      return; // TODO: error code
    }

    const book = {id: doc.id, ...doc.data()};


    response.json({"data": book});
  }
});

export const getStoredBooksSearchKeys = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "GET");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
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
      responseData.push(
        {
          id: doc.id,
          title: doc.data().bookInfo.title,
          author: doc.data().bookInfo.author,
        }
      );
    });


    response.json({"data": responseData});
  }
});

export const getAIRecommendations = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    // TODO: check user quota

    const books = request.body.books;

    const aiRes = await promptOpenAI(bookRecomendationPrompt(books));

    response.json({"data": aiRes});
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
    db.collection("users").add(account).then((docRef) => {
      response.status(200).json(
        {
          "message": "success",
          "data": {
            "account": docRef.id,
          },
        });
    })
      .catch((error) => {
        response.status(500).json(
          {
            "message": "account not created",
            "error": error,
          });
      });
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
