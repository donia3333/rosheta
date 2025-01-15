import { jwtDecode } from "jwt-decode"; 
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let mediaContext = createContext(null);

export default function MediaContextProvider(props) {
    const [userData, setUserData] = useState(''); 
    const [Role,setRole]= useState('');
    let saveUserData = () => {
        let encodedToken = localStorage.getItem("token");
        if (encodedToken) {
           
            let decodedToken = jwtDecode(encodedToken);
            setUserData(decodedToken); 
            setRole(decodedToken.role);
            console.log(decodedToken); 
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveUserData(); 
        }
    }, []); 

    let LogOut = () => {
        localStorage.removeItem("token");
        setUserData('');

        return <Navigate to="/Login" />; 
    };

    // Provide context values
    return (
        <mediaContext.Provider value={{ saveUserData, userData,Role, LogOut }}>
            {props.children}
        </mediaContext.Provider>
    );
}
