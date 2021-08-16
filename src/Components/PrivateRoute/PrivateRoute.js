import React from 'react';
import { useAuthProvider } from '../../Context/AuthProvider';
import { Redirect, Route } from "react-router-dom";
function PrivateRoute({ component : Component, ...rest}) {
    const { currentUser } = useAuthProvider();
    return (
        <Route
            {...rest}
            render = { props => {
                return  currentUser ? <Component {...props} /> : <Redirect to="/login"/>
            }
        }>
        </Route>
    )
}

export default PrivateRoute
