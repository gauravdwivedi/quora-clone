const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    date: {
        type: String
    }
}, {
    timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;