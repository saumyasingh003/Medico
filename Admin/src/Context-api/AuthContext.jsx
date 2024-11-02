import React, {createContext, useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
       
         if(token){
            setIsAuthenticated(true)
            setUserRole(role)
         }
         setLoading(false)
    }, [])
    console.log("Is authentcated", isAuthenticated)

    
    return(
        <AuthContext.Provider value={{isAuthenticated, userRole, loading}}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext);
