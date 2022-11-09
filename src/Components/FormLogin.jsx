import axios from "axios";
import { useState } from "react";
import ButtonAction from "./ButtonAction";
import AlertAction from "./AlertAction";
import bcrypt from "bcryptjs"
import { useNavigate } from "react-router-dom";

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
        alertEmail = <AlertAction variant={'danger'} message={'Email tidak terdaftar'} onClose={() => setshowAlertEmail(false)}/>
    } 
    const [showAlertPassword, setshowAlertPassword] = useState(false);
    let alertPassword;
    if (showAlertPassword) {
        alertPassword = <AlertAction variant={'danger'} message={'Password yang anda masukan salah'} onClose={() => setshowAlertPassword(false)}/>
    } 
    const getUsers = async () => {
        const checkEmail = await axios.get(`${rootUrl}?email=${form.email}`);
        if (checkEmail.data.length > 0) {
            const checkPassword = bcrypt.compareSync(form.password, checkEmail.data[0].password)
            if (checkPassword) {
                console.log("password benar");
                console.log(checkEmail.data[0]);
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
        <div>
            <h1>Login Page</h1>
            {alertEmail}
            {alertPassword}
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="email" value={form.email} onChange={handleChange} required/>
                <input type="password" name="password" placeholder="password" value={form.password} onChange={handleChange} required/>
                <ButtonAction variant={'outline-dark'} text={'Login'}/>
            </form>
        </div>
    )
}

export default FormLogin;