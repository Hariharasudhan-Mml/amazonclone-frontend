import "./Signup.css";
import { ArrowRight } from '@material-ui/icons'
import { LoginSubComponent } from "../Login/Login";
import { useState } from "react";
import Axios from 'axios';


const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const sendData = async (event) => {
        event.preventDefault();
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
            alert('Details cannot be empty')
        }
     await Axios.post(`http://amazon-clone-by-hari.herokuapp.com/signup`, {
            firstname,
            lastname,
            email,
            password
        }).then(response=>alert(response.data.msg)).catch(e=>alert(e))
        ;
       
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }
    return <> <div className="signup">
        <img className="login__logo" src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt="Amazon logo" />
        <div className="loginInput__container"> {/* prefixed with login classname  use login styles*/}
            <h1>Create account</h1>
            <form className="signup__form" onSubmit={sendData} method="post" >

                <div className="inputsection">
                    <label>First Name </label>
                    <input type="text" name="firstname" required value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="inputsection">
                    <label>Last Name </label>
                    <input type="text" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                </div>
                <div className="inputsection">
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="inputsection">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button className="signup__createbtn" type="submit">Continue</button>
            </form>

            <hr />
            <p className="signin__redirectLink"> Already have an account ? <a href="/login"> Signin </a> <ArrowRight />  </p>
        </div>
    </div>
        <LoginSubComponent />
    </>
}


export default Signup;