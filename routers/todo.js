const {Router} = require("express");
const todoRouter = Router();

todoRouter.post("/todo", (req, res) => {
    res.redirect('/')
});

module.exports = {todoRouter};