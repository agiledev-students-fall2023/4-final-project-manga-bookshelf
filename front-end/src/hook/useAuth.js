import React, {useState} from "react";

export function useAuth(){
    //user contains the JWT used to authenticate
    const [user, setUser] = useState(null); 
    const [errors, setErrors] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 

    async function signin(username, password){
        setErrors([]) 
        setIsLoading(true); 
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
            method: "POST", 
            headers:{
                "Content-Type": "application/json", 
            },
            body: JSON. stringify({username, password}),
        })
        const result = await response.json() 
        if (response.ok){
            setUser(result)
            localStorage.setItem('jwtToken', result.token);
            localStorage.setItem('user', JSON.stringify(result))
        }
        else{
            setErrors("Something went wrong") 
        }
    }

    async function signup(email, username, password) {
        setErrors("")
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        })
        const result = await response.json()
        if (response.ok) {
            setUser(result)
            localStorage.setItem('jwtToken', result.token);
            localStorage.setItem('user', JSON.stringify(result)) 
        }
        else {
            setErrors("Something went wrong")
        }
    }

    async function signout() {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`).then(response => {
            if (response.ok) {
                setUser(null) 
                localStorage.setItem('jwtToken', null);
                localStorage.setItem('user', null) 
            }
        })
    }

    //return all the stuff we need
    return {
        user,
        signin,
        signup,
        signout,
        errors,
        isLoading,
    }
}