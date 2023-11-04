import dotenv from 'dotenv' 

//set NODE_ENV to development by default 
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 

const envFound = dotenv.config(); 

if (envFound.error){
    throw new Error(" An error has occurred", env.Found.error) 
}

export default {
    port: process.env.PORT, 

    databaseURL : process.env.MONGODB_URL, 
    databaseUsername: process.env.USERNAME, 

    databasePassword: process.env.PASSWORD, 
    jwtSecret: process.env.JWT_SECRET, 
}   