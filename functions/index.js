import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {
    structuredData: true,
  });
  response.send('Hello from Firebase!');
});

export const ssr = functions.https.onRequest((request, response) => {
  response.send('<h1>Hello SSR!</h1>');
});
