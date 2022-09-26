import * as React from 'react';
import {useNavigate, Route, Redirect } from "react-router-dom";


export const LogoutToken = ( {component :Component ,...rast}) => {
    const isAut = localStorage.getItem('token')
    const Navigate= useNavigate()
    return (
    <Route  {...rast}
        render={(props) => {
            return isAut ? <Component {...props} /> : <Navigate to="/Login"/>
        }
        }
    />






    );
};