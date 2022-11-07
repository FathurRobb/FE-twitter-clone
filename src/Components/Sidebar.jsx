import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Form} from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = ({ children }) => {
    return (
        <Container fluid className='mx-auto'>
            <Row style={{minHeight: '100vh'}}>
                <Col md={2} className='border-end border-dark d-flex flex-column pt-3'>
                    <Link style={{textDecoration: 'none', color: 'black'}}>
                        <FontAwesomeIcon icon={faRocket} className="mx-3" />
                        Explore
                    </Link>
                    <Link className="my-3" to='/my-post' style={{textDecoration: 'none', color: 'black'}}>
                        <FontAwesomeIcon icon={faUser} className="mx-3" />
                        My Post
                    </Link>
                </Col>
                <Col className='pt-3 px-0'>
                    {children}
                </Col>
                <Col md={3} className='border-start border-dark text-center pt-3'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="Search..." />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
 
export default Sidebar;