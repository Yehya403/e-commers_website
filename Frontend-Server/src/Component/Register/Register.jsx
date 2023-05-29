import React, { useState } from 'react'
import './Register.module.css'
import { Formik, useFormik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function Register() {
    const [isLoading, setisLoding] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
 


    let navigate = useNavigate()


    async function register(values) {
        setisLoding(true);
        setErrorMessage(null)
        let data = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signup', values).catch((err) => {

            setisLoding(false);

            setErrorMessage(err.response.data.message)
        })
        console.log(data);
        console.log(values.id);
        console.log(data.data.message);
        if (data.data.message == 'success') {
            setisLoding(false)
            navigate("/login")
        }
    }




    let mySchema = Yup.object({
        name: Yup.string().required("name is required").min(3, 'min char is 3 ').max(15, 'max char is 15'),
        email: Yup.string().email("invalid email").required("required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password").required('required'),
        rePassword: Yup.string().required('required').oneOf([Yup.ref("password")], " must be match "),
        phone: Yup.string().required("reqired").matches(/^01[0125][0-9]{8}$/, "invalid phone number "),

    })




    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',


        }, validationSchema: mySchema,
        onSubmit: (values) => register(values)

    })

    return (
        <>


            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>

            <div className="container mt-5 ">
                <h1>Register Now :</h1>


                {errorMessage ? <div className="alert alert-danger  "> {errorMessage} </div> : ""}

                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control mb-3 ' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ''}


                    <label htmlFor="email">email</label>
                    <input type="email" className='form-control mb-3 ' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ''}


                    <label htmlFor="phone">phone</label>
                    <input type="tel" className='form-control mb-3 ' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ''}


                    <label htmlFor="password">password</label>
                    <input type="password" className='form-control mb-3 ' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''}


                    <label htmlFor="rePassword">rePassword</label>
                    <input type="password" className='form-control mb-3 ' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ''}



                    {isLoading ? <button className='btn btn-success text-white'><i className='fa fa-spin fa-spinner'  > </i> </button> : <button className='btn btn-success text-white ' type='submit'  >Register</button>
                    }


                </form>

            </div>


        </>
    )
}
