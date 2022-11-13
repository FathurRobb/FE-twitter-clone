import Sidebar from "../Components/Sidebar";
import { Container, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, createComment, deleteComment } from "../redux/modules/comments";
import useInput from "../hooks/useInput";
import ButtonAction from "../Components/ButtonAction";
import { getPostsByID } from "../redux/modules/posts";
const DetailPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { comments, isLoading } = useSelector(state => state.comments)
    const { id } = useParams();
    const { post } = useSelector(state => state.posts)
    const [comment, handleCommentChange, setComment] = useInput();

    const session = JSON.parse(sessionStorage.getItem('data_user'))

    const handleSubmit = event => {
        event.preventDefault();
        if (!comment) {
            return;
        }
        makeComment();
    }

    const makeComment = () => {
        dispatch(createComment({ body: comment, postId: +id, userId: session.id }))
        setComment('')
    }

    const removeComment = (commentId) => {
        dispatch(deleteComment({ commentId: commentId, postId: +id }))
    }

    useEffect(() => {
        dispatch(getComments(+id))
        dispatch(getPostsByID(+id))
    }, [dispatch, id])

    const toHomePage = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <Sidebar>
            <Container style={{ cursor: 'pointer' }} className='px-0'>
                <header className="d-flex align-items-center px-3">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
                    <h4 className="mx-4">Post</h4>
                </header>
                {
                    isLoading ?
                        <div>Loading....</div>
                        :
                        <div>
                            <section className="my-4 border-bottom border-dark pb-3 px-3">
                                <p className="border-bottom border-dark pb-3 px-3">
                                    {post ? post.post : ''}
                                </p>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Reply Post..."
                                        aria-label="Reply Post..."
                                        style={{ border: 'none' }}
                                        value={comment}
                                        onChange={handleCommentChange}
                                        disabled={!session}
                                    />
                                    <ButtonAction variant={"outline-dark"} onClick={handleSubmit} text={"Reply"} />
                                </InputGroup>
                            </section>
                            <section className="px-3">
                                {comments.map(comment => (
                                    <div key={comment.id}>
                                        <Card className='my-2' >
                                            <Card.Body>
                                                <Card.Text>
                                                    {comment.body}
                                                </Card.Text>
                                                {session ? comment.userId === session.id ?
                                                    <ButtonAction variant={"danger"} className={'ms-2'} onClick={() => removeComment(comment.id)} text={'Delete'}>
                                                        <FontAwesomeIcon icon={faTrash} className='me-2' />
                                                    </ButtonAction>
                                                    : '' : ''}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </section>
                        </div>
                }
            </Container>
        </Sidebar>
    );
}

export default DetailPost;