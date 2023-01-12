import React, { useEffect } from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './registration.css'
import {
  MDBInput, MDBBtn,
  MDBIcon,
  MDBTextArea
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Registration() {

  const [collectprofiledata, setcollectprofiledata] = useState({})

  const [formerror, setformerror] = useState({})
  const [isSubmit, setisSubmit] = useState(false)
  const [temp, settemp] = useState(false)

  const validate = (value) => {
    const errors = {};
    var pohoneformat = /^\d{10}$/;
    var emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.name) {
      errors.name = "*name is required"
    }
    if (!value.email) {
      errors.email = "*email is required"
    }
    else if (!emailformat.test(value.email)) {
      errors.email = "*please enter email in a valid format"

    }
    if (!value.address) {
      errors.address = "*please enter your permanent address"
    }

    if (!value.password) {
      errors.password = "*please enter the password"
    }


    if (!value.phone_number) {
      errors.phone_number = "*phone number is required"
    }
    else if (!pohoneformat.test(value.phone_number)) {
      errors.phone_number = "*please enter a valid phone_number"
    }
    return errors;

  }



  const collectprofile = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setcollectprofiledata({
      ...collectprofiledata,
      [name]: value
    })

    console.log("profiledataaaa===>", collectprofiledata)
  }

  useEffect(() => {
    console.log(Object.keys(formerror).length, isSubmit);
    if (Object.keys(formerror).length === 0 && isSubmit) {

      console.log("profiledataaaa===>", collectprofiledata)
      axios.post('http://localhost:5000/api/addprofiledata', collectprofiledata)
        .then(resp => {
          console.log("resp", resp)


          if (resp.data.success == true) {
            setformerror({})
            setisSubmit(false)
            setcollectprofiledata({})
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
            // window.location.reload()


          }

        })
        .catch(err => {
          setformerror({})
          setisSubmit(false)
          setcollectprofiledata({})
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


  const saveprofile = (e) => {
    settemp(!temp)
    e.preventDefault()
    console.log(isSubmit);
    setformerror(validate(collectprofiledata))
    setisSubmit(true)
  }




  return (
    <div className='model2'>
      <div className='Adds1'>
        <div className='addscontent'>
        </div>
      </div>
      <div className='reg-form'>

        <div className='reg-form-sub'>
          <h5> Register </h5>
          <p> enter your credential to create a account</p>
          <MDBInput label='Name' id='typeText' type='text' name='name' value={collectprofiledata.name || ""} onChange={collectprofile} />
          <span className='span'>{formerror?.name}</span><br /><br />
          <MDBInput label='Email ' id='typeEmail' type='email' name='email' value={collectprofiledata.email || ""} onChange={collectprofile} />
          <span className='span'>{formerror?.email}</span><br /><br />
          <MDBInput label=' Phone Number ' id='typeNumber' type='number' name='phone_number' value={collectprofiledata.phone_number || ""} onChange={collectprofile} />
          <span className='span'>{formerror?.phone_number}</span><br /><br />
          <MDBTextArea label='Address' id='textAreaExample' rows={4} name='address' value={collectprofiledata.address || ""} onChange={collectprofile} />
          <span className='span'> {formerror?.address}</span><br /><br /><br />
          <MDBInput label='Password' id='typePassword' type='password' name='password' value={collectprofiledata.password || ""} onChange={collectprofile} />
          <span className='span'> {formerror?.password}</span><br />


          <MDBBtn color='info' onClick={saveprofile}>
            Register
          </MDBBtn><br /><br />

          <div className="text-center">
            <p>already have a account!! <a href="/">Login</a></p>



          </div>
        </div>



      </div>

      <ToastContainer />

    </div>
  )
}
