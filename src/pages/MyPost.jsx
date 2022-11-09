import Sidebar from "../Components/Sidebar";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CardPostEdit from "../Components/CardPostEdit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getPosts } from "../redux/modules/posts";

const postUrl = 'http://localhost:3001/posts/'
const MyPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const session = JSON.parse(sessionStorage.getItem("data_user"))

    const { posts } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])

    const toHomePage = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const postFilter = posts.filter(post => post.user === session.id)

    return (
        <Sidebar>
            <Container style={{ cursor: 'pointer' }} className='px-0'>
                <div className="px-3">
                    <header className="d-flex align-items-center px-3">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
                        <h4 className="mx-4">My Post</h4>
                    </header>
                    <section>
                        {postFilter.map(post => (
                            // <CardPost key={post.id} post={post} />
                            <CardPostEdit key={post.id} post={post} />
                        ))}
                    </section>
                </div>
            </Container>
        </Sidebar>
    );
}

export default MyPost;