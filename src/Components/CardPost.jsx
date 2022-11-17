import { faComment, faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CardPost = ({post}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toDetailPost = (postId) => {
        navigate(`/post/${postId}`)
    }

    const dataUser = JSON.parse(sessionStorage.getItem('data_user'))

    return (
        <section className="card-tweet" style={{ cursor: 'pointer' }}>
            <p>{post.name}<span className="username"> @username</span></p>
            <p onClick={()=> toDetailPost(post.id)}>
                {post.post}
            </p>
            <div className="like-rt-reply">
                <FontAwesomeIcon className="icon" icon={faComment} />
                <FontAwesomeIcon className="icon" icon={faRetweet} />
                <FontAwesomeIcon className="icon" icon={faHeart} />
                {
                    dataUser ?
                    post.userId === dataUser.id ? <FontAwesomeIcon className="icon" icon={faTrashCan} /> : '' :
                    ''
                }
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