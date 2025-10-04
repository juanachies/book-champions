import { Form } from "react-bootstrap"

const BookSearch = ({onSearch}) => {

    const handleChangeForm = (bookName) => {
        onSearch(bookName.target.value);
    }

    return (
        <Form.Group className="mb-3" controlId="searchBook">
            <Form.Control
                type="text"
                placeholder="Buscar libro..."
                onChange={handleChangeForm}
            />
        </Form.Group>
    )
};

export default BookSearch;