const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const {TodoRecord} = require("./records/todo.record");
const bodyParser = require('body-parser');
const {todoRouter} = require("./routers/todo");
const methodOverride = require('method-override');
require('express-async-errors');
require('./utils/db');
const moment = require("moment");
const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todo', todoRouter);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get("/", async (req, res) => {

    const now = moment();
    const date = now.format('DD.MM.YYYY');
    const time = now.format('HH:mm:ss')

    res.render('todo/todos', {
        date,
        time,
    });

});



app.get("/", async (req, res) => {

    const todoList = await TodoRecord.findAll();

    res.render('todo/todos', {
        todoList,
    });

});

app.post("/", async (req, res) => {

    const getTodoToUpdate = req.body.id;

    if(getTodoToUpdate === undefined ||!getTodoToUpdate || String(getTodoToUpdate).length === 0){
        const todo = new TodoRecord({
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription
        });
        await todo.insert();
    } else {
        const todoToUpdate = await TodoRecord.find(getTodoToUpdate);
        todoToUpdate.shortDescription = req.body.shortDescription;
        todoToUpdate.longDescription = req.body.longDescription;
        await todoToUpdate.update();
    }

    res.redirect('/');
});

app.get("/:id", async (req, res) => {

    const todo = await TodoRecord.find(req.params.id);
    res.render('todo/todos', {
        todo: todo,
    });

})
app.delete("/:id", async (req, res) => {
    await TodoRecord.delete(req.params.id);
    res.redirect('/');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000 http://localhost:3000/.');
});
