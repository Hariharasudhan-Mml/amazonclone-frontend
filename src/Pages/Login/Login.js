import "./Login.css";
import { ArrowRight } from '@material-ui/icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';



const Login = () => {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const sendData = async (e) => {
        e.preventDefault()
        if (!password.trim()) {
            alert('details cannot be empty')
        }
        const response = await Axios.post('https://amazon-clone-by-hari.herokuapp.com/login', { email, password });
        if (response.data.msg) {
            alert(response.data.msg);
            localStorage.setItem("token", response.data.token);
            navigate('/')
        }
        else {
            alert(response.data.err)
        }

        setEmail('');
        setPassword('')

    }
    return <> <div className="login">
        <img className="login__logo" alt="Amazon logo" src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" />
        <div className="loginInput__container">
            <h1>Sign-In</h1>
            <form method="post" className="login__form" onSubmit={sendData}>
                <div className="inputsection">
                    <label>Enter Email </label>
                    <input type="email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="inputsection">
                    <label>Enter Password </label>
                    <input type="password" required name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" >Continue</button>
            </form>
            <p>By continuing ,you agree to Amazon's <a href="#">Conditions of use</a> and <a href="#">Privacy Notice</a></p>
            <p className="login__help"><ArrowRight /><a href="#">Need Help?</a></p>
        </div>
        <div className="login__divider">
            <p>New to Amazon?</p>
        </div>
        <div className="login__createbtn">
            <button onClick={() => navigate('/signup')}>Create your Amazon account</button>
        </div>

    </div>
        <LoginSubComponent />

    </>
}


export default Login;

export const LoginSubComponent = () => {
    return <div className="login__footer">
        <p className="first__row"><a href="#">Conditions of use </a><a href="#">Privacy Notice</a><a href="#">Help</a></p>
        <p className="second__row">&copy; 1996-2022, Amazon.com, Inc. or its affiliates</p>
    </div>
}