const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = '12345';

app.use(cors(
    {
        origin:["https://free-spotify-using-mern.vercel.app"],
        methods:["POST","GET"],
        credentials:true,
    }
));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://vishaltiwariup2019:<password>@cluster0.8yuode6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
}
);

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'User created', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id,
                name: user.username,
                email: user.email
            }
        };
        jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token: token });
        }
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
);


app.listen(3001, () => {
    console.log(`Server is running on port ${PORT}`);
})
