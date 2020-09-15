const express = require('express');
const router = express.Router();


// Consuming a get call 

router.get('/', (req, res) => {
    res.send('Welcome Team-091-Group-A......!!!');
});


module.exports = router;