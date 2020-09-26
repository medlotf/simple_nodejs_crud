const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.all('/', (req, res, next) => {
  res.send("Hello World");
  next();
});

const usersRoutes = require('./src/routes/usersRoutes')

app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});