import React from 'react'
import './Footer.module.css'

export default function Footer() {
    return (
        <>

            <div className="bg-dark text-white d-none "  >


                <div className="container">

                    <div className="row">

                        <div className="col-md-6">

                            <h3 className='mt-4' >fotter</h3>
                            <h4>Name: <span className=' text-muted ' > Mahmoud sakr </span> </h4>
                            <h4>email: <span className=' text-muted ' >  <a href="">mahmoud23mostafa@gmail.com</a> </span> </h4>

                            <div className="d-flex mt-3 ">

                            <i className="fa-brands fa-facebook-f fa-2x pe-4 "></i>
                            <i className="fa-brands fa-twitter fa-2x  pe-4 "></i>
                            <i className="fa-brands fa-instagram fa-2x "></i>
                            </div>

                        </div>



                        <div className="col-md-6">
                            <h3 className='mt-4' >contact us</h3>
                            <label htmlFor=""> Email : </label>
                            <input className=' form-control  mt' type="email" />
                            <label htmlFor=""> Message</label>
                            <textarea  className='form-control mb-5 ' ></textarea>

                        </div>
                    </div>

                </div>



            </div>

        </>
    )
}
