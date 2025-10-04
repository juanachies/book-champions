import { useState } from 'react';
import {Badge, Card, Button} from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons';
import Modal from '../../ui/modal/Modal'
import { useNavigate } from 'react-router';

const BookItem = ({id, title, author, rating, pageCount, imageUrl, available, summary, onSelected, onDelete}) => {
    
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    const handleSelectBook = (book) => {
        // onSelected(title);
        navigate(`${id}`, {
            state: {
                book: {
                    title,
                    author,
                    rating,
                    pageCount,
                    imageUrl,
                    available,
                    summary,
                },
            },
        })
    }

    const handleDeleteBook = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    const handleConfirm = () => {
        setShowModal(false);
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'DELETE'
        }).then(res => {
            if (!res.ok) {
                throw new Error('Error en el servidor')
            }
        }).catch(err => console.log('Error al eliminar el libro', err.messege));
        onDelete(id)
    };

    

    return (
        <>
        <Card style={{width: '23rem'}} className='mx-3' >
            <Card.Img height={400} variant='top' src={imageUrl !== '' ? imageUrl : 'https://bit.ly/47NylZk'}/>
            <Card.Body>
                <div className='mb-2'>
                    {available ?
                        <Badge bg='success'>Disponible</Badge> 
                        :
                        <Badge bg='danger' >Reservado</Badge>
                    }{/*true: caso 1, false: caso 2*/}
                </div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{author}</Card.Subtitle>
                <div>
                    {
                        Array.from({length: 5}, (_, index) => 
                            index < rating ? <StarFill color='gold' key={index}/> : <Star color='gold' key={index}/>
                        )
                    }
                </div>
                <p>{pageCount} páginas </p>
                <div className='d-flex gap-2'>
                    <Button onClick={handleSelectBook} >
                        Seleccionar libro
                    </Button>
                    <Button variant='danger' onClick={handleDeleteBook}>
                        Eliminar libro
                    </Button>
                </div>
                
            </Card.Body>
        </Card>

        <Modal 
            show={showModal}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
        />
        </>
    )
};

export default BookItem;