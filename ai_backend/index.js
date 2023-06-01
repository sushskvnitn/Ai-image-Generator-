const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT ;

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
