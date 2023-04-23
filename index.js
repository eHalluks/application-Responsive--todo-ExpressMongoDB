const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const {TodoRecord} = require("./records/todo.record");

const app = express();

// Ustawienie folderu views jako folderu widoku.
app.set('views', path.join(__dirname, 'views'));

// Ustawienie silnika szablonów Handlebars jako domyślnego.
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get("/", (req, res) => {

    const todoList = TodoRecord.ListAll()

    res.render('todo/todos', {
        todoList,
    });

});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});
