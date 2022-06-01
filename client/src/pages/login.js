import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import  { useDispatch, useSelector }  from 'react-redux';

const Login = () => {
    const initialState = { email: '', password: '' };
    const [userData, setUserData] = useState(initialState);
    const [typePass, setTypePass] = useState(false);
    const { email, password } = userData;

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const history = useHistory();

    useEffect(() => {
      if(auth.token) history.push("/");
    }, [auth.token, history]);
   

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }
    
    const handleSubmit = e => {
      e.preventDefault();
      dispatch(login(userData));
    };
    return (
        <div className="auth-page">

        <form onSubmit={handleSubmit}>
          <h3 className="text-uppercase text-center mb-4">Social App</h3>
          <div className="mb-3">
  
            <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" 
            aria-describedby="emailHelp" name="email" onChange={handleChangeInput} value={email}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  
            <div className="pass">
            <input type={typePass ? "text" : "password"} className="form-control" 
            id="exampleInputPassword1" name="password"
            onChange={handleChangeInput} value={password}/> 
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Ẩn' : 'Hiện'}
            </small>
            </div>
           
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className ="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-dark w-100"
          disabled={email && password ? false : true}>
            Login
          </button>
  
          <p className="my-2">
            You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>
          </p>
        </form>
  
      </div>
    )
}

export default Login;
