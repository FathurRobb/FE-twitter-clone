import axios from 'axios';
import { useState } from 'react';
import {Form, Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ButtonAction from './ButtonAction';
import bcrypt from 'bcryptjs';
import useInput from '../hooks/useInput';
import AlertAction from './AlertAction';
import AuthService from '../services/AuthService';

let url;
process.env.NODE_ENV == 'development' ? 
    url = process.env.REACT_APP_DEV_API_URL
    :
    url = process.env.REACT_APP_API_URL

const FormRegister = () => {
    const navigate = useNavigate();
    const [name, handleChangeName] = useInput();
    const [username, handleChangeUsername] = useInput();
    const [email, handleChangeEmail] = useInput();
    const [password, handleChangePassword] = useInput();
    const [confirm, handleChangeconfirm] = useInput();
    
    const [error, setError] = useState({
        password: '',
        confirm: ''
    })

    const validatePassword = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: ""};
            switch (name) {
                case "password":
                    if (confirm && value !== confirm) {
                        stateObj["confirm"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirm"] = confirm ? "" : error.confirm;
                    } 
                    break;
                case "confirm":
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

    const dataUser = {
        name: name,
        username: username,
        email: email,
        password: password,
        confirm: confirm
    }

    const addUser = async () => {
        AuthService.register(dataUser)
            .then(response => {
                navigate('/login')
            })
            .catch(err => {
                setshowAlertEmail(true)
                console.log("ERROR",err)
            });
    }

    const handleSignin = event => {
        event.preventDefault();
        addUser();
    }

    return (
        <section className="register-form">
            <h2>Create Your Account</h2>
            {alertEmail}
            <form onSubmit={handleSignin}>
                <input type="text" name="username" placeholder='Username' id="" onChange={handleChangeUsername} required/>
                <input type="text" name="name" value={name} onChange={handleChangeName}  placeholder='Name' id="" required/>
                <input type="email" name="email" placeholder='Email' id="" onChange={handleChangeEmail} required/>
                <input type="password" name="password" value={password} onChange={handleChangePassword} onBlur={validatePassword} placeholder='password' id="" required/>
                <input type="password" name="confirm" value={confirm} onChange={handleChangeconfirm} onBlur={validatePassword} id="" placeholder='Confirm Password' required/>
                {error.confirm && <span className='err text-danger'>{error.confirm}</span>}
                {
                    error.confirm !== "" ?
                        <button className='btn-tw mt-2' disabled>Sign Up</button>
                        :
                        <button className='btn-tw mt-2'>Sign Up</button>
                }


                <p className="mt-3" style={{color:'white'}}>Already have account? <Link to={'/login'}>Login</Link></p>
            </form>
        </section>
    );
}
 
export default FormRegister;