import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate } from "react-router-dom";

const CardPost = (post) => {
    const navigate = useNavigate()

    const toDetailPost = (postId) => {
        navigate(`/post/${postId}`)
    }

    return (
        <section className="card-tweet">
            <p>display name <span className="username">@username</span></p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In magni beatae placeat id dolores cum rem enim, itaque corrupti non inventore quos laboriosam, maiores deserunt?
            </p>
            <div className="like-rt-reply">
                <FontAwesomeIcon className="icon" icon={faComment} />
                <FontAwesomeIcon className="icon" icon={faRetweet} />
                <FontAwesomeIcon className="icon" icon={faHeart} />
            </div>

            {/* <Card style={{ cursor: 'pointer' }} border="light" className='my-2' bg='dark' key='dark' text='white' onClick={() => toDetailPost(post.post.id)}>
                <CardHeader>{post.post.name}</CardHeader>
                <Card.Body className='border-light border-top'>
                    {post.post.post}
                </Card.Body>
            </Card> */}
        </section>
    );
}

export default CardPost;