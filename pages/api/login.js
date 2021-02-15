import connectDB from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDB();

export default async (req, res) => {
    const { email, password } = req.body;
    try {
        // check to see if a user exists with the provided email
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(404).send('No user exists with that email')
        }

        // check to see if the users password is correct
        const passwordsMatch = await bcrypt.compare(password, user.password)

        // generate and send token
        if (passwordsMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            res.status(200).json(token)
        } else {
            return res.status(401).send('Passwords do not match')
        }
    } catch(err) {
        console.error(err);
        res.status(500).send('Error logging in user');
    }
}