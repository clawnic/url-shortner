const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT||5000;
const urlRoutes = require('./url.route');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('server running');
});
app.use('/url',urlRoutes);



mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});