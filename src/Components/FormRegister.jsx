import axios from 'axios';
import { useState } from 'react';
import {Form, Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ButtonAction from './ButtonAction';
import bcrypt from 'bcryptjs';
import useInput from '../hooks/useInput';

const rootUrl = `${process.env.REACT_APP_API_URL}users`

const FormRegister = () => {
    const navigate = useNavigate();
    const [name, handleChangeName] = useInput();
    const [email, handleChangeEmail] = useInput();
    const [password, handleChangePassword] = useInput();
    
    const salt = bcrypt.genSaltSync(10)
    const h = bcrypt.hash(password, salt);

    
    // const [showAlertEmail, setshowAlertEmail] = useState(false);
    // let alertEmail;
    // if (showAlertEmail) {
    //     alertEmail = <AlertAction variant={'danger'} message={'Email tidak terdaftar'} onClose={() => setshowAlertEmail(false)}/>
    // } 
    // const [showAlertPassword, setshowAlertPassword] = useState(false);
    // let alertPassword;
    // if (showAlertPassword) {
    //     alertPassword = <AlertAction variant={'danger'} message={'Password yang anda masukan salah'} onClose={() => setshowAlertPassword(false)}/>
    // } 
    // const getUsers = async () => {
    //     const checkEmail = await axios.get(`${rootUrl}?email=${form.email}`);
    //     if (checkEmail.data.length > 0) {
    //         const checkPassword = bcrypt.compareSync(form.password, checkEmail.data[0].password)
    //         if (checkPassword) {
    //             console.log("password benar");
    //             console.log(checkEmail.data[0]);
    //             sessionStorage.setItem('data_user', JSON.stringify(checkEmail.data[0]));
    //             navigate('/');
    //         } else {
    //             setshowAlertPassword(true)
    //         }
    //         setForm({ email: '', password: '' });
    //     } else {
    //         setshowAlertEmail(true);
    //         setForm({ email: '', password: '' });
    //     }
    // }
    const addUser = async () => {
        // await axios.post(rootUrl, {name,email,hashPassword});
        // console.log("berhasil");
        console.log(h)
    }
    const handleSignin = event => {
        event.preventDefault();
        addUser();
    }

    return (
        <Container className='w-50 mx-auto d-flex flex-column justify-content-center' style={{minHeight: '90vh'}}>
            <h1 className='text-center mb-3'>Register Your Account</h1>
            <Form onSubmit={handleSignin}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={name} onChange={handleChangeName} placeholder="Enter Your Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={handleChangeEmail} placeholder="Enter Email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={handleChangePassword} placeholder="Password" required />
                </Form.Group>
                
                <div className="d-grid gap-2">
                    <ButtonAction variant={'outline-dark'} text={'Sign In'}/>
                </div>
                
                <div className="mt-3" style={{textAlign: "center"}}>
                    <Form.Text>
                        Already have an account ? <Link to={'/login'} style={{textDecoration: 'none', color: "black"}}><b>Log In Here</b></Link>
                    </Form.Text>
                </div>
            </Form>
        </Container>
    );
}
 
export default FormRegister;