import React, {useState} from "react";

const BACKEND_URL_DEV = "http://localhost:8080"

export function useAuth(){
    //user contains the JWT used to authenticate
    const [user, setUser] = useState(null); 
    const [errors, setErrors] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 

    async function signin(username, password){
        setErrors([]) 
        setIsLoading(true); 
        const response = await fetch(`${BACKEND_URL_DEV}/auth/login`, {
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
        const response = await fetch(`${BACKEND_URL_DEV}/auth/signup`, {
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
        await fetch(`${BACKEND_URL_DEV}/auth/logout`).then(response => {
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
