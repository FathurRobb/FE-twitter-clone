import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, InputGroup } from "react-bootstrap";
import CardPost from '../Components/CardPost';
import Sidebar from '../Components/Sidebar';

const Home = () => {
    const [ search, setSearch ] = useState('')

    const bodyText =  ['apa kenapa mengapa waw', 'you\'ll never walk alone', 'Come on you spurs']
    return (
        <Sidebar setSearch={setSearch}>
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

                {bodyText.filter( item => {
                    return item.toLowerCase() === '' ? item : item.toLowerCase().includes(search)
                }).map(body => (
                    <CardPost body={body} />
                ))}
            </div>
        </Sidebar>
    );
}
 
export default Home;