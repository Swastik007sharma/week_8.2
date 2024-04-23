const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://swastik:Mu8AycsanaGQ467O@paytm.coegfpb.mongodb.net/?retryWrites=true&w=majority&appName=Paytm"

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});