
const express = require("express")
const ejs = require('ejs')
const app = express()
app.set("view engine", 'ejs')
app.use(express.urlencoded({extended:true}))

let todo =[]

app.get('/',(request, response)=>{
    // response.send([
    //     {Name: "tool", Class: "Node"},
    //     {Name: "tool", Class: "Node"}
    // ])
    response.sendFile(__dirname + "/index.html")
    response.render('index', {name: "Toheeb", class: "Node"})
})

app.get("/todo", (req, res)=>{
    res.render("todo", {todo: todo})
})

app.listen(5000, ()=>{
    console.log("app started on port 5000")
})
app.post('/todo', (req, res)=> {
    console.log(req.body);
    const {name, title, content} = req.body
    todo.push({name, title, content})
    console.log(todo)
    res.redirect(`todo`)
})
app.post('/delete:index', (req, res)=> {
    const index = req.params.index; 
    todo.splice(index, 1)
    res.redirect(`todo`)
})

app.get("/edit/:index", (req, res) => { 
    const index = req.params.index;
    const todoItem = todo[index];
    res.render("edit", {edit: edit}); 
});

app.post('/edit:index', (req, res)=> {
    const index = req.params.index;
    const {name, title, content} = req.body;
    todo[index] = {name, title, content}; 
    res.redirect(`/todo`);
})