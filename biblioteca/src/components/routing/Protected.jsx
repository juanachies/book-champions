import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import {AuthenticationContext} from '../services/auth/auth.context'
import {isTokenValid} from '../auth/auth.helpers'

const Protected = ({isSignedIn}) => {
    const {token} = useContext(AuthenticationContext)

    if (!isTokenValid(token)) {
        return <Navigate to='/login' replace />
    }

    return <Outlet/>;
};

export default Protected;