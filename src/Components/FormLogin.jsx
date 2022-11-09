import axios from "axios";
import { useState } from "react";
import ButtonAction from "./ButtonAction";
import AlertAction from "./AlertAction";
import bcrypt from "bcryptjs"
import { Link, useNavigate } from "react-router-dom";
import {Form, Container} from 'react-bootstrap';

const rootUrl = 'http://localhost:3001/users'

const FormLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const [showAlertEmail, setshowAlertEmail] = useState(false);
    let alertEmail;
    if (showAlertEmail) {
        alertEmail = <AlertAction variant={'danger'} message={'Email Not Found'} onClose={() => setshowAlertEmail(false)}/>
    } 
    const [showAlertPassword, setshowAlertPassword] = useState(false);
    let alertPassword;
    if (showAlertPassword) {
        alertPassword = <AlertAction variant={'danger'} message={'Wrong Password'} onClose={() => setshowAlertPassword(false)}/>
    } 
    const getUsers = async () => {
        const checkEmail = await axios.get(`${rootUrl}?email=${form.email}`);
        if (checkEmail.data.length > 0) {
            const checkPassword = bcrypt.compareSync(form.password, checkEmail.data[0].password)
            if (checkPassword) {
                sessionStorage.setItem('data_user', JSON.stringify(checkEmail.data[0]));
                navigate('/');
            } else {
                setshowAlertPassword(true)
            }
            setForm({ email: '', password: '' });
        } else {
            setshowAlertEmail(true);
            setForm({ email: '', password: '' });
        }
    }
    const handleLogin = event => {
        event.preventDefault();
        getUsers();
    }
    
    return (
        <Container className='w-50 mx-auto d-flex flex-column justify-content-center' style={{minHeight: '90vh'}}>
            <h1 className='text-center mb-3'>Login Page</h1>
            {alertEmail}
            {alertPassword}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="email" value={form.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required />
                </Form.Group>
                <div className="d-grid gap-2">
                    <ButtonAction variant={'outline-dark'} text={'Log In'}/>
                </div>
                <div className="mt-3" style={{textAlign: "center"}}>
                    <Form.Text>
                        Don't have an account ? <Link to={'/register'} style={{textDecoration: 'none', color: "black"}}><b>Sign In Here</b></Link>
                    </Form.Text>
                </div>
            </Form>

        {/*      <form onSubmit={handleLogin}>
                <h1 className='text-center'>Login Page</h1>
         {alertEmail}
         {alertPassword}
                 <input type="text" name="email" placeholder="email" value={form.email} onChange={handleChange} required/>
                 <input type="password" name="password" placeholder="password" value={form.password} onChange={handleChange} required/>
                 <ButtonAction variant={'outline-dark'} text={'Login'}/>
             </form>  */}
        </Container>
    )
}

export default FormLogin;