import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config();

async function connectDB(){
    try {
        const con=await mongoose.connect(process.env.MONGO_URL,{
              useNewUrlParser: true,
             useUnifiedTopology: true,
        })
        console.log(
            chalk.bgGreenBright.black(`Connected to MongoDB ${con.connection.host}`)
          );
    } catch (error) {
        console.error(chalk.bgRed.whiteBright
            (`Error in db connection ${error}`))
    }
}

export default connectDB;