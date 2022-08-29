const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{versionKey:false})

//Encrypting password before saving
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
        console.log("Password encrypted before saving")
    } catch (error) {
        next(error) 
    }    
});

module.exports = mongoose.model('user', userSchema);
