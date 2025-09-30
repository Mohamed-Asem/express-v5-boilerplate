<h1>Express v5 Global Error Handling Boilerplate 🚀</h1>
<p>A boilerplate for <strong>Express v5</strong> projects with a <strong>centralized global error handling system</strong>.<br>
This project demonstrates how to structure error handling in modern Express apps using a custom <code>AppError</code> class and a <code>globalErrorHandler</code> middleware.</p>
<hr>

<h2>📌 Features</h2>
<ul>
  <li>Centralized error handling for all routes</li>
  <li>Custom <code>AppError</code> utility class</li>
  <li>Environment-aware error responses (<code>development</code> vs <code>production</code>)</li>
  <li>Handles:
    <ul>
      <li>Invalid MongoDB ObjectId (<code>CastError</code>)</li>
      <li>Duplicate fields (<code>11000</code>)</li>
      <li>Validation errors</li>
      <li>JWT authentication errors (<code>TokenExpiredError</code>, <code>JsonWebTokenError</code>)</li>
      <li>Unknown/unhandled routes</li>
    </ul>
  </li>
  <li>Easy to extend and customize for your projects</li>
</ul>

<hr>

<h2>📂 Project Structure</h2>
<pre><code>.
├── controllers
│   └── errorController.js   # Global error handling middleware
├── utils
│   └── AppError.js          # Custom error class
├── app.js                   # Express app setup
├── server.js                # Entry point (you add this)
└── README.md
</code></pre>

<hr>

<h2>⚙️ Installation & Setup</h2>
<p>Clone the repo and install dependencies:</p>
<pre><code>git clone https://github.com/Mohamed-Asem/express-v5-boilerplate.git
cd express-v5-boilerplate
npm install
</code></pre>

<p>Create a <code>.env</code> file (for environment variables):</p>
<pre><code>NODE_ENV=development
PORT=3000
</code></pre>

<p>Start the server:</p>
<pre><code>npm run dev
</code></pre>

<hr>

<h2>🛠️ Usage Example</h2>
<h3>Throwing an error in a route (Express v5 way)</h3>
<pre><code class="language-js">
import express from "express";
import AppError from "./utils/AppError.js";

const router = express.Router();

router.get("/error-example", (req, res) => {
  // Example of a manual error
  throw new AppError(400, "This is a bad request example!");
});

export default router;
</code></pre>

<p>Attach this router in <code>app.js</code>:</p>
<pre><code class="language-js">
import exampleRouter from "./exampleRoutes.js";

app.use("/api/v1/example", exampleRouter);
</code></pre>

<p>Now hitting <code>http://localhost:3000/api/v1/example/error-example</code> will return:</p>
<pre><code class="language-json">
{
  "status": "fail",
  "message": "This is a bad request example!"
}
</code></pre>

<h3>Async route error (Express v5 automatically handles)</h3>
<pre><code class="language-js">
router.get("/async-error-example", async (req, res) => {
  const user = await User.findById("invalid-id"); // CastError will be thrown
  if (!user) {
    throw new AppError(404, "User not found!");
  }
  res.json({ status: "success", data: user });
});
</code></pre>

<hr>

<h2>🔒 Error Types Handled</h2>
<ul>
  <li><strong>AppError (Custom)</strong> → for manual errors in controllers</li>
  <li><strong>CastError</strong> → invalid MongoDB ObjectId</li>
  <li><strong>11000</strong> → duplicate key error</li>
  <li><strong>ValidationError</strong> → invalid Mongoose schema validation</li>
  <li><strong>TokenExpiredError</strong> → JWT token expired</li>
  <li><strong>JsonWebTokenError</strong> → invalid JWT token</li>
  <li><strong>Unhandled Routes</strong> → any route not defined returns 404</li>
</ul>

<hr>

<h2>🌍 Environment Modes</h2>
<ul>
  <li><strong>Development</strong><br>Returns detailed error info including stack trace for debugging.</li>
  <li><strong>Production</strong><br>Returns user-friendly messages and hides stack traces.</li>
</ul>

<hr>

<h2>📜 Example Error Responses</h2>
<h3>Development</h3>
<pre><code class="language-json">
{
  "status": "fail",
  "message": "Invalid input data : Email is required",
  "stack": "...",
  "error": { "errors": {...} }
}
</code></pre>

<h3>Production</h3>
<pre><code class="language-json">
{
  "status": "fail",
  "message": "Invalid input data : Email is required"
}
</code></pre>

<hr>

<h2>🚫 Contributing</h2>
<p>This boilerplate is intended to be used <strong>as-is</strong>.  
Please fork this repository and use it in your own projects.  
Pull Requests or direct changes to this repository will <strong>not</strong> be accepted.</p>

<hr>

<h2>📜 License</h2>
<p>This project is licensed under the <strong>MIT License</strong>. Feel free to use it in your own projects.</p>

<hr>

<p>🔥 With this boilerplate, you don’t need to reinvent error handling every time you start a new Express project. Just clone, start coding, and ship faster!</p>
