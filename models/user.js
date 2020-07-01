const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');




const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// // hash the password
// userSchema.methods.generateHash = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// // checking if password is valid
// userSchema.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };


const User = mongoose.model('User', userSchema);

module.exports = User;