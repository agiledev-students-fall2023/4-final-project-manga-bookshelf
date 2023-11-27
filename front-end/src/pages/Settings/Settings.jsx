import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";

function Settings() {
   const auth = useContext(AuthContext) 
   const navigate = useNavigate() 

    const handleLogout = (e) => {
        e.preventDefault() 
        auth.signout(); 
        navigate('/auth/login')
    }

    return (
    <button onClick={handleLogout}> logout </button>
  )
}

export default Settings