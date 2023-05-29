import React, { useContext, useEffect } from 'react'
import styel from './CheckOut.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext'


export default function CheckOut() {







    let { generateOnlinePayment, getAllCart } = useContext(CartContext)






    async function HandelPayment(values) {
        console.log(values);


        
        let res = await getAllCart()
        console.log();



        let { data } = await generateOnlinePayment(res.data.data._id, values)
        console.log(data);
        if (data.session) {

            window.location.href = data.session.url
        }
    }



    let mySchema = Yup.object({

        phone: Yup.string().required("reqired").matches(/^01[0125][0-9]{8}$/, "invalid phone number "),

    })



    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        }
        , validationSchema: mySchema,
        onSubmit: HandelPayment
    })
    return (
        <div className="container">
            <form className='w-75 mx-auto my-5 ' onSubmit={formik.handleSubmit}   >
                <label htmlFor="details">Details</label>
                <input type="text" name='details' id='details' onChange={formik.handleChange} className='form-control mb-3 ' value={formik.values.details} />




                <label htmlFor="phone">Phone</label>
                <input type="tel" name='phone' id='phone' onChange={formik.handleChange} className='form-control mb-3 ' value={formik.values.phone} onBlur={formik.handleBlur} />




                <label htmlFor="city">City</label>
                <input type="text" name='city' id='city' onChange={formik.handleChange} className='form-control mb-3 ' value={formik.values.city} />


                <button type='submit' className=' btn btn-outline-info w-100 mt-2 '  >Pay</button>

            </form>
        </div>
    )
}
