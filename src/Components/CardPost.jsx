import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { cancelLikes, createLikes, getLikes } from "../redux/modules/likes";
import { useEffect } from "react";

const CardPost = (post) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toDetailPost = (postId) => {
        navigate(`/post/${postId}`)
    }

    const session = JSON.parse(sessionStorage.getItem('data_user'))

    const { likes } = useSelector(state => state.likes)

    useEffect(() => {
        dispatch(getLikes(+session.id))
    }, [dispatch])

    const giveLike = (postId) => {
        dispatch(createLikes({ postId: postId, userId: +session.id }))
    }

    const undoLike = (id) => {
        dispatch(cancelLikes({ id: +id}))
    }

    return (
        <section className="card-tweet" style={{ cursor: 'pointer' }}>
            <p>{post.post.name}<span className="username"> @username</span></p>
            <p onClick={()=> toDetailPost(post.post.id)}>
                {post.post.post}
            </p>
            <div className="like-rt-reply">
                <FontAwesomeIcon className="icon" icon={faComment} />
                <FontAwesomeIcon className="icon" icon={faRetweet} />
                {
                    likes.postId === +post.post.id ?
                        <FontAwesomeIcon className="icon" icon={faHeart} onClick={() => undoLike(likes.id)}/>
                        :
                        <FontAwesomeIcon className="icon" icon={faHeart} onClick={() => giveLike(post.post.id)} style={{color: 'pink'}}/>
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