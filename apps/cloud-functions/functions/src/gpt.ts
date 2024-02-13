import OpenAI from "openai";
import {defineString} from "firebase-functions/params";

const openAIKey = defineString("OPENAI_API_KEY");

const openai = new OpenAI({
  apiKey: openAIKey.value(),
});

export const bookRecomendationPrompt = (books:
    {title: string, author: string}[]
) => {
  let prompt = "I'm looking for books similar to";

  books.forEach((book, index) => prompt += book.title +
        " by " + book.author +
        (index == books.length -1 ? ". " : ", "
        ));

  prompt += "Please recommend 3 in a numbered list, ";
  prompt += "each with a short description. ";
  prompt += "Please consider books that are not mainstream.";

  return prompt;
};

export const promptOpenAI = async (prompt: string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{role: "user", content: prompt}],
    model: "gpt-3.5-turbo",
  }).catch((err) => {
    if (err instanceof OpenAI.APIError) {
      switch (err.status) {
      case 400:
        console.log("Bad request");
        break;
      case 401:
        console.log("Unauthorized");
        break;
      case 403:
        console.log("Forbidden");
        break;
      case 404:
        console.log("Not found");
        break;
      case 429:
        console.log("Too many requests");
        break;
      case 500:
        console.log("Internal server error");
        break;
      default:
        console.log("Unknown error");
        break;
      }
      console.log(err.status);
      console.log(err.name);
      console.log(err.headers);
    } else {
      throw err;
    }
  });

  if (chatCompletion) {
    console.log(chatCompletion.choices[0]);
    return chatCompletion.choices[0];
  }

  return null;
};
