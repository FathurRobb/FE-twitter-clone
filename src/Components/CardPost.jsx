import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardPost = () => {
    const navigate = useNavigate()

    const toDetailPost = (e) => {
        e.preventDefault()
        navigate('/post')
    }

    return (
        <Card style={{cursor: 'pointer'}} className='my-2' onClick={toDetailPost}>
            <Card.Body>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </Card.Body>
        </Card>
    );
}
 
export default CardPost;