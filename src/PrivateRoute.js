import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from './components/App/App';

const PrivateRoute= (()=>{
    const contexte = useContext(AppContext);
    if(contexte.estLog){
        return <Outlet />
    }else{
        return <Navigate to="/" />;
    }

})

export default PrivateRoute;