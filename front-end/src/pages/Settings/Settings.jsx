import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from "react-router-dom";

function Settings() {
   const auth = useContext(AuthContext) 
   const navigate = useNavigate() 

    const handleLogout = (e) => {
        e.preventDefault() 
        localStorage.setItem('jwtToken', null);
        localStorage.setItem('user', null) 
        auth.signout(); 
        navigate('/')
    }

    return (
      <div className="Settings-main">
        <button onClick={handleLogout}> logout </button>

        Change Color Template: <select>sef</select>
      </div>
  )
}

export default Settings