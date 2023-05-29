import React from 'react'
import './protectedRoutes.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes(props) { 

if (localStorage.getItem("userToken")) {
    return props.children
} else {
    return < Navigate to="/login" />

}
}
