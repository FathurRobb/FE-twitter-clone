import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate } from "react-router-dom";

const CardPost = (post) => {
    const navigate = useNavigate()

    const toDetailPost = (postId) => {
        navigate(`/post/${postId}`)
    }

    return (
        <div>
            <Card style={{ cursor: 'pointer' }} className='my-2' onClick={() => toDetailPost(post.post.id)}>
                <CardHeader>{post.post.name}</CardHeader>
                <Card.Body>
                    {post.post.post}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardPost;