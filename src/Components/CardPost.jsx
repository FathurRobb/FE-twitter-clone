import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardPost = ({body}) => {
    const navigate = useNavigate()

    const toDetailPost = (e) => {
        e.preventDefault()
        navigate('/post')
    }

    return (
        <Card style={{cursor: 'pointer'}} className='my-2' onClick={toDetailPost}>
            <Card.Body>
                {body}
            </Card.Body>
        </Card>
    );
}
 
export default CardPost;