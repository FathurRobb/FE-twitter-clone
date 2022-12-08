import { faComment, faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../redux/reducers/posts";
import { cancelLikes, createLikes, getLikes } from "../redux/reducers/likes";
import Avatar from "react-avatar";

const CardPost = ({post}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const toDetailPost = (postId) => {
        navigate(`/post/${postId}`)
    }

    const removePost = (postId) => {
        dispatch(deletePost({ postId: postId, userId: post.userId }))
    }

    const dataUser = JSON.parse(sessionStorage.getItem('data_user'))

    useEffect(() => {
        if(dataUser){
            dispatch(getLikes(+dataUser.id))   
        } 
    }, [dispatch])

    const { likes } = useSelector(state => state.likes)
    // const { countLikes } = useSelector(state => state.likes)
    // console.log(likes)

    let giveLike;
    let undoLike;
    if(dataUser) {
        giveLike = (postId) => {
            // console.log(postId)
            dispatch(createLikes({ postId: postId, userId: +dataUser.id }))
        }
        undoLike = (id) => {
            // console.log(id)
            dispatch(cancelLikes({ id: +id}))
        }
    }

    console.log(post)
    return (
        <section className="card-tweet" style={{ cursor: 'pointer' }}>
            <Avatar color='gray' name={post.username} round size='35px' style={{marginRight: '10px', marginTop: '5px'}}/>
            <b>{post.username}</b> <span className="username"> @{post.username}</span> <span style={{fontSize: '15px'}}>{post.datetime}</span>
            <p style={{marginLeft: '45px', marginTop: '-10px'}} onClick={()=> toDetailPost(post.postId)}>
                {post.content}
            </p>
            <div className="like-rt-reply">
                <FontAwesomeIcon className="icon reply" icon={faComment} />
                <FontAwesomeIcon className="icon rt" icon={faRetweet} />
                {
                    dataUser ? 
                        (likes.filter(like => like.postId === +post.id)).length > 0 ?
                            likes.filter(like => like.postId === +post.id)
                                .map(like => 
                                    like.postId === +post.id ?
                                        <FontAwesomeIcon key={like.id} className="icon like" icon={faHeart} onClick={() => undoLike(like.id)} style={{color: 'pink'}} />
                                    : ''
                                )
                            // console.log("sudah LIKE", likes)
                            :
                            <FontAwesomeIcon className="icon like" icon={faHeart} onClick={() => giveLike(+post.id)}/>
                            // console.log(post.id,"belum di like")
                        :
                        <FontAwesomeIcon className="icon like" icon={faHeart} />
                }
                {
                    dataUser&&  post.userId === dataUser.id ? <FontAwesomeIcon className="icon" onClick={()=>removePost(post.id)} icon={faTrashCan} /> : ''
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