const express = require('express');

const app = express();

app.use(express.json());

var books = [
    {id:1,name:"Java",qty:1},
    {id:2,name:"Java",qty:1},
    {id:3,name:"Java",qty:1},
];

app.get("/",(req,res)=>{
 res.send("Hello World");
});


app.get("/books",(req,res)=>{
    console.log(req);
    res.json(books);
})
app.get("/books/:bid",(req,res)=>{

    const id = parseInt(req.params.bid);
    const book = books.find((b1)=>b1.id===id);

    if(book){
        res.json(book);
    }else{
        res.status(404).json({msg:"Book not found"});
    }
    
})


app.post("/books",(req,res)=>{
    const {id,name,qty}=req.body;
    const newBook = {id,name,qty};
    
    books.push(newBook);
    res.json({book:newBook,msg:"Book added successfully"});
    
});

app.put("/books/:bid",(req,res)=>{
    const id = parseInt(req.params.bid);
    
    const {name} = req.body;
    
    const bookIndex = books.findIndex((b1)=> b1.id === id);
    console.log(bookIndex);
    if(bookIndex != -1){
        books[bookIndex] = {...books[bookIndex],name};
        res.json({updatedBook:books[bookIndex],msg:"Book updated successfully"});
    }else{
        res.status(404).json({msg:"Book not found"});
        
    }
});

app.delete("/books/:bid",(req,res)=>{
    const id = parseInt(req.params.bid);

    const bookIndex = books.findIndex((b1)=> b1.id === id);
    
     
    if(bookIndex != -1){
        books.splice(bookIndex,1);
        res.json({msg:"Book deleted successfully"});
    }else{
        res.status(404).json({msg:"Book not found"});
        
    }
})


app.listen(3000,(req,res)=>{
console.log("Server Started at Port 3000");
});