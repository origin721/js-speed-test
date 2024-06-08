import { serve } from "bun";

import { multithreading } from './multithreading.js';

// Create a multithreading wrapper for the sum function
const sumArray = multithreading('./sum-array.js');
const concatStrings = multithreading('./concat-strings.js');

// Define the port number
const PORT = 3000;

// let countRequest = 0;
// let countResponse = 0;

// setInterval(() => {
//   console.log({countRequest, countResponse});
// }, 3000);

// Create and start the HTTP server
serve({
  port: PORT,
  async fetch(req) {
    //++countRequest;
    try {
      const url = new URL(req.url);
      switch(url.pathname) {
        case '/hello-world': return new Response("hello-world");
        case '/array-sum': {
          if(req.method === 'POST') {
            return new Response(await sumArray(await req.json()));
          }
        }
        case '/concat-strings': {
          if(req.method === 'POST') {
            return new Response(await concatStrings(await req.json()));
          }
        }
      }
      return new Response("404!")
    }
    catch(err) {
      return new Response("500");
    }
    finally {
     // ++countResponse;
    }
  },
});

console.log(`Server is running on http://localhost:${PORT}`);
