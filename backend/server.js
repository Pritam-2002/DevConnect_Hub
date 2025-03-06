const express=require('express')
const app=express()
require("dotenv").config();
const connectDB = require('./database/db');
connectDB();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const PORT=process.env.PORT;
const userRoutes=require('./routes/userRoutes');
const hackathonRoutes=require('./routes/hackathonSchema')
app.use('/user',userRoutes);
app.use('/hackathon',hackathonRoutes);

app.listen(PORT,()=>{
    console.log('Listening on port 3000');
})
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server shut down gracefully..');
        process.exit(0);
    });
});
