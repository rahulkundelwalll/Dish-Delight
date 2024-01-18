import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Connection/db.js';
import chalk from 'chalk';
import authRouter from './Routes/userRoute.js';
import recipeRouter from './Routes/recipeRoute.js';
import cors from "cors";
import morgan from 'morgan';
import cookieParser from 'cookie-parser'; 
import paymentRouter from './Routes/paymentRoute.js';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://dish-delight-r4g9.vercel.app/'], credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

dotenv.config();

connectDB();


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/auth', authRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/payment',paymentRouter)

app.listen(PORT, () => {
  console.log(chalk.bgBlue.black(`App is running successfully on port ${PORT}`));
});
