
const express = require('express');
const app = express();
const port = 10888;
const userRouter = require('./routes/userroute.js')();
const filmRouter = require('./routes/filmroute.js')();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter);
app.use(filmRouter);

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`);
});