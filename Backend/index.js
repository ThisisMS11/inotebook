//! our index.js will act as our main Express server where we will trigger all the routes.
const connectTomongo = require('./db');
const express = require('express');
connectTomongo();
const app = express();
const port = 5000;

//! if we want to use req.body() and send request in json then 
//!we will have to use a middleware like below:
app.use(express.json());



app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// asynchronous nature of js  says that code is never blocked in javascript that is if a particular block of code takes time to execute then it will not block the execution of the rest of the code because it will automatically be uploaded