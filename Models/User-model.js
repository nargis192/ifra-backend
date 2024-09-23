const mongoose = require("mongoose")

const Userschema = new mongoose.Schema(
    {
        Name: {
            type: String,
            require: true,
        },
        Email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[\w.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(value);
                },
                message: 'Invalid email address'
            }
        },
        Password:
        {
            type: String,
            required: true
        },
       
    }
)


module.exports = mongoose.model("Users", Userschema);