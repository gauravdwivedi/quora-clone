const mongoose = require('mongoose');

const connection_url = 'mongodb+srv://whatsapp:VAJuVIsGrf60pBPX@cluster0.enhdn.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open', () => {
    console.log('Connected successfully to Mongodb');
    
});

module.exports = db;
