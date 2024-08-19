import {connectDb} from "./db/index.js"
import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: "./.env"
})

connectDb().then((item)=> {
    console.log(item)
    app.on("error", (error) => {
        console.log("Error Database is connected but express is not working", error);
        throw error
    })

    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`server is running on port: ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log("Database connection failled", error);
})