const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quora', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open', () => {
    console.log('Connected successfully to Mongodb');
});

module.exports = db;
