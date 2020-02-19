const express = require('express');

const app = express();

app.get('/location', (req, res) =>{
    res.json({
        some: 'json'
    })
})



app.listen(3000, () => { console.log('running....')});