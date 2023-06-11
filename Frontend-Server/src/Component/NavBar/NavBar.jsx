import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import { CartContext } from '../../Context/CartContext';
import jwtDecode from 'jwt-decode'


export default function NavBar({ userdata, userData, LogOut }) {
    let { numOfCartItems } = useContext(CartContext);

    var decoded;
    if (localStorage.getItem("userToken")) {


      let encode = localStorage.getItem("userToken")

      decoded = jwtDecode(encode)
      console.log(decoded);

      console.log(decoded.name);

  }

    localStorage.setItem('userID', userData ? userData.id : '');

    return (
        <>
            <div className="container-fluid bg-dark">
                <div className="container">
                    <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to={'/home'}>
                                E-Trade
                            </Link>

                            <div className="collapse navbar-collapse e-0" id="navbarSupportedContent">
                                <ul className="navbar-nav w-100 me-auto mb-2 mb-lg-0">
                                    <div className="d-flex w-100 justify-content-between flex-row text-white">
                                        <div className="d-flex align-items-center">
                                            {userdata && (
                                                <ul className="navbar-nav">
                                                    <li className="nav-item">
                                                        <Link className="nav-link active" to={'/home'}>
                                                            Home
                                                        </Link>
                                                    </li>
                                                    
                                                    <li className="nav-item">
                                                        <Link className="nav-link active" to={'/product'}>
                                                            Profile
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link active" to={'/checkoutnew'}>
                                                            CheckOut
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>

                                        <div className="d-flex align-items-center">
                                            {userdata ? (
                                                <>
                                                    <li className="nav-item d-flex justify-content-center align-content-center">
                                                        <div className="d-flex align-content-between align-items-center">
                                                            <i className="fa-solid fa-hands-clapping px-2"></i>
                                                            <p style={{ margin: '0', color: 'gray' }}>HI {decoded.name}</p>
                                                            <span className="nav-link active cursor-pointer" onClick={LogOut}>
                                                                Logout
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li className="nav-item">
                                                     
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item">
                                                            <Link className="nav-link active" to={'/login'}>
                                                                Login
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link className="nav-link active" to={'/register'}>
                                                                Register
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
