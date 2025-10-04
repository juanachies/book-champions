import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample({show, onCancel, onConfirm}) {
    
    return (
        <Modal show={show} onHide={onCancel} >
            <Modal.Header closeButton>
                <Modal.Title>Cuidado</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>¿Esta seguro que quiere eliminar este libro?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onCancel} variant="secondary">Cancelar</Button>
                <Button onClick={onConfirm} variant="primary">Eliminarlo</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StaticExample;