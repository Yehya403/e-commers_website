import React from 'react'
import './Login.module.css'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function Login({ saveUserData }) {


    const [isLoading, setisLoding] = useState(false);


    const [errorMessage, setErrorMessage] = useState(null);


    let navigate = useNavigate()


    async function login(values) {
        setisLoding(true);
        setErrorMessage(null)
        let data = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signin', values).catch((err) => {

            setisLoding(false);
            console.log(data);

            setErrorMessage(err.response.data.message)
        })

        if (data.data.message === 'success') {
            console.log(data.data.message);
            localStorage.setItem("userToken", data.data.token)

            navigate("/home")
            saveUserData()
            setisLoding(false);
        }

    }




    let mySchema = Yup.object({
        email: Yup.string().email("invalid email").required("required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password").required('required'),

    })




    let formik = useFormik({
        initialValues: {

            email: '',
            password: '',



        }, validationSchema: mySchema,
        onSubmit: (values) => login(values)

    })

    return (<>
    
    
    <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    
    
    <div>
        <div className="container mt-5 ">
            <h1>Login :</h1>


            {errorMessage ? <div className="alert alert-danger  "> {errorMessage} </div> : ""}

            <form onSubmit={formik.handleSubmit}>


                <label htmlFor="email">email</label>
                <input type="email" className='form-control mb-3 ' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ''}



                <label htmlFor="password">password</label>
                <input type="password" className='form-control mb-3 ' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''}




                {isLoading ? <button className='btn btn-success text-white'><i className='fa fa-spin fa-spinner'  > </i> </button> : <button className='btn btn-success text-white ' type='submit'  >Login</button>
                }


            </form>

        </div>


    </div></>


    )
}
