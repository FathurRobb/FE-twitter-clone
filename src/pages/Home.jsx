import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import { Container, Form, InputGroup, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import CardPost from '../Components/CardPost';
import Sidebar from '../Components/Sidebar';
import useInput from '../hooks/useInput';
import { createPost, getPosts } from '../redux/reducers/posts';
import ButtonAction from '../Components/ButtonAction';
import { useNavigate } from 'react-router-dom';
import PostsService from '../services/PostsService';


const Home = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch()
    // const { posts, isLoading } = useSelector(state => state.posts)
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
    

    const tweet = {
        content:post
    }

    const [gettweet, setTweet] = useState([]);
    const makePost = async () => { 
        console.log(tweet)
        PostsService.posts(tweet).then(response => {
            console.log(response)
            getAlldata()
            setPost('')
        }).catch(err => {
            console.log("error")
        });
    }

    const getAlldata = async () => {
        PostsService.getAll().then(res => {
            setTweet(res.data)
        }).catch(err => {
            console.log("error get data", err)
        });
    };

    useEffect(() => {
        getAlldata()
    },[])

    return (
        <React.Fragment>
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
                        style={{color:'black'}}
                        // disabled={!session}
                    />
                    <p className='ps-4'> {post.length} / 60</p>
                    <div><button className='btn-tw add-tweet' onClick={handleSubmit}>Tweet</button></div>
                </header>
                {gettweet?.map((item) => {
                    console.log(item)
                    return(
                        <CardPost key={item.postId} post={item}/>
                    )
                })}

            </Sidebar>    
            {
                session ?
                    <div></div>
                    :
                    <Navbar className='color-tw' variant="dark" fixed="bottom">
                        <Container>
                            <Navbar.Brand>
                                <span style={{fontWeight: '700', fontSize: '24px'}}>Don’t miss what’s happening</span><br/>
                                <span style={{fontSize: '16px'}}>People on Twitter are the first to know.</span> 
                            </Navbar.Brand>
                            <Nav className="justify-content-end" style={{ width: "100%" }}>
                                <button className="btn-login float-right" onClick={() => {
                                    navigate('/login')
                                }}>Log in</button>
                                <button className="btn-signup float-right" onClick={() => {
                                    navigate('/register')
                                }}>Sign up</button>
                            </Nav>
                        </Container>
                    </Navbar>
            }
        </React.Fragment>
        
    )
}

export default Home;