import Sidebar from "../Components/Sidebar";
import { Container, Form, InputGroup} from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CardPost from "../Components/CardPost";

const DetailPost = () => {
    const navigate = useNavigate()

    const toHomePage = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <Sidebar>
            <Container style={{cursor: 'pointer'}} className='px-0'>
                <header className="d-flex align-items-center px-3">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
                    <h4 className="mx-4">Post</h4>                    
                </header>
                <section className="my-4 border-bottom border-dark pb-3 px-3">
                    <p className="border-bottom border-dark pb-3 px-3">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Reply Post..."
                            aria-label="Reply Post..."
                            style={{border: 'none'}}
                        />
                        <Button variant="outline-dark" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                </section>
                <section className="px-3">
                    <CardPost />
                    <CardPost />
                    <CardPost />
                </section>
            </Container>
        </Sidebar>
    );
}
 
export default DetailPost;