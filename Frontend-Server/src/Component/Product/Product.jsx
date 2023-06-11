import React from 'react';
import { Helmet } from "react-helmet";

import jwtDecode from 'jwt-decode'
export default function Product({userData}) {
    console.log(userData)
    var decoded;
    if (localStorage.getItem("userToken")) {


      let encode = localStorage.getItem("userToken")

      decoded = jwtDecode(encode)
      console.log(decoded);

      console.log(decoded.name);

  }
  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
            </Helmet>
    <div className="profile w-50 py-4 my-4 m-auto text-center">
        <h2>Name :{decoded.name}</h2>
        <h2>Email :{decoded.email}</h2>
        <h2>Secret Code :{decoded.iat}</h2>
    </div>
    </>
    
  )
}
