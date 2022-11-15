import { useEffect } from 'react';
import { useState } from 'react';
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import CardPost from '../Components/CardPost';
import Sidebar from '../Components/Sidebar';
import useInput from '../hooks/useInput';
import { createPost, getPosts } from '../redux/modules/posts';
import ButtonAction from '../Components/ButtonAction';


const Home = () => {
    const dispatch = useDispatch()
    const { posts, isLoading } = useSelector(state => state.posts)
    const [post, handlePostChange, setPost] = useInput();
    const [search, setSearch] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        if (!post) {
            return;
        }
        makePost();
    }

    const session = JSON.parse(sessionStorage.getItem("data_user"))

    const makePost = async () => {
        dispatch(createPost({ post, userId: session.id, name: session.name, username: session.username }))
        setPost('')
    }

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <Sidebar setSearch={setSearch}>
            <header>
                <h3 className='ps-4'>Home</h3>
                <input
                    type="text"
                    name="tweet"
                    id="tweet"
                    placeholder="What's happening?"
                    className='new-tweet'
                    maxLength={60}
                    value={post}
                    onChange={handlePostChange}
                    disabled={!session}
                />
                <p className='ps-4'> {post.length} / 60</p>
                <div><button className='btn-tw add-tweet' onClick={handleSubmit}>Tweet</button></div>
            </header>
            {!isLoading ? posts.filter(item => {
                return item.post.toLowerCase() === '' ? item.post : item.post.toLowerCase().includes(search.toLowerCase())
            }).map(post => (
                <CardPost key={post.id} post={post} />
            )) : <div>Loading....</div>}
        </Sidebar>
    )
}

export default Home;