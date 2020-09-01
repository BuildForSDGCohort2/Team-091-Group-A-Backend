const home = require('./routes/home');
const express = require('express');
const app = express();


// Using inbuilt middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', home);

// setting and listening for port....
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening for port ....${port}`);
})