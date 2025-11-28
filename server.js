// handle uncaught exceptions:
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('uncaught exception .. shutting down ...');
  process.exit(1);
});

import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

const server = app.listen(process.env.PORT, () =>
  console.log(`app listen on port ${process.env.PORT}`)
);

// handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejections. shutting down ...');
  server.close(() => {
    process.exit(1);
  });
});
