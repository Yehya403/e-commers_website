import React from 'react'
import './NotFound.module.css'
import img from '../../3b7f761786c6bc27db7fd82052179c446c7a0408.png'
import {Helmet} from "react-helmet";


export default function NotFound() {
  return (<>




    <Helmet>
      <meta charSet="utf-8" />
      <title>My Title</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className='text-center my-5 py-5' >
      <img className='w-50' src={img} alt="" />
    </div>

  </>

  )
}
