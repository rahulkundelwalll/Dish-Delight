import express from 'express';
import { login, signup,logout} from '../Controllers/Auth.js';
import {getUser} from '../Controllers/profile.js';
import auth from '../Middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.post('/logout', logout);

authRouter.get("/profile/:id",auth,getUser)
export default authRouter;

