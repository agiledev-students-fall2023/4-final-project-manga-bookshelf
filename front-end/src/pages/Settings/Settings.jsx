import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from "react-router-dom";
import "./Settings.css"

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
      </div>
  )
}

export default Settings