import axios from 'axios';
import { useState } from 'react';
import {Form, Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ButtonAction from './ButtonAction';
import bcrypt from 'bcryptjs';
import useInput from '../hooks/useInput';
import AlertAction from './AlertAction';

const rootUrl = `${process.env.REACT_APP_API_URL}users`

const FormRegister = () => {
    const navigate = useNavigate();
    const [name, handleChangeName] = useInput();
    const [email, handleChangeEmail] = useInput();
    const [password, handleChangePassword] = useInput();
    const [confirmPassword, handleChangeConfirmPassword] = useInput();
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
    })

    const validatePassword = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: ""};
            switch (name) {
                case "password":
                    if (confirmPassword && value !== confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = confirmPassword ? "" : error.confirmPassword;
                    } 
                    break;
                case "confirmPassword":
                    if (password && value !== password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;
                default:
                    break;
            } 
            return stateObj;
        });
    };

    const [showAlertEmail, setshowAlertEmail] = useState(false);
    let alertEmail;
    if (showAlertEmail) {
        alertEmail = <AlertAction variant={'danger'} message={'Email already exist'} onClose={() => setshowAlertEmail(false)}/>
    } 

    const addUser = async () => {
        await axios.post(rootUrl, {
            name: name,
            email: email,
            password: hashPassword
        });
    }

    const checkUser = async () => {
        const checkEmail = await axios.get(`${rootUrl}?email=${email}`);
        if (checkEmail.data.length > 0) {
            setshowAlertEmail(true);
        } else {
            addUser();
            navigate('/login');
        }
    }

    const handleSignin = event => {
        event.preventDefault();
        checkUser();
    }

    return (
        <section className="register-form">
            <h2>Create Your Account</h2>
            {alertEmail}
            <form onSubmit={handleSignin}>
                <input type="text" name="username" placeholder='username' id="" />
                <input type="text" name="name" value={name} onChange={handleChangeName}  placeholder='Name' id="" />
                <input type="email" name="email" placeholder='Email' id="" />
                <input type="password" name="password" value={password} onChange={handleChangePassword} onBlur={validatePassword} placeholder='password' id="" />
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChangeConfirmPassword} onBlur={validatePassword} id="" placeholder='Confirm Password' />
                {error.confirmPassword && <span className='err text-danger'>{error.confirmPassword}</span>}
                <button className='btn-tw mt-2'>Sign Up</button>
                <p className="mt-3">Already have account? <Link to={'/login'}>Login</Link></p>
            </form>
            <div className="d-grid gap-2">
                {
                    error.confirmPassword !== "" ?
                        <ButtonAction variant={'outline-dark'} disabled={error} text={'Sign In'}/>
                    :
                        <ButtonAction variant={'outline-dark'} text={'Sign In'}/>
                }
            </div>
        </section>
        // <Container className='w-50 mx-auto d-flex flex-column justify-content-center' style={{minHeight: '90vh'}}>
        //     <h1 className='text-center mb-3'>Register Your Account</h1>
        //     <Form onSubmit={handleSignin}>
        //         <Form.Group className="mb-3">
        //             <Form.Label>Name</Form.Label>
        //             <Form.Control type="text" name="name" value={name} onChange={handleChangeName} placeholder="Enter Your Name" required />
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <Form.Control type="email" name="email" value={email} onChange={handleChangeEmail} placeholder="Enter Email" required />
        //             <Form.Text className="text-muted">
        //                 We'll never share your email with anyone else.
        //             </Form.Text>
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" name="password" value={password} onChange={handleChangePassword} placeholder="Password" required />
        //         </Form.Group>
                
        //         <div className="d-grid gap-2">
        //             <ButtonAction variant={'outline-dark'} text={'Sign In'}/>
        //         </div>
                
        //         <div className="mt-3" style={{textAlign: "center"}}>
        //             <Form.Text>
        //                 Already have an account ? <Link to={'/login'} style={{textDecoration: 'none', color: "black"}}><b>Log In Here</b></Link>
        //             </Form.Text>
        //         </div>
        //     </Form>
        // </Container>
    );
}
 
export default FormRegister;