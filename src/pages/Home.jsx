import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import CardPost from '../Components/CardPost';
import Sidebar from '../Components/Sidebar';
import useInput from '../hooks/useInput';
import { __getPosts } from '../redux/modules/posts';

const postUrl = 'https://salty-beyond-47708.herokuapp.com/posts/'
const Home = () => {
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)
    const [post, handlePostChange, setPost] = useInput();
    const [ search, setSearch ] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        if (!post) {
            return;
        }
        createPost();
    }

    const session = JSON.parse(sessionStorage.getItem("data_user"))

    const createPost = async () => {
        await axios.post(postUrl, { post, userId:session.id, name:session.name })
        dispatch(__getPosts())
        setPost('')
    }

    console.log(session);

    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])

    return (
        <Sidebar setSearch={setSearch}>
            <div className="px-3">
                <h3>Home</h3>
                {/* POSTING INPUT FORM */}
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Create Post..."
                        aria-label="Create Post..."
                        style={{ height: '3rem' }}
                        value={post}
                        onChange={handlePostChange}
                        disabled={!session}
                    />
                    <Button
                        variant="outline-dark"
                        id="button-addon2"
                        onClick={handleSubmit}>
                        Post
                    </Button>
                </InputGroup>

                {posts ? posts.filter( item => {
                    return item.post.toLowerCase() === '' ? item.post : item.post.toLowerCase().includes(search.toLowerCase())
                }).map(post => (
                    <CardPost key={post.id} post={post} />
                )) : ''}
            </div>
        </Sidebar>
    );
}

export default Home;