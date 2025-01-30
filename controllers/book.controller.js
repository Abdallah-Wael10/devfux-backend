const data = require("../models/book.model")
const asyncWrapper = require("../middleware/asyncWrapper")

const getAllBook = asyncWrapper(async(req,res)=>{
    const books = await data.find({},{__v:false})
    res.json(books)
})
const getBook = asyncWrapper(async(req,res)=>{
    const book = await data.findById(req.params.id, {__v:false});
    if(!book) return res.status(404).json({msg:"Book not found"})
    res.json(book)
})

const createBook = asyncWrapper(async(req,res)=>{
    const newbook = new data(req.body);
    const book = await newbook.save();
    res.status(201).json(book)
})

const updateBook = asyncWrapper(async(req,res)=>{
    const id = req.params.id;
    const book = await data.updateOne(
        {_id: id},
        {$set: {...req.body}},
    )
    res.json(book)
})

const deleteBook = asyncWrapper(async(req,res)=>{
    await data.deleteOne({_id: req.params.id})
    res.json({ message: "Lead deleted successfully." })
})

module.exports = {
    getAllBook,
    getBook,
    createBook,
    updateBook,
    deleteBook,
 }  
