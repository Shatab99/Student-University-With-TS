/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from "mongoose"
import app from "./app"
import config from "./app/config"
import { Server } from "http"

let server : Server;

async function main() {
    try{
        await mongoose.connect(config.database_url as string)
        server = app.listen(config.port, () => {
            console.log(`Student app listening at http://localhost:${config.port}`)
        })
    }
    catch(err){
        console.log(err)
    }
}

main()

process.on('unhandledRejection', ()=>{
    console.log("unhandledRejection detected , server is sutting down !!")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on('uncaughtException', ()=>{
    console.log("uncaughtException detected , server is sutting down")
    process.exit(1)
})

