import { useState } from "react";
import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/bookSearch";

const Books = ({books, onDelete}) => {

    const [selectedBook, setSelectedBook] = useState('');
    const handleBookSelected = (title) => {
        setSelectedBook(title)
    };

    const [bookSearched, setBookSearched] = useState('');
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(bookSearched.toLowerCase())
    );

    return (
        <>
        <div className="d-flex justify-content-center flex-wrap">
            <BookSearch onSearch={setBookSearched}/>
            {selectedBook && <p className="w-100 text-center mb-3">El libro seleccionado es <span className="fw-bold">{selectedBook}</span></p> }
        </div>

        <div className="d-flex justify-content-center flex-wrap">
            {filteredBooks.length > 0 ? 
                filteredBooks.map(book =>(
                    <BookItem
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        rating={book.rating}
                        pageCount={book.pageCount}
                        imageUrl={book.imageUrl}
                        available={book.available}
                        summary={book.summary}
                        onSelected={handleBookSelected}
                        onDelete={onDelete}
                    />
            ))
            : 
            <p>No se encontró el libro seleccionado</p>}
        </div>
        </>
    )
};

export default Books;