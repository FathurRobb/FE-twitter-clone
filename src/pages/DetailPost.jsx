import Sidebar from "../Components/Sidebar";
import { Container, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../redux/modules/comments";
import axios from "axios";
import useInput from "../hooks/useInput";
import ButtonAction from "../Components/ButtonAction";


const postUrl = 'https://salty-beyond-47708.herokuapp.com/posts/'
const commentUrl = 'https://salty-beyond-47708.herokuapp.com/comments/'
const DetailPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { comments } = useSelector(state => state.comments)
    const { id } = useParams();
    const [dataPost, setDataPost] = useState();
    const [comment, handleCommentChange, setComment] = useInput();
    const session = JSON.parse(sessionStorage.getItem('data_user'))

    const handleSubmit = event => {
        event.preventDefault();
        if (!comment) {
            return;
        }
        createComment();
    }

    const createComment = async () => {
        await axios.post(commentUrl, { body:comment, postId:+id })
        dispatch(__getComments())
        setComment('')
    }

    const getPostByID = async () => {
        const post = await axios.get(postUrl + id)
        const data = await post.data
        setDataPost(data)
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
                        <ButtonAction variant={"outline-dark"} onClick={handleSubmit} text={"Reply"}/>
                    </InputGroup>
                </section>
                <section className="px-3">
                    {commentsFilter.map(comment => (
                        <Card className='my-2' key={comment.id}>
                            <Card.Body>
                                {comment.body}
                            </Card.Body>
                        </Card>
                    ))}
                </section>
            </Container>
        </Sidebar>
    );
}

export default DetailPost;