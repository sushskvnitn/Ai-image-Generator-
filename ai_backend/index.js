const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT ;
const path = require('path');
const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

app.use(require('./routes/openaiRoutes'));

app.use(express.static(path.join(__dirname, "/ai_frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/ai_frontend/build/index.html"))
);
app.listen(port, () => console.log(`Server started on port ${port}`));
