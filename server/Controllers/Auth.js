import bcrypt from 'bcrypt';
import User from '../Models/userSchema.js';
import jwt from 'jsonwebtoken';
import vercel from '@vercel/node';
const { VercelRequest, VercelResponse } = vercel;

async function signup(req=VercelRequest, res=VercelResponse) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Hashing password failed',
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Signup failed. Please try again',
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all the details',
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User is not registered',
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true, // Set to true for HTTPS
        sameSite: 'none',
      };

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=None`);
      res.status(200).json({
        success: true,
        token,
        user,
        message: 'User logged in successfully',
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Password incorrect',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Login failure',
    });
  }
}

async function logout(req, res) {
  try {
    res.setHeader('Set-Cookie', 'token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None');
    
    return res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error while logging out',
    });
  }
}

export { login, signup, logout };
