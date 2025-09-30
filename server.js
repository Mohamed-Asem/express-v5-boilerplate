import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

app.listen(process.env.PORt, () =>
  console.log(`app listen on port ${process.env.PORt}`)
);
