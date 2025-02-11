import React, { Fragment,useRef } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { LoginUser } from '../../APIRequest/APIRequest';

const Login = () => {

    const navigate = useNavigate();


    const email = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        console.log(emailValue, passwordValue);

        LoginUser(emailValue, passwordValue)
        .then((res) => {
            console.log(res.message);
            if (res.message === 'Login successful') {
                navigate('/');
                window.location.reload();
            }

        }).catch((err) => {
            console.log(err);
        }
    );
    }
   
    return (
        <Fragment>
            <div className='mt-6 container'>
                <div className='row justify-content-center'>
                    <div className='col-md-7 col-lg-6 center-screen'>
                        <div className='card w-90 p-4'>
                            <div className='card-body'>
                                <h5>Sign In</h5>
                                <br/>
                                <input ref={email}  placeholder='User Email' className='form-control animated fadeInUp' type='email'/>
                                <input ref={password}  placeholder='User Password' className='form-control animated fadeInUp' type='password'/>
                                <br />
                                <button onClick={handleSubmit} className='btn w-100 animated fadeInUp float-end btn-primary'>Next</button>
                                <div className='text-center w-100'>
                                    <Link className='text-center animated fadeInUp' to='/signup'>Sign Up</Link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;