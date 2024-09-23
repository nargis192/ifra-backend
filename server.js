const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Router = require('./Router/Exprouter');
const userrouter = require('./Router/Userrouter');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', Router);
app.use('/api/users', userrouter);

// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// MongoDB connection for "exps" database
const mongodbUrlExps = process.env.MONGODB_URL_EXPS;

if (mongodbUrlExps) {
    mongoose.connect(mongodbUrlExps)
        .then(() => {
            console.log("MongoDB (exps) is connected");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB (exps):", error);
        });
} else {
    console.log('MONGODB_URL_EXPS is not defined in .env');
}

// MongoDB connection for "users" database
const mongodbUrlUsers = process.env.MONGODB_URL_USERS;

if (mongodbUrlUsers) {
    const mongooseUsers = mongoose.createConnection(mongodbUrlUsers);

    mongooseUsers.on('connected', () => {
        console.log("MongoDB (users) is connected");
    });

    mongooseUsers.on('error', (error) => {
        console.log("Error connecting to MongoDB (users):", error);
    });
} else {
    console.log('MONGODB_URL_USERS is not defined in .env');
}
