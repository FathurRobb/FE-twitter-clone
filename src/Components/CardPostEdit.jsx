import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Card, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { __getPosts } from "../redux/modules/posts";
import ButtonAction from "./ButtonAction";

const postUrl = "https://salty-beyond-47708.herokuapp.com/posts/"
const CardPostEdit = (post) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newPost, setNewPost] = useState(`${post.post.post}`);

    const  handleNewPost = event => {
        setNewPost(event.target.value)
    }

    // console.log(post);

    const handlePatchReq = event => {
        event.preventDefault();
        if (!newPost) {
            return
        }
        patchPost();
        setShow(false)
    }

    const patchPost = async () => {
        await axios.patch(postUrl + post.post.id, { post: newPost });
        dispatch(__getPosts())
    }

    const deletePost = async (postId) => {
        await axios.delete(postUrl + postId)
        dispatch(__getPosts());
    }

    return (
        <>
            <Card className='my-2'>
                <Card.Body key={post.post.id}>
                    <Card.Text>
                        {post.post.post}
                    </Card.Text>
                    <ButtonAction variant={"primary"} onClick={handleShow} text={"Edit"}>
                        <FontAwesomeIcon icon={faPen} className='me-2' />
                    </ButtonAction>
                    <ButtonAction variant={"danger"} className={'ms-2'} onClick={()=>deletePost(post.post.id)} text={'Delete'}>
                        <FontAwesomeIcon icon={faTrash} className='me-2' />
                    </ButtonAction>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Your New Post"
                                value={newPost}
                                onChange={handleNewPost} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonAction variant={"secondary"} onClick={handleClose} text={"Close"}/>
                    <ButtonAction variant={"primary"} onClick={handlePatchReq} text={"Save Changes"}/>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default CardPostEdit;