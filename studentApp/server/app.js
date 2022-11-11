const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan =  require('morgan');
const {DB_URL} = require('./config.json');
const studentRouter = require('./routers/studentRouter');
const userRouter = require('./routers/userRouter')
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


app.use('/users', userRouter);
app.use('/stds', studentRouter);

app.use((req, res, next) => {
    res.status(404).send({ error: 'API NOT SUPPORTED' });
});

app.use((err, req, res, next) => {
    res.status(500).send({error: err.message});
});

mongoose.connect(DB_URL)
.then(()=> app.listen(3000, ()=> console.log("server connected")))
.catch(()=>console.log('DB Error'))