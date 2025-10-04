import { useLocation, useNavigate, useParams } from "react-router";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import BookForm from "../bookForm/bookForm";

const BookDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();

    const [showBookForm, setShowBookForm] = useState(false)
    const [book,setBook] = useState(null)
    const { title, author, pageCount, summary, imageUrl, rating, available } = location.state.book; // PREGUNTAR

    const clickHandler = () => {
        navigate("/library");
    };

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    const handleShowForm = () => {
        setShowBookForm(!showBookForm);
    }

    const handleBookUpdated = (updateBook) => {
        setBook(updateBook);
        setShowBookForm(false)
    }

    useEffect(() => {
        const bookState = {
            ...location.state.book,
            id: parseInt(id, 10)
        }
        setBook(bookState)
    }, [location.state.book, id])

    
    return (
        <>
        <Card className="my-3 w-25">
            <Card.Img
                height={500}
                variant="top"
                src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
            />
            <Card.Body>
                <div className="mb-2">
                    {available ?
                        <Badge bg="success">Disponible</Badge>
                        :
                        <Badge bg="danger">Reservado</Badge>
                    }
                </div>
                <Card.Title>{book?.title}</Card.Title>
                <Card.Subtitle>{book?.author}</Card.Subtitle>
                {ratingStars}
                <p>{book?.pageCount} páginas</p>
                <p className="my-3">
                    <b>Sinopsis</b>: {book?.summary}
                </p>
                <Row>
                    <Button className= 'mb-2 me-2' variant="secondary" onClick={handleShowForm}>
                        {showBookForm ? 'Ocultar formulario' : 'Editar libro'}
                    </Button>
                    <Button className="me-2" onClick={clickHandler}>
                        Volver a la página principal
                    </Button>
                </Row>
                
            </Card.Body>
        </Card>
        {showBookForm && <BookForm isEditing={true} book={book} onBookSaved={handleBookUpdated}/>}
        </>
    );
};


export default BookDetails;