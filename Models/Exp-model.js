const mongoose = require('mongoose');

const expschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true 
        },

    type:{
        type:String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Exp', expschema);