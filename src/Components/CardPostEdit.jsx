import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button } from "react-bootstrap";

const CardPostEdit = () => {
    return (
        <Card className='my-2'>
            <Card.Body>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="primary">
                    <FontAwesomeIcon icon={faPen} className='me-2' />
                    Edit
                </Button>
                <Button variant="danger" className='ms-2'>
                    <FontAwesomeIcon icon={faTrash} className='me-2' />
                    Edit
                </Button>
            </Card.Body>
        </Card>
    );
}
 
export default CardPostEdit;