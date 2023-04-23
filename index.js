const express = require("express");
const methodOverride = require("method-override");
const {engine} = require('express-handlebars');
const {handleError} = require("./utils/error");

const app = express();
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//global handle error function
app.use(handleError);
// app.use(express.json());
app.engine('.hbs', engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.get("/", (req, res) => {
  res.render('todo/todo');
});

app.listen(3000, 'localhost',  () => {
  console.log("Server is running on port 3000 http://localhost:3000");
});
