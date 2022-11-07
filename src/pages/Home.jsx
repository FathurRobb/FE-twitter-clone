import { Button } from 'react-bootstrap';
import { Form, InputGroup } from "react-bootstrap";
import CardPost from '../Components/CardPost';
import Sidebar from '../Components/Sidebar';

const Home = () => {
    return (
        <Sidebar>
            <div className="px-3"> 
                <h3>Home</h3>
                {/* POSTING INPUT FORM */}
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Reply Post..."
                        aria-label="Reply Post..."
                        style={{height: '3rem'}}
                    />
                    <Button variant="outline-dark" id="button-addon2">
                        Post
                    </Button>
                </InputGroup>

                {/* POSTING */}
                <CardPost />
                <CardPost />
                <CardPost />
            </div>
        </Sidebar>
    );
}
 
export default Home;