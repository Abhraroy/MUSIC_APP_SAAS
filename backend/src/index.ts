import { DB_connect } from "./DB/DB_Connection.js"
import app from "./server.js"

const Port = process.env.PORT


//Starting the backend server

DB_connect().then(()=>{
    console.log("PORT:", Port);
    try {
        app.listen(Port,()=>{
            console.log(`Your server is running on ${Port}`);
            
        })
    } catch (error) {
        console.log(error);
        throw new Error("The server could not be started")
    }
})