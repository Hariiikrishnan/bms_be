const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());


const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect("mongodb+srv://therihari36_db_user:tXuVj3n5tunq2OgX@cluster0.7gtqrrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected Mongo DB" + conn.connection.host);
    }catch(e){
        console.log("Error " + e.message);
    }
}
connectDB();




const bookSchema = new mongoose.Schema({
    id:Number,
    name:String,
    qty:Number,
});

const Book = mongoose.model("Books",bookSchema);

app.get("/",(req,res)=>{
 res.send("Hello World");
});


app.get("/books",async(req,res)=>{
    console.log("tap");
    try{
        const books = await Book.find({},{_v:0,_id:0});
        console.log(books);
        res.json(books);
    }catch(err){
        console.log("Error" + err.message);
        res.status(500).json({msg:err.message});
    }
})
app.get("/books/:bid",async(req,res)=>{

    const id = parseInt(req.params.bid);
  try{
        const book = await Book.findOne({id:id},{_v:0,_id:0});
        if(!book){
            res.status(404).json({msg:"Book Not Found"});
        }
        res.json(book);
    }catch(err){
        console.log("Error" + err.message);
        res.status(500).json({msg:err.message});
    }
    
})


app.post("/books",async(req,res)=>{
    const {id,name,qty}=req.body;
    const newBook = new Book({id,name,qty}) ;
    
    await newBook.save();
    res.json({book:newBook,msg:"Book added successfully"});
    
});

app.put("/books/:bid",async(req,res)=>{
    const id = parseInt(req.params.bid);
    
    const {name} = req.body;

    try{
        const result = await Book.updateOne({id:id},{
            $set:{
                name : req.body.name
            }
        });
        if(result.matchedCount == 0){
            res.status(404).json({err:"Book Not Found"});
        }else{

            console.log(result);
            res.json({msg:"Book updated successfully"});
        }
    }catch(e){
        console.log("Error" + err.message);
        res.status(500).json({msg:err.message});
    }
    
   
});

app.delete("/books/:bid",async(req,res)=>{
    const id = parseInt(req.params.bid);

  
    try{
        const result = await Book.deleteOne({id:id});
        if(result.deletedCount == 0){
            res.status(404).json({err:"Book Not Found"});
        }else{

            res.json({msg:"Book Deleted successfully"});
        }
    }catch(e){
        console.log("Error" + err.message);
        res.status(500).json({msg:err.message});
    }
})


app.listen(3000,(req,res)=>{
console.log("Server Started at Port 3000");
});