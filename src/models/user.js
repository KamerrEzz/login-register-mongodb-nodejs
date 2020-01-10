const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

let user = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ["USER_ROLE", "ADMIN_ROLE", "VIP_ROLES", "DIAMONT_ROLE"]
    },
    status: {
        type: Boolean,
        default: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
})
user.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

user.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', user);