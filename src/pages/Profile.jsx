import Sidebar from "../Components/Sidebar";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CardPostEdit from "../Components/CardPostEdit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getPosts } from "../redux/modules/posts";
import CardPost from "../Components/CardPost";


const Profile = () => {
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const session = JSON.parse(sessionStorage.getItem("data_user"))

    // const { posts } = useSelector(state => state.posts)

    // useEffect(() => {
    //     dispatch(__getPosts());
    // }, [dispatch])

    // const toHomePage = (e) => {
    //     e.preventDefault()
    //     navigate('/')
    // }

    
    // const postFilter = posts.filter(post => post.userId === session.id)
    // // console.log(postFilter);
    
    return (
        <Sidebar>
            <section className="user-info">
                <section className="user-bio">
                    <h2>Nama User</h2>
                    <p className="username">username</p>
                    <p className="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, possimus.</p>
                </section>
                <button className="btn-tw btn-edit-profile">Edit Profile</button>
            </section>
            <section className="user-menu">
                <p>Tweets</p>
            </section>
            <section className="user-tweets">
                <CardPost />
            </section>
        </Sidebar>
        // <Sidebar>
        //     <Container style={{ cursor: 'pointer' }} className='px-0'>
        //         <div className="px-3">
        //             <header className="d-flex align-items-center px-3">
        //                 <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
        //                 <h4 className="mx-4">My Post</h4>
        //             </header>
        //             <section>
        //                 {postFilter.map(post => (
        //                     // <CardPost key={post.id} post={post} />
        //                     <CardPostEdit key={post.id} post={post} />
        //                 ))}
        //             </section>
        //         </div>
        //     </Container>
        // </Sidebar>
    );
}

export default Profile;