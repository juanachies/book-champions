import Books from "../models/Books.js";


export const findBooks = async (req, res) => {
    const books = await Books.findAll();
    res.json(books);
};


export const findBook = async (req, res) => {
    const { id } = req.params;
    const book = await Books.findByPk(id);

    if (!book)
        return res.status(404).send({ message: 'Book not found'})

    res.json(book);
}


export const createBook = async (req, res) => {
     const {title, author, rating, pageCount, summary, imageUrl, available} = req.body;

    if (!title || !author)
        return res.status(400).send({ message: 'Title and author fields are required'});

    const newBook = await Books.create({
        title,
        author,
        rating, 
        pageCount,
        summary,
        imageUrl,
        available
    })

    res.json(newBook);
}


export const updateBook = async (req, res) => {
    const {id} = req.params;
    const {title, author, rating, pageCount, summary, imageUrl, available} = req.body;

    const book = await Books.findByPk(id);

    if (!book)
        return res.status(404).send({ message: 'Book not found'});

    await book.update({
        title,
        author,
        rating, 
        pageCount,
        summary,
        imageUrl,
        available
    });

    await book.save();

    res.json(book);
} 


export const deleteBook = async (req, res) => {
    const {id} = req.params;
    const book = await Books.findByPk(id);

    if (!book)
        return res.status(404).send({ message: 'Book not found'});

    await book.destroy();

    res.send(`Book with id: ${id} deleted`)
}