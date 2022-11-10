import Sidebar from "../Components/Sidebar";
import { Container, Form, InputGroup, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../redux/modules/comments";
import axios from "axios";
import useInput from "../hooks/useInput";
import ButtonAction from "../Components/ButtonAction";


const postUrl = `${process.env.REACT_APP_API_URL}posts/`
const commentUrl = `${process.env.REACT_APP_API_URL}comments/`
const DetailPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { comments } = useSelector(state => state.comments)
    const { id } = useParams();
    const [dataPost, setDataPost] = useState();
    const [comment, handleCommentChange, setComment] = useInput();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [newComment, setNewComment] = useState('');

    const session = JSON.parse(sessionStorage.getItem('data_user'))

    const handleNewComment = event => {
        setNewComment(event.target.value)
    }
    const handleSubmit = event => {
        event.preventDefault();
        if (!comment) {
            return;
        }
        createComment();
    }

    const handlePatchReq = commentId => {
        if (!newComment) {
            return
        }
        patchComment(commentId);
        setShow(false)
    }

    const patchComment = async (commentId) => {
        await axios.patch(commentUrl + commentId, { body: newComment });
        dispatch(__getComments())
    }

    const createComment = async () => {
        await axios.post(commentUrl, { body: comment, postId: +id, userId: session.id })
        dispatch(__getComments())
        setComment('')
    }

    const getPostByID = async () => {
        const post = await axios.get(postUrl + id)
        const data = await post.data
        setDataPost(data)
    }

    const deleteComment = async (commentId) => {
        await axios.delete(commentUrl + commentId)
        dispatch(__getComments())
    }

    useEffect(() => {
        dispatch(__getComments())
        getPostByID()
    }, [dispatch])


    const commentsFilter = comments.filter(comment => comment.postId === +id)



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
                <section className="my-4 border-bottom border-dark pb-3 px-3">
                    <p className="border-bottom border-dark pb-3 px-3">
                        {dataPost ? dataPost.post : ''}
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
                    {commentsFilter.map(comment => (
                        <div key={comment.id}>
                            <Card className='my-2' >
                                <Card.Body>
                                    <Card.Text>
                                        {comment.body}
                                    </Card.Text>
                                    {session ? comment.userId === session.id ?
                                        <div>
                                            <ButtonAction variant={"primary"} onClick={()=> (
                                                setShow(true),
                                                setNewComment(`${comment.body}`))} text={"Edit"}>
                                                <FontAwesomeIcon icon={faPen} className='me-2' />
                                            </ButtonAction>
                                            <ButtonAction variant={"danger"} className={'ms-2'} onClick={() => deleteComment(comment.id)} text={'Delete'}>
                                                <FontAwesomeIcon icon={faTrash} className='me-2' />
                                            </ButtonAction>
                                        </div>
                                        : '' : ''}
                                </Card.Body>
                            </Card>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Comment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                type="text"
                                                placeholder="Your New Post"
                                                value={newComment}
                                                onChange={handleNewComment}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonAction variant={"secondary"} onClick={handleClose} text={"Close"} />
                                    <ButtonAction variant={"primary"} onClick={() => handlePatchReq(comment.id)} text={"Save Changes"} />
                                </Modal.Footer>
                            </Modal>
                        </div>
                    ))}
                </section>
            </Container>
        </Sidebar>
    );
}

export default DetailPost;