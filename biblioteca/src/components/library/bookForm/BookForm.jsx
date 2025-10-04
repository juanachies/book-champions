import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const BookForm = ({book, onBookAdded, onBookSaved, isEditing = false}) => {
    const [title, setTitle] = useState(book?.title)
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const [author, setAuthor] = useState(book?.author)
    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value);
    }

    const [rating, setRating] = useState(book?.rating)
    const handleChangeRating = (event) => {
        setRating(event.target.value);
    }

    const [pageCount, setPageCount] = useState(book?.pageCount)
    const handleChangePageCount = (event) => {
        setPageCount(event.target.value);
    }

    const [imageUrl, setImageUrl] = useState(book?.imageUrl)
    const handleChangeimageUrl = (event) => {
        setImageUrl(event.target.value);
    }

    const [available, setAvailable] = useState(book?.available)
    const handleChangeAvailable = (event) => {
        setAvailable(event.target.checked);
    }


    const handleAddBook = (event) => {
        event.preventDefault();

        const bookData = {
            title,
            author,
            rating: parseInt(rating, 10),
            pageCount: parseInt(pageCount, 10),
            imageUrl,
            available
        };

        onBookAdded(bookData);
        setTitle('');
        setAuthor('');
        setRating(0);
        setPageCount(0);
        setImageUrl('');
        setAvailable(false);
    }

    const handleSaveBook = (event) => {
        event.preventDefault();

        const bookData = {
            title, 
            author, 
            rating: parseInt(rating, 10),
            pageCount: parseInt(pageCount, 10),
            imageUrl,
            available
        }

        fetch(`http://localhost:3000/books/${book.id}`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(bookData)
        })
        .then(res => res.json())
        .then(() => {
            onBookSaved(bookData)
        })
        .catch(err => console.log(err))
    }

    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate('/library', {replace:true})
    }

    return (
        <div className="d-flex justify-content-center">
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form 
                    className="text-white" 
                    onSubmit={isEditing ? handleSaveBook : handleAddBook} 
                >
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar título" value={title} onChange={handleChangeTitle} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar autor" value={author} onChange={handleChangeAuthor} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    value={rating}
                                    onChange={handleChangeRating}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount" >
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    value={pageCount}
                                    onChange={handleChangePageCount}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar url de imagen" value={imageUrl} onChange={handleChangeimageUrl}/>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                checked={available}
                                onChange={handleChangeAvailable}
                            />
                            <Col className='d-flex gap-3' onClick={handleGoBack}>
                                <Button variant="secondary">
                                    Volver
                                </Button>
                                <Button variant="primary" type="submit">
                                    {isEditing ? 'Editar lectura' : 'Agregar lectura'}
                                </Button>
                            </Col>
                            
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
        </div>
    );
};


export default BookForm;