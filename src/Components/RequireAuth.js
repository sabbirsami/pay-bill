import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
    // let location = useLocation();
    // const [user, loading, error] = useAuthState(auth);

    // if (loading) {
    //     return <Loading></Loading>;
    // }
    // if (!user) {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }
    // if (error) {
    //     console.log(error);
    // }
    return children;
};

export default RequireAuth;
