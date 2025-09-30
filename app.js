import express from 'express';
import globalErrorHandler from './controllers/errorController.js';
const app = express();
app.set('query parser', 'extended');
app.use(express.json());

// handling unhandled routes:
app.all(/(.*)/, (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `this route ${req.originalUrl} does not exist on this server`,
  });
});

// global error handling
app.use(globalErrorHandler);
export default app;
