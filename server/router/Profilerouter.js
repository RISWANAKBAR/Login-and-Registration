const express = require('express')
const router = express.Router()
const Profiledata = require('../model/Profiledata')
const bcrypt = require('bcryptjs')





router.post('/addprofiledata', (req, res) => {
    console.log("req", req.body);
    bcrypt.hash(req.body.password, 10, (err, pass) => {
        console.log("pass", pass);
        if (err) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "password error"
            })
        }



        var profiledatas = {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            password: pass,
        }

        var detail = Profiledata(profiledatas)
        Profiledata.findOne({ email: req.body.email })
            .then(data => {
                if (data) {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: "email already exist"
                    })
                }
                else {
                    detail.save().then(() => {
                        res.status(200).json({
                            success: true,
                            error: false,
                            message: 'Profile Added'
                        })
                    })


                }

            })
    })







})

router.post('/loginprofile', (req, res) => {
    var logindetails = {
        email: req.body.email,
        password: req.body.password
    }
    console.log("login========", logindetails)
    Profiledata.findOne({ email: req.body.email })
        .then(data => {
            if (!data) {


                return res.status(200).json({
                    success: false,
                    error: true,
                    message: "Email not found",

                })
            }
            else {
                bcrypt.compare(logindetails.password, data.password, (err, result) => {
                    console.log(result);
                    if (err) {
                        console.log("rr", err);
                    }
                    else {
                        if (result == true) {


                            return res.status(200).json({
                                success: true,
                                error: false,
                                message: "Login Success"
                            })


                        }


                        else {

                            return res.status(400).json({
                                error: true,
                                message: "password error",
                                success: false,
                            })

                        }

                    }


                })



            }
        })

})




module.exports = router