const mongoose = require("mongoose");
const Book = require("../models/book");
const User = require("../models/User")
const getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find().populate("user");
    }
    catch (err) {
        console.log(err)
    }
    if (!books) {
        return res.status(404).json({ message: "no books" })
    }
    return res.status(200).json({ books })
}

const addBook = async (req, res, next) => {
    const { name, author, description, price, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    const book = new Book({
        name,
        author,
        description,
        price,
        image,
        user

    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await book.save({ session });
        existingUser.books.push(book);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }

    return res.status(200).json({ book });
};
const getById = async (req, res, next) => {
    let books;
    console.log("id",req.params);
    try {
        books = await Book.findById(req.params.id);
    }
    catch (err) {
        console.log(err);
    }
    if (!books) {
        return res.status(404).json({ message: "book with this id not found.." })
    }
    return res.status(200).json({ books })
}
const updateById = async (req, res, next) => {
    const { name, author, description, price, image } = req.body;
    let books;
    try {
        books = await Book.findByIdAndUpdate(req.params.id, {
            name,
            author,
            description,
            price,
            image
        });

    }
    catch (err) {
        console.log(err);
    }

    if (!books) {
        return res.status(404).json({ message: "unable to update " })
    }
    return res.status(200).json({ books })
}
const deleteById = async (req, res, next) => {
    let book;
    try {
        book = await Book.findByIdAndRemove(req.params.id).populate("user")
        await book.user.books.pull(book);
        await book.user.save();
    }
    catch (err) {
        console.log(err);
    }
    if (!book) {
        return res.status(404).json({ message: "book with this id not found.." })
    }
    return res.status(200).json({ message: "successsfully deleted" })
}
const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBooks;
    try {

        userBooks = await User.findById(userId).populate("books");
    }
    catch (err) {
        return console.log(err);
    }
    if (!userBooks) {
        return res.status(404).json({ message: "no books found" })
    }
    return res.status(200).json({ books: userBooks });
}

const searchBook = async (req, res, next) => {

    const { key } = req.body
    console.log(key);


    const allData = await Book.find()
    const filteredData=await allData.filter((data) => {
        console.log(data.name.toLocaleLowerCase());
       return data.name.toLocaleLowerCase().includes(key.toLocaleLowerCase())
    })
    console.log(filteredData);
    try {
        res.send({
            message: "success",
            data: filteredData
        })
    }
    catch (err) {
        res.send({
            message: "error",
            data: err
        })
    }
}

module.exports = { getAllBooks, addBook, getById, updateById, deleteById, getByUserId, searchBook }