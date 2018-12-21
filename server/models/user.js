const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;

const userSchema = mongoose.Schema({

    email: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        require: true,
        minlenght: 5
    },
    name: {
        type: String,
        require: true,
        maxlenght: 100
    },
    lastname: {
        type: String,
        require: true,
        maxlenght: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){ // if they are not modifing data
        bcrypt.genSalt(SALT_I, function(error, salt) {
            if(error) { return next(error) }
    
            bcrypt.hash(user.password, salt, function(error, hash) {
                if(error) { return next(error) }
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }