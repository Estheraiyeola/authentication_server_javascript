const User = require('../model/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const createUser = async (user = {}) => {
    if (!user.password || typeof user.password !== 'string') {
      throw new Error('A valid password is required');
    }
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log('Hash generated:', hashedPassword);
      user.password = hashedPassword;
  
      // Create the user in the database
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  };  

const authenticateUser = async (req) => {
    try {
      const { email, password } = req;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid email');
      }     
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ id: user.id }, secretKey);
      user.token = token;
  
      return {
        token: token,
        message: 'User authenticated successfully'
      };
  
    } catch (err) {
        console.error('Error authenticating user:', err);
      throw err;
    }
  };
  
module.exports = {createUser, authenticateUser};
