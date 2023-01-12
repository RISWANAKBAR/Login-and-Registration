import React from 'react'
import './login.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBInput, MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [logindata, setlogindata] = useState({})
  const [formerrors, setformerrors] = useState({})
  const [IsSubmit, setIsSubmit] = useState(false)
  const [temp, settemp] = useState(false)


  const loginvalidate = (value) => {
    const errors = {};
    console.log(value);

    var emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!value.email) {
      errors.email = "*email is required"
      console.log("value");

    }
    else if (!emailformat.test(value.email)) {
      errors.email = "*please enter email in a valid format"

    }
    if (!value.password) {
      errors.password = "*please enter the password"
    }
    return errors;
  }




  const loginprofiledata = (e) => {
    console.log("name===>", e.target.name);
    console.log("value===>", e.target.value);
    const name = e.target.name
    const value = e.target.value
    setlogindata({
      ...logindata,
      [name]: value
    })
    console.log("logindata===>", logindata)

  }
  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && IsSubmit) {
      axios.post('http://localhost:5000/api/loginprofile', logindata)
        .then(resp => {
          console.log(resp)
          toast(resp.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          if (resp.data.success == true) {
            setformerrors({})
            setIsSubmit(false)
            setlogindata({})

            localStorage.setItem('token', resp.data.token);



          }




        })
        .catch(err => {
          setformerrors({})
          setIsSubmit(false)
          setlogindata({})
          console.log(err.response.data.message)
          toast(err.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
    }


  }, [temp])


  const profilelogin = () => {
    console.log("gfdfdddddddddd");
    settemp(!temp)
    setformerrors(loginvalidate(logindata))
    setIsSubmit(true)


  }

  return (
    <div className='model1'>
      <div className='Adds'>
        <div className='addscontent1'>



        </div>



      </div>
      <div className='login-form'>

        <div className='login-form-sub'>
          <h5> Welcome </h5>
          <p>Welcome Back enter your credential to login</p>
          <MDBInput label='Username(mail)' id='typemail' type='email' name='email' value={logindata?.email || ""} onChange={loginprofiledata} />
          <span className='span'>{formerrors?.email}</span><br />
          <MDBInput label='Password ' id='typePassword' type='password' name='password' value={logindata?.password || ""} onChange={loginprofiledata} />
          <span className='span'>{formerrors?.password}</span><br />
          <MDBBtn color='info' onClick={profilelogin}>
            Login
          </MDBBtn><br /><br />
          <div className="d-flex justify-content-center">

            <a href="!#">Forgot password?</a>
          </div>
          <div className="text-center">
            <p>Not a member? <a href="registration">Register</a></p>
            <p>or sign up with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm" />
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm" />
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm" />
              </MDBBtn>



            </div>
          </div>
        </div>



      </div>
      <ToastContainer />

    </div>



  )
}
