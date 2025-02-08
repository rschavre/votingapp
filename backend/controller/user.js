// import * as bcrypt from  "bcryptjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbParams } from '../database/db.js';

// Register User
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const findExisting = await dbParams.usersCollection.findOne({ email });
    if (findExisting) return res.status(400).send("Existing User. Try different email!")

    const user = await dbParams.usersCollection.insertOne({
      email,
      password: hashedPassword,
    });
    res.status(201).send("User registered");

  } catch (err) {
    console.log(err);
    res.status(400).send("Error registering user");
  }
};


// Login User
export const loginUser =  async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await dbParams.usersCollection.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    // Create a login token for the user
    // Sign the payload with MongoDb _id field, used to retrieve user when auth header is set to "token <jwt>"
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    //   sameSite: 'strict', // Prevent CSRF attacks
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // });
  } catch (err) {
    console.log(err);

    res.status(500).send("Error logging in");
  }
};