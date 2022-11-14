import { faBell, faBookmark, faEnvelope, faRectangleList, faUser } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faHashtag, faHome, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LogoTW from '../assets/twitter-logo-dark.png'


const Sidebar = ({ children, setSearch }) => {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const navigate = useNavigate();

    const session = JSON.parse(sessionStorage.getItem("data_user"))

    const logout = () => {
        sessionStorage.clear()
        this.shouldComponentUpdate()
    }

    return (
        <div className="sidebar-container">
            <aside className="left-sidebar">
                <div className="sticky left-side">
                    <div>
                        <section className="logo">
                            <img src={LogoTW} alt="twitter logo" />
                        </section>
                        {
                            session ?
                            <section className="menu">
                                <ul>
                                    <li><Link to='/'>
                                        <FontAwesomeIcon icon={faHome} />
                                        <span>Home</span>
                                    </Link></li>
                                    <li><Link to='#'>
                                        <FontAwesomeIcon icon={faHashtag} />
                                        <span>Explore</span>
                                    </Link></li>
                                    <li><Link to='#'>
                                        <FontAwesomeIcon icon={faBell} />
                                        <span>Notifications</span>
                                    </Link></li>
                                    <li><Link to='#'>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <span>Messages</span>
                                    </Link></li>
                                    <li><Link to='#'>
                                        <FontAwesomeIcon icon={faBookmark} />
                                        <span>Bookmarks</span>
                                    </Link></li>
                                    <li><Link to='#'>
                                        <FontAwesomeIcon icon={faRectangleList} />
                                        <span>Lists</span>
                                    </Link></li>
                                    <li><Link to='/profile'>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span>Profile</span>
                                    </Link></li>
                                    <li>
                                        <FontAwesomeIcon icon={faEllipsis} />
                                        <span>More</span>
                                    </li>
                                </ul>
                                <button className="btn-tw btn-sidebar">Tweet</button>
                            </section> :
                            <section className="menu">
                            <ul>
                                <li><Link to='/'>
                                    <FontAwesomeIcon icon={faHome} />
                                    <span>Home</span>
                                </Link></li>
                                <li><Link to='#'>
                                    <FontAwesomeIcon icon={faHashtag} />
                                    <span>Explore</span>
                                </Link></li>
                            </ul>
                            <button className="btn-tw btn-sidebar logout"><Link className="logout" to={'/login'}>Login</Link></button>
                        </section>
                        }
                    </div>
                    {
                        session ?
                        <div>
                            <section className="user-cta" ref={target} onClick={() => setShow(!show)}>
                                <div className="user-name">
                                    {
                                        session ?
                                            <h3>{session.name}</h3>
                                            :
                                            <h3>Nama User</h3>
                                    }
                                    <p className="username uname-cta">@username</p>
                                </div>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </section>
                            <Overlay className='overlay-popup' target={target.current} show={show} placement="top">
                                {(props) => (
                                    <Tooltip className='tooltip-popup' id="overlay-example" {...props}>
                                        <button><Link onClick={logout} to={'/'} className="logout"> Logout <span>@username</span></Link></button>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </div> :
                        ''

                    }
                </div>
            </aside>
            <section className="main-content">{children}</section>
            <aside className="right-sidebar">
                <div className="sticky">
                    <div className="search-container">
                        <form>
                            <input type="text" name="search" id="search" placeholder="Search Twitter" onChange={(e) => setSearch(e.target.value)} />
                        </form>
                    </div>
                    <div className="trending">
                        <h3>Trends For You</h3>
                        <div className="trending-item">
                            <div className="trending-topics">
                                <p>Meyden</p>
                                <p className="total-tweets">15.3k Tweets</p>
                            </div>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        <div className="trending-item">
                            <div className="trending-topics">
                                <p>#DiskonKilatGrabFood</p>
                                <p className="total-tweets">15.3k</p>
                            </div>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        <div className="trending-item">
                            <div className="trending-topics">
                                <p>Himawari</p>
                                <p className="total-tweets">15.3k</p>
                            </div>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        <div className="trending-item">
                            <div className="trending-topics">
                                <p>Perisic</p>
                                <p className="total-tweets">15.3k</p>
                            </div>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        <div className="trending-item">
                            <div className="trending-topics">
                                <p>#TibaTibaTenis</p>
                                <p className="total-tweets">15.3k</p>
                            </div>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
        // <Container fluid className='mx-auto text-light'>
        //     <Row style={{ minHeight: '100vh' }}>
        //         <Col md={2} className='border-end border-light d-flex flex-column pt-3 bg-dark'>
        //             <Link style={{ textDecoration: 'none', color: 'black' }} className='text-light' to='/'>
        //                 <FontAwesomeIcon icon={faHome} className="mx-3" />
        //                 Home
        //             </Link>
        //             {
        //                 session ?
        //                     <Link className="my-3 text-light" to='/my-post' style={{ textDecoration: 'none', color: 'black' }}>
        //                         <FontAwesomeIcon icon={faUser} className="mx-3" />
        //                         Profile
        //                     </Link> 
        //                     :
        //                     null
        //             }
        //             {
        //                 session ?
        //                     <Link className="my-3 text-light" onClick={logout} to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
        //                         <FontAwesomeIcon icon={faRightFromBracket} className="mx-3" />
        //                         Logout
        //                     </Link>
        //                     :
        //                     <Link className="my-3" to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>
        //                         <FontAwesomeIcon icon={faRightFromBracket} className="mx-3" />
        //                         login
        //                     </Link>
        //             }

        //         </Col>
        //         <Col className='pt-3 px-0 bg-dark text-light'>
        //             {children}
        //         </Col>
        //         <Col md={3} className='border-start border-light text-center pt-3 bg-dark text-light'>
        //             <Form>
        //                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        //                     <Form.Control type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        //                 </Form.Group>
        //             </Form>
        //         </Col>
        //     </Row>
        // </Container>
    );
}

export default Sidebar;